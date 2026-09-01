export const siteConfig = {
  name: 'ACM GRIET Student Chapter',
  shortName: 'ACM GRIET',
  institute: 'Gokaraju Rangaraju Institute of Engineering & Technology',
  recruitmentFormUrl: null as string | null,
  instagram: 'https://www.instagram.com/acm_griet',
  linkedin: 'https://www.linkedin.com/company/acm-griet/',
  email: 'grietacm@gmail.com',
} as const

export type EventItem = {
  id: string
  title: string
  date: string
  year: number
  venue?: string
  theme?: string
  focus?: string
  time?: string
  description: string
  highlights: string[]
  tags: string[]
  imageLabel: string
  coverImage?: string
  images?: string[]
  galleryCount: number
  featured?: boolean
  placeholder?: boolean
}

export const events: EventItem[] = [
  {
    id: 'inauguration-2025',
    title: 'ACM GRIET Student Chapter Inauguration',
    date: '4 April 2025',
    year: 2025,
    venue: 'CSE Block, Seminar Hall–1',
    description: 'The inauguration marked the beginning of the ACM GRIET Student Chapter and its journey toward computing knowledge, innovation, collaboration and technical excellence.',
    highlights: ['Chapter ID: 19885', 'Chief Guest: Dr. Muniraju Naidu Vadlamudi', 'Guest of Honour: Mrs. Gayathri Vaka', 'Coordinator: Dr. B. Sankara Babu'],
    tags: ['Community', 'Chapter'],
    imageLabel: 'Inauguration photographs',
    images: [
      '/images/inauguration-1.jpg',
      '/images/inauguration-2.jpg',
      '/images/inauguration-3.jpg',
      '/images/inauguration-4.jpg',
    ],
    galleryCount: 4,
    coverImage: '/images/inauguration-1.jpg',
  },
  {
    id: 'cloudron-2025',
    title: 'Cloudron @ GRIET',
    date: '26 April 2025',
    year: 2025,
    theme: 'Learning Meets Interaction',
    focus: 'Cloud Computing',
    description: 'Cloudron @ GRIET combined a guest session on cloud computing with interactive coding games and challenges. The event encouraged problem-solving, collaboration and active participation.',
    highlights: ['Guest session: Krishna Reddy', 'Interactive coding games and challenges', 'Recognition and prizes for top-performing participants'],
    tags: ['Workshops', 'Cloud'],
    imageLabel: 'Cloudron photographs',
    images: [
      '/images/cloudron-1.jpg',
      '/images/cloudron-2.jpg',
      '/images/cloudron-3.jpg',
      '/images/cloudron-4.jpg',
      '/images/cloudron-5.jpg',
    ],
    galleryCount: 5,
    coverImage: '/images/cloudron-1.jpg',
    featured: true,
  },
  {
    id: 'mahotsav-2025',
    title: 'ACM Mahotsav 2025',
    date: '29 August 2025',
    year: 2025,
    venue: 'KLH University, Bachupally',
    theme: 'Expanding Horizons in Computing',
    description: 'ACM Mahotsav 2025 brought ACM GRIET Student Chapter members into a wider technical community through workshops, competitions and interactive sessions focused on innovation, computing and collaboration.',
    highlights: ['Workshops', 'Competitions', 'Interactive sessions'],
    tags: ['Competitions', 'Community'],
    imageLabel: 'Mahotsav photographs',
    images: [
      '/images/mahotsav-1.jpg',
      '/images/mahotsav-2.jpg',
    ],
    galleryCount: 2,
    coverImage: '/images/mahotsav-1.jpg',
  },
  {
    id: 'sih-2025',
    title: 'GRIET Internal Hackathon — Smart India Hackathon 2025',
    date: '23 September 2025',
    year: 2025,
    venue: 'Gokaraju Rangaraju Institute of Engineering & Technology',
    description: 'An internal hackathon focused on innovation, creativity, collaboration and real-world problem solving, serving as an internal selection stage for Smart India Hackathon 2025.',
    highlights: ['Organized by ACM GRIET Student Chapter with the Department of Computer Science and Engineering', 'Smart Automation', 'Healthcare', 'Agriculture', 'Sustainability', 'Cybersecurity'],
    tags: ['Hackathons', 'Innovation'],
    imageLabel: 'Internal Hackathon photographs',
    images: [
      '/images/smart-india-hackathon-1.jpg',
    ],
    galleryCount: 1,
    coverImage: '/images/smart-india-hackathon-1.jpg',
    featured: true,
  },
  {
    id: 'nova-2026',
    title: 'NOVA 2026',
    date: '2 April 2026',
    year: 2026,
    time: '10:00 AM – 3:30 PM',
    venue: 'GRIET College, Bachupally, Hyderabad',
    theme: 'Innovation, Learning & Competition',
    description: 'NOVA brings together ORBITEX, a technical competition built around logic and problem-solving, and ECLIPSE, an MCP & Agentic AI workshop with hands-on learning and live demonstrations.',
    highlights: ['ORBITEX: logic, creativity, problem-solving, debugging and technical challenges', 'ECLIPSE: MCP & Agentic AI Workshop', 'Team size for ORBITEX: 2–4 members', 'Prize pool: ₹10,000', 'ECLIPSE topics include MCP fundamentals, tools, real-world data and intelligent agent workflows'],
    tags: ['Competitions', 'AI', 'Workshops'],
    imageLabel: 'NOVA 2026 photographs',
    images: [
      '/images/nova-2026-1.jpg',
    ],
    galleryCount: 1,
    coverImage: '/images/nova-2026-1.jpg',
    featured: true,
    placeholder: false,
  },
]

