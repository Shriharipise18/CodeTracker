import React, { useState, useEffect } from 'react';
import { Trophy, Target, Award, Users, Settings } from 'lucide-react';
import StatsCard from './StatsCard';
import PlatformCard from './PlatformCard';
import ProgressChart from './ProgressChart';
import HandleModal from './HandleModal';
import { PlatformHandles, PlatformStats, ProgressData } from '../../types';

interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [handles, setHandles] = useState<PlatformHandles>({
    leetcode: 'demo_user',
    codeforces: 'demo_user',
  });
  const [stats, setStats] = useState<PlatformStats>({
    totalSolved: 0,
    lastUpdated: new Date().toISOString()
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const [progressData, setProgressData] = useState<ProgressData[]>([]);

  // Simulate API calls for fetching platform stats
  const fetchLeetCodeStats = async (handle: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock LeetCode API response
    return {
      totalSolved: Math.floor(Math.random() * 300) + 100,
      easy: Math.floor(Math.random() * 100) + 50,
      medium: Math.floor(Math.random() * 150) + 75,
      hard: Math.floor(Math.random() * 50) + 10,
      acceptanceRate: Math.floor(Math.random() * 30) + 60,
      ranking: Math.floor(Math.random() * 50000) + 10000
    };
  };

  const fetchCodeforcesStats = async (handle: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock Codeforces API response
    const rating = Math.floor(Math.random() * 1000) + 1200;
    const getRank = (rating: number) => {
      if (rating < 1200) return 'Newbie';
      if (rating < 1400) return 'Pupil';
      if (rating < 1600) return 'Specialist';
      if (rating < 1900) return 'Expert';
      if (rating < 2100) return 'Candidate Master';
      return 'Master';
    };
    
    return {
      rating,
      maxRating: rating + Math.floor(Math.random() * 200),
      rank: getRank(rating),
      totalSolved: Math.floor(Math.random() * 200) + 50,
      contests: Math.floor(Math.random() * 30) + 5
    };
  };

  const handleRefresh = async (platform: string) => {
    const handle = handles[platform as keyof PlatformHandles];
    if (!handle) return;
    
    setLoading({ ...loading, [platform]: true });
    
    try {
      let platformStats;
      
      if (platform === 'leetcode') {
        platformStats = await fetchLeetCodeStats(handle);
      } else if (platform === 'codeforces') {
        platformStats = await fetchCodeforcesStats(handle);
      }
      
      if (platformStats) {
        setStats(prevStats => {
          const newStats = {
            ...prevStats,
            [platform]: platformStats,
            lastUpdated: new Date().toISOString()
          };
          
          // Calculate total solved
          let total = 0;
          if (newStats.leetcode) total += newStats.leetcode.totalSolved;
          if (newStats.codeforces) total += newStats.codeforces.totalSolved;
          
          newStats.totalSolved = total;
          return newStats;
        });
        
        // Update progress data
        const today = new Date().toISOString().split('T')[0];
        setProgressData(prev => {
          const existing = prev.find(p => p.date === today);
          if (existing) {
            return prev.map(p => p.date === today ? {
              ...p,
              [platform]: platformStats.totalSolved,
              total: stats.totalSolved
            } : p);
          } else {
            return [...prev, {
              date: today,
              leetcode: platform === 'leetcode' ? platformStats.totalSolved : (stats.leetcode?.totalSolved || 0),
              codeforces: platform === 'codeforces' ? platformStats.totalSolved : (stats.codeforces?.totalSolved || 0),
              total: stats.totalSolved
            }];
          }
        });
      }
    } catch (error) {
      console.error(`Error fetching ${platform} stats:`, error);
    } finally {
      setLoading({ ...loading, [platform]: false });
    }
  };

  const handleSaveHandles = (newHandles: PlatformHandles) => {
    setHandles(newHandles);
    // Reset stats when handles change
    setStats({
      totalSolved: 0,
      lastUpdated: new Date().toISOString()
    });
    setProgressData([]);
  };

  // Auto-fetch stats when handles are added
  useEffect(() => {
    Object.entries(handles).forEach(([platform, handle]) => {
      if (handle && !stats[platform as keyof PlatformStats]) {
        handleRefresh(platform);
      }
    });
  }, [handles]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Track your competitive programming progress</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Settings className="h-4 w-4 mr-2" />
            Manage Handles
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Solved"
            value={stats.totalSolved}
            icon={<Target className="h-6 w-6" />}
            color="blue"
            trend={stats.totalSolved > 0 ? Math.floor(Math.random() * 20) + 5 : undefined}
          />
          <StatsCard
            title="LeetCode Rating"
            value={stats.leetcode ? `#${stats.leetcode.ranking?.toLocaleString()}` : 'N/A'}
            subtitle={stats.leetcode ? "Global Ranking" : "Connect LeetCode"}
            icon={<Trophy className="h-6 w-6" />}
            color="orange"
          />
          <StatsCard
            title="Codeforces Rating"
            value={stats.codeforces?.rating || 0}
            subtitle={stats.codeforces?.rank || 'Connect Codeforces'}
            icon={<Award className="h-6 w-6" />}
            color="blue"
          />
          <StatsCard
            title="Friends"
            value="12"
            subtitle="Connected"
            icon={<Users className="h-6 w-6" />}
            color="green"
          />
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <PlatformCard
            platform="leetcode"
            handle={handles.leetcode}
            stats={stats.leetcode}
            color="bg-orange-500"
            onRefresh={() => handleRefresh('leetcode')}
            loading={loading.leetcode || false}
          />
          <PlatformCard
            platform="codeforces"
            handle={handles.codeforces}
            stats={stats.codeforces}
            color="bg-blue-500"
            onRefresh={() => handleRefresh('codeforces')}
            loading={loading.codeforces || false}
          />
          <PlatformCard
            platform="codechef"
            handle={handles.codechef}
            color="bg-amber-600"
            onRefresh={() => handleRefresh('codechef')}
            loading={loading.codechef || false}
          />
          <PlatformCard
            platform="atcoder"
            handle={handles.atcoder}
            color="bg-gray-700"
            onRefresh={() => handleRefresh('atcoder')}
            loading={loading.atcoder || false}
          />
        </div>

        {/* Progress Chart */}
        {progressData.length > 0 && (
          <div className="mb-8">
            <ProgressChart data={progressData} />
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          {stats.totalSolved > 0 ? (
            <div className="space-y-4">
              {stats.leetcode && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">
                      Fetched LeetCode stats: {stats.leetcode.totalSolved} problems solved
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">Just now</span>
                </div>
              )}
              {stats.codeforces && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">
                      Fetched Codeforces stats: {stats.codeforces.totalSolved} problems solved
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">Just now</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">No activity yet</p>
              <p className="text-sm text-gray-400">Add your platform handles to start tracking progress</p>
            </div>
          )}
        </div>
      </div>

      <HandleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveHandles}
        currentHandles={handles}
      />
    </div>
  );
};

export default Dashboard;