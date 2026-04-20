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

export interface ToggleOption {
  label: string
  active: boolean
}

export interface QuickAction {
  icon: string
  iconBg: string
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

export interface HomePageData {
  hero: {
    eyebrow: string
    titleStart: string
    titleAccent: string
    description: string
    searchPlaceholder: string
    searchButton: string
    searchHints: string[]
    image: string
    statLabel: string
    statValue: string
  }
  countdown: {
    title: string
    description: string
    value: string
    unit: string
    button: string
  }
  quickActions: QuickAction[]
  schoolSection: {
    title: string
    subtitle: string
    action: string
  }
  recommendedSchools: Array<{
    name: string
    image: string
    score: string
    tag: string
    description: string
  }>
  storySection: {
    title: string
    subtitle: string
    button: string
  }
  stories: StoryItem[]
}

export interface SchoolLibraryPageData {
  filters: {
    regions: ToggleOption[]
    levels: ToggleOption[]
  }
  searchPlaceholder: string
  sorts: string[]
  list: Array<{
    name: string
    image: string
    labels: Array<{
      text: string
      tone: 'blue' | 'neutral' | string
    }>
    majors: string[]
  }>
  pagination: string[]
}

export interface StudyPlanPageData {
  label: string
  title: string
  subtitle: string
  actions: {
    edit: string
    summary: string
  }
  targetSchool: string
  targetMajor: string
  progress: number
  daysLeft: number
  timeline: Array<{
    title: string
    period: string
    status: string
    description: string
    tasks: Array<{
      text: string
      done: boolean
    }>
    tags?: string[]
  }>
  todayFocus: {
    title: string
    subtitle: string
    task: string
    note: string
  }
  weeklyTasks: {
    title: string
    list: Array<{
      text: string
      note: string
      done: boolean
    }>
    button: string
  }
}

export interface LearningCenterPageData {
  hero: {
    title: string
    subtitle: string
    button: string
    buddies: string[]
  }
  focus: {
    title: string
    subtitle: string
    time: string
  }
  heatmap: {
    title: string
    subtitle: string
    month: string
    days: string[]
    grid: string[]
  }
  subjects: {
    title: string
    total: string
    list: Array<{
      name: string
      percent: string
      color: string
    }>
  }
  dailyHours: {
    title: string
    average: string
    bars: Array<{
      day: string
      height: string
      color: string
    }>
  }
  report: {
    title: string
    subtitle: string
    button: string
  }
}

export interface CommunityPageData {
  composer: {
    avatar: string
    placeholder: string
    button: string
  }
  tabs: ToggleOption[]
  posts: Array<{
    author: string
    avatar: string
    meta: string
    content: string
    tags: string[]
    images?: string[]
    supportBar?: string
    stats: Array<{
      icon: string
      label: string
    }>
    share?: boolean
  }>
  quoteCard: {
    title: string
    content: string
  }
  hotTopics: {
    title: string
    refresh: string
    list: Array<{
      rank: number
      text: string
      meta: string
    }>
  }
  friends: {
    title: string
    list: Array<{
      name: string
      meta: string
      avatar: string
    }>
  }
  loadingText: string
}

export interface ResourcesPageData {
  categories: Array<{
    name: string
    icon: string
    active: boolean
    children?: string[]
  }>
  quote: string
  searchPlaceholder: string
  hotTags: string[]
  cards: Array<{
    badge: string
    image: string
    title: string
    description: string
    authorBadge: string
    author: string
    likes: string
    bookmarks: string
  }>
  pagination: string[]
}

export interface ProfilePageData {
  user: {
    name: string
    target: string
    streak: string
    avatar: string
  }
  menu: Array<{
    label: string
    icon: string
    badge?: string
    active: boolean
  }>
  stats: Array<{
    label: string
    icon: string
    value: string
    unit: string
    iconColor: string
    decor: string
  }>
  tabs: ToggleOption[]
  emptyState: {
    image: string
    title: string
    description: string
    button: string
  }
}

// 这里只描述当前界面真正会使用到的数据字段。
// 这样既能保证类型提示完整，又不会把整个 JSON 原样搬成一份难维护的类型镜像。
export interface SitePayload {
  brand: string
  tagline: string
  nav: NavItem[]
  footer: FooterData
  home: HomePageData
  schools: SchoolLibraryPageData
  studyPlan: StudyPlanPageData
  learning: LearningCenterPageData
  community: CommunityPageData
  resources: ResourcesPageData
  profile: ProfilePageData
}