export const benefits = [
  ['LEARN', 'Workshops, technical sessions and hands-on learning that turn curiosity into momentum.', 'BookOpen'],
  ['BUILD', 'Turn ideas into projects and practical solutions.', 'Blocks'],
  ['COMPETE', 'Hackathons, coding challenges and technical competitions.', 'Trophy'],
  ['EXPLORE', 'Discover AI, ML, cloud computing and emerging technologies.', 'Sparkles'],
  ['CONNECT', 'Collaborate with peers and the wider ACM community.', 'Users'],
  ['LEAD', 'Organize, contribute, take initiative and grow.', 'Flag'],
] as const

export const journeyItems = [
  ['01', 'Show up curious', 'Bring the questions you have and the ones you have not thought of yet.'],
  ['02', 'Find your people', 'Meet students who want to explore, build and think together.'],
  ['03', 'Get hands-on', 'Move from conversations to workshops, challenges and projects.'],
  ['04', 'Make it real', 'Test ideas through competitions, collaboration and practical work.'],
  ['05', 'Leave a mark', 'Contribute, take initiative and help shape what comes next.'],
] as const

export const galleryItems = events.filter((event) => event.galleryCount > 0).flatMap((event) => Array.from({ length: event.galleryCount }, (_, index) => ({ eventId: event.id, label: `${event.imageLabel} ${index + 1}` })))

export const galleryFilters = ['ALL', '2025', '2026'] as const

export const getEvent = (id: string) => events.find((event) => event.id === id)
export const recruitmentIsReady = Boolean(siteConfig.recruitmentFormUrl?.startsWith('http'))

export const placeholderContacts = [
  { number: '+91 93473 94941', note: 'Koushik, Chair' },
  { number: '+91 83098 63098', note: 'Sri Rajan, Vice Chair' },
]

export const navItems = [
  ['Home', '/'], ['About', '/about'], ['Events', '/events'], ['Gallery', '/gallery'], ['Team', '/team'], ['Contact', '/#contact'],
] as const

type EventItemWithTime = EventItem & { time?: string }
export type { EventItemWithTime }

// Keep the event data easy to replace with GET /api/events later.
export const apiShape = { collection: 'events', endpoints: ['GET /api/events', 'GET /api/events/:id'] } as const

// --- Team Data ---
export type TeamMember = {
  id: string
  name: string
  role: string
  category: 'core' | 'lead' | 'member'
  domain?: string
  imageUrl?: string
  linkedinUrl?: string
}

