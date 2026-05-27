export interface InstagramMetrics {
  followers: number;
  followersGrowth: number; // percentage or absolute growth
  reach: number;
  impressions: number;
  profileVisits: number;
  websiteClicks: number;
  engagementRate: number; // e.g. 5.4 for 5.4%
}

export interface InstagramPost {
  id: string;
  caption: string;
  type: 'post' | 'reel' | 'carousel' | 'story';
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  reach?: number;
  engagementRate?: number;
  imageUrl?: string;
}

export interface DemographicSegment {
  name: string;
  value: number; // percentage or count
}

export interface Demographics {
  gender: DemographicSegment[]; // e.g. [{name: 'Hombres', value: 45}, {name: 'Mujeres', value: 55}]
  ageGroups: DemographicSegment[]; // e.g. [{name: '18-24', value: 30}, ...]
  topCities: DemographicSegment[]; // e.g. [{name: 'Madrid', value: 25}, ...]
  topCountries: DemographicSegment[]; // e.g. [{name: 'España', value: 60}, ...]
}

export interface AIAnalysisResult {
  accountVibe: string; // Brief tone study
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  keyFindings: string[];
  contentStrategyRecommendations?: string[];
  growthActionPlan?: string[];
  monetizationOpportunities: string[];
}

export interface InstagramReport {
  accountName: string;
  accountHandle: string;
  niche: string;
  period: string; // e.g. "Últimos 30 días"
  metrics: InstagramMetrics;
  posts: InstagramPost[];
  demographics: Demographics;
  aiAnalysis?: AIAnalysisResult;
  isReady: boolean;
  themeColor: string; // hex or tailwind color class
  reportStyle: 'classic' | 'modern' | 'minimalist' | 'creative';
  bio?: string;
  postsCount?: number;
  followingCount?: number;
  avatarUrl?: string;
}
