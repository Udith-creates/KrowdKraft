// team members data for the Team section

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string | null;
    instagram?: string | null;
    medium?: string | null;
  };
}

export const teamMembers: TeamMember[] = [
  {
    name: "Darshan Krishna",
    role: "Founder & CEO",
    bio: "Passionate community contributor who aims to spread importance of community & build a strong community culture",
    image: "/images/team/hacktober-image.jpg", 
    social: {
      linkedin: "https://www.linkedin.com/in/darshan-krishna-dk/",
      twitter: "https://x.com/CrypTech_DK",
      instagram: "https://www.instagram.com/cryptech_dk/",
      medium: "https://medium.com/@cryptech_dk"
    }
  },
  {
    name: "Deepak N",
    role: "Co-Founder",
    bio: "Focused on growing the developer ecosystem by guiding young talent and sharing experience through community events.",
    image: "/images/team/hacktober-image.jpg", 
    social: {
      linkedin: "https://www.linkedin.com/in/deepak--n/",
      twitter: null,
      instagram: null,
      medium: null
    }
  },
  {
    name: "Amrutha Druthi",
    role: "Community Manager",
    bio: "A detail-oriented planner who thrives on smart strategies",
    image: "/images/team/female-team-image.jpg", 
    social: {
      linkedin: "https://www.linkedin.com/in/amrutha-druthi-8421a8225/",
      twitter: null,
      instagram: null,
      medium: null
    }
  },
  {
    name: "Tharun Kumar",
    role: "Community Moderator",
    bio: "Focused on growing vibrant communities by providing engaging content and utilizing platform features to streamline management and boost engagement.",
    image: "/images/team/hacktober-image.jpg", 
    social: {
      linkedin: "https://www.linkedin.com/in/tharun-kumar-96ba22283/",
      twitter: null,
      instagram: null,
      medium: null
    }
  },
  {
    name: "Gautham Krishna",
    role: "Media Lead",
    bio: "Loves photography and is always ready to capture moments that tell a story.",
    image: "/images/team/hacktober-image.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/gautham-krishna-3243161a0/",
      twitter: "https://x.com/gkrishnak01",
      instagram: null,
      medium: null
    }
  },
  {
    name: "Viha Shomikha",
    role: "Community Manager",
    bio: "Experienced brand ambassador passionate about creating genuine connections and growing communities.",
    image: "/images/team/female-team-image.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/vihashomikhaas/",
      twitter: "https://x.com/VihaTacklesBugs",
      instagram: null,
      medium: null
    }
  }
];