export const teamMembers: TeamMember[] = [
  // Core Team
  { id: 'koushik', name: 'Koushik', role: 'Chair', category: 'core', imageUrl: '/images/Koushik.jpg', linkedinUrl: 'https://www.linkedin.com/in/koushik-tirumala-5a1170271/' },
  { id: 'rajan', name: 'Rajan', role: 'Vice Chair', category: 'core', imageUrl: '/images/rajan.jpg', linkedinUrl: 'https://www.linkedin.com/in/rajan-bushe-3651773ba/' },
  { id: 'bhavishya', name: 'Bhavishya', role: 'Secretary', category: 'core', imageUrl: '/images/Bhavishya.jpg', linkedinUrl: 'https://www.linkedin.com/in/bhavishya-karumuri-026732350/' },
  { id: 'sai-karthikeya', name: 'Sai Karthikeya', role: 'Treasurer', category: 'core', imageUrl: '/images/karthikeya.jpg', linkedinUrl: 'https://www.linkedin.com/in/saikarthikeya-bukkaraju-7359a1327/' },//
  { id: 'mahathi', name: 'Mahathi Sabbani', role: 'Webmaster', category: 'core', imageUrl: '/images/Mahathi.jpeg', linkedinUrl: 'https://www.linkedin.com/in/mahathi-sabbani-932982317/' },
  { id: 'hasmitha', name: 'Hasmitha', role: 'Member Relation', category: 'core', imageUrl: '/images/hasmitha.jpg', linkedinUrl: 'https://www.linkedin.com/in/hasmitha-kotha/' },

  // Leads
  { id: 'adarsh', name: 'Adarsh Engu', role: 'Technical Lead', category: 'lead', domain: 'technical', imageUrl: '/images/Adarsh.png', linkedinUrl: 'https://www.linkedin.com/in/adarsh-engu-17mar07/' },
  { id: 'sudeep', name: 'Sudeep Reddy', role: 'Brand & Media Lead', category: 'lead', domain: 'brand-media', imageUrl: '/images/Sudeep.jpg', linkedinUrl: 'https://www.linkedin.com/in/sudeep-reddy-9bb063335/' },
  { id: 'bhanu-prakash', name: 'Bhanu Prakash', role: 'Event Management Lead', category: 'lead', domain: 'event-management', imageUrl: '/images/Bhanu.jpg', linkedinUrl: 'https://linkedin.com/in/bhanu-prakash' },
  { id: 'harshini', name: 'Harshini', role: 'PR Lead', category: 'lead', domain: 'public-relations', imageUrl: '/images/Harshini.jpg', linkedinUrl: 'https://www.linkedin.com/in/sirigari-harshini-42510634a/' },
  { id: 'srishanth', name: 'Uday Kiran', role: 'Sponsorship Lead', category: 'lead', domain: 'sponsorship', imageUrl: '/images/Uday.png', linkedinUrl: 'https://www.linkedin.com/in/uday-kiran-reddy-84a1ab3b9/' },
  { id: 'abdus-sami', name: 'Abdus Sami', role: 'Graphic Lead', category: 'lead', domain: 'graphic', imageUrl: '/images/Abdus.jpg', linkedinUrl: 'https://www.linkedin.com/in/abdus-sami-183641332/' },
  { id: 'vishwa', name: 'Vishwa', role: 'Logistics Lead', category: 'lead', domain: 'logistics', imageUrl: '/images/Vishwa.jpg', linkedinUrl: 'https://www.linkedin.com/in/vishwa-venkat-sana-4351653ba/' },
  { id: 'priya', name: 'Priya', role: 'Documentation Lead', category: 'lead', domain: 'documentation', imageUrl: '/images/priya.jpg', linkedinUrl: 'https://www.linkedin.com/in/shivapriya-sheelam-7b69a7327/' },

]

export const teamDomains = [
  { id: 'all', label: 'All' },
  { id: 'event-management', label: 'Event Management' },
  { id: 'brand-media', label: 'Brand & Media' },
  { id: 'technical', label: 'Technical' },
  { id: 'public-relations', label: 'Public Relations' },
  { id: 'sponsorship', label: 'Sponsorship' },
  { id: 'graphic', label: 'Graphic' },
  { id: 'logistics', label: 'Logistics' },
  { id: 'documentation', label: 'Documentation' },
] as const
