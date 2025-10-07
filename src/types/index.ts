export interface Event {
  id: string
  title: string
  description: string
  shortDescription: string
  date: string
  endDate?: string
  time: string
  endTime?: string
  location: string
  city: string
  venue: string
  image: string
  banner?: string
  category: EventCategory
  tags: string[]
  price: number
  maxAttendees: number
  currentAttendees: number
  organizer: Organizer
  speakers: Speaker[]
  schedule: ScheduleItem[]
  tickets: TicketTier[]
  status: "draft" | "published" | "cancelled" | "completed"
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface PastEvent {
  title: string;
  date: string;
  location: string;
  attendees: string;
  type: string;
  description: string;
  image?: string;
  backgroundImage?: string;
}

export interface Organizer {
  id: string
  name: string
  bio: string
  avatar: string
  website?: string
  social: {
    twitter?: string
    instagram?: string
    linkedin?: string
  }
  events: string[]
  verified: boolean
}

export interface Speaker {
  id: string
  name: string
  title: string
  company: string
  bio: string
  avatar: string
  social: {
    twitter?: string
    linkedin?: string
  }
}

export interface ScheduleItem {
  id: string
  title: string
  description: string
  startTime: string
  endTime: string
  speaker?: Speaker
  type: "keynote" | "panel" | "workshop" | "break" | "networking"
}

export interface TicketTier {
  id: string
  name: string
  description: string
  price: number
  maxQuantity: number
  currentSold: number
  features: string[]
  available: boolean
}

export type EventCategory = 
  | "conference"
  | "workshop" 
  | "meetup"
  | "hackathon"
  | "party"
  | "networking"
  | "webinar"
  | "festival"

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  icon: string
  price?: string
  duration?: string
  category: ServiceCategory
}

export type ServiceCategory = 
  | "creator-collabs"
  | "community-design"
  | "event-activations"
  | "campus-waves"

export interface CaseStudy {
  id: string
  title: string
  client: string
  description: string
  image: string
  gallery?: string[]
  video?: string
  category: ServiceCategory
  tags: string[]
  metrics: {
    label: string
    value: string
  }[]
  featured: boolean
  createdAt: string
}

export interface Registration {
  id: string
  eventId: string
  attendee: {
    name: string
    email: string
    phone?: string
    company?: string
    dietary?: string
  }
  tickets: {
    tierId: string
    quantity: number
    price: number
  }[]
  totalAmount: number
  promoCode?: string
  discount?: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

export interface GitHubIssue {
  id: number
  number: number
  title: string
  html_url: string
  state: string
  labels: Array<{
    name: string
    color: string
  }>
  created_at: string
  updated_at: string
  user: {
    login: string
    avatar_url: string
  }
}
