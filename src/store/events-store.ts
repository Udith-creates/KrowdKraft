import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Event, Registration } from '@/types'

// Empty events array since the data file was removed
const mockEvents: Event[] = []

interface EventsState {
  events: Event[]
  registrations: Registration[]
  filters: {
    search: string
    category: string
    city: string
    dateRange: {
      start: string
      end: string
    }
    tags: string[]
    priceRange: {
      min: number
      max: number
    }
  }
  
  // Actions
  setEvents: (events: Event[]) => void
  addEvent: (event: Event) => void
  updateEvent: (id: string, updates: Partial<Event>) => void
  deleteEvent: (id: string) => void
  
  addRegistration: (registration: Registration) => void
  updateRegistration: (id: string, updates: Partial<Registration>) => void
  
  setFilters: (filters: Partial<EventsState['filters']>) => void
  clearFilters: () => void
  
  getFilteredEvents: () => Event[]
  getFeaturedEvents: () => Event[]
  getEventById: (id: string) => Event | undefined
  getEventsByOrganizer: (organizerId: string) => Event[]
}

const initialFilters = {
  search: '',
  category: '',
  city: '',
  dateRange: {
    start: '',
    end: ''
  },
  tags: [],
  priceRange: {
    min: 0,
    max: 1000
  }
}

export const useEventsStore = create<EventsState>()(
  persist(
    (set, get) => ({
      events: mockEvents,
      registrations: [],
      filters: initialFilters,
      
      setEvents: (events) => set({ events }),
      
      addEvent: (event) => set((state) => ({
        events: [...state.events, event]
      })),
      
      updateEvent: (id, updates) => set((state) => ({
        events: state.events.map(event => 
          event.id === id ? { ...event, ...updates } : event
        )
      })),
      
      deleteEvent: (id) => set((state) => ({
        events: state.events.filter(event => event.id !== id)
      })),
      
      addRegistration: (registration) => set((state) => ({
        registrations: [...state.registrations, registration]
      })),
      
      updateRegistration: (id, updates) => set((state) => ({
        registrations: state.registrations.map(reg =>
          reg.id === id ? { ...reg, ...updates } : reg
        )
      })),
      
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),
      
      clearFilters: () => set({ filters: initialFilters }),
      
      getFilteredEvents: () => {
        const { events, filters } = get()
        
        return events.filter(event => {
          // Search filter
          if (filters.search) {
            const searchTerm = filters.search.toLowerCase()
            const matchesSearch = 
              event.title.toLowerCase().includes(searchTerm) ||
              event.description.toLowerCase().includes(searchTerm) ||
              event.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            
            if (!matchesSearch) return false
          }
          
          // Category filter
          if (filters.category && event.category !== filters.category) {
            return false
          }
          
          // City filter
          if (filters.city && event.city !== filters.city) {
            return false
          }
          
          // Date range filter
          if (filters.dateRange.start && filters.dateRange.end) {
            const eventDate = new Date(event.date)
            const startDate = new Date(filters.dateRange.start)
            const endDate = new Date(filters.dateRange.end)
            
            if (eventDate < startDate || eventDate > endDate) {
              return false
            }
          }
          
          // Tags filter
          if (filters.tags.length > 0) {
            const hasMatchingTag = filters.tags.some(tag =>
              event.tags.includes(tag)
            )
            if (!hasMatchingTag) return false
          }
          
          // Price range filter
          if (event.price < filters.priceRange.min || event.price > filters.priceRange.max) {
            return false
          }
          
          return true
        })
      },
      
      getFeaturedEvents: () => {
        const { events } = get()
        return events.filter(event => event.featured && event.status === 'published')
      },
      
      getEventById: (id) => {
        const { events } = get()
        return events.find(event => event.id === id)
      },
      
      getEventsByOrganizer: (organizerId) => {
        const { events } = get()
        return events.filter(event => event.organizer.id === organizerId)
      }
    }),
    {
      name: 'krowdkraft-events-storage',
      partialize: (state) => ({
        events: state.events,
        registrations: state.registrations
      })
    }
  )
)

