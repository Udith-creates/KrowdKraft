export interface Collaborator {
  name: string
  logo: string
  logoImage: string
  type: 'institution' | 'community' | 'organization'
}

export const collaborators: Collaborator[] = [
  { 
    name: "REVA University", 
    logo: "RU", 
    logoImage: "/images/partners/reva-university.png",
    type: 'institution'
  },
  { 
    name: "MS Ramaiah Institute of Technology", 
    logo: "MSRIT", 
    logoImage: "/images/partners/ms-ramaiah.png",
    type: 'institution'
  },
  { 
    name: "Harsha Institute of Management Studies", 
    logo: "HIMS", 
    logoImage: "/images/partners/harsha-institute.png",
    type: 'institution'
  },
  { 
    name: "T John Institute of Technology", 
    logo: "TJIT", 
    logoImage: "/images/partners/t-john-institute.png",
    type: 'institution'
  },
  {
    name: "</DevBraze>",
    logo: "DevBraze",
    logoImage: "/images/partners/Devbraze_logo.png",
    type: 'community'
  }
]