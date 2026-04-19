export interface NavItem {
  label: string
  path: string
}

export interface FooterData {
  logoText: string
  copyright: string
  slogan: string
  links: string[]
}

export interface QuickAction {
  icon: string
  title: string
  subtitle: string
  accent?: string
}

export interface StoryItem {
  name: string
  school: string
  quote: string
  avatar: string
  featured?: boolean
}

export interface SitePayload {
  brand: string
  tagline: string
  nav: NavItem[]
  footer: FooterData
  home: any
  schools: any
  studyPlan: any
  learning: any
  community: any
  resources: any
  profile: any
}
