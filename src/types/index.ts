export interface User {
  id: string;
  username: string;
  email: string;
  handles: PlatformHandles;
  friends: string[];
  created_at: string;
}

export interface PlatformHandles {
  leetcode?: string;
  codeforces?: string;
  codechef?: string;
  atcoder?: string;
}

export interface LeetCodeStats {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  acceptanceRate: number;
  ranking: number;
}

export interface CodeforcesStats {
  rating: number;
  maxRating: number;
  rank: string;
  totalSolved: number;
  contests: number;
}

export interface PlatformStats {
  leetcode?: LeetCodeStats;
  codeforces?: CodeforcesStats;
  totalSolved: number;
  lastUpdated: string;
}

export interface Friend {
  id: string;
  username: string;
  handles: PlatformHandles;
  stats: PlatformStats;
}

export interface ProgressData {
  date: string;
  leetcode: number;
  codeforces: number;
  total: number;
}