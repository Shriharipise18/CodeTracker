import React from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';

interface PlatformCardProps {
  platform: string;
  handle?: string;
  stats?: any;
  color: string;
  onRefresh: () => void;
  loading: boolean;
}

const PlatformCard: React.FC<PlatformCardProps> = ({
  platform,
  handle,
  stats,
  color,
  onRefresh,
  loading
}) => {
  const getPlatformUrl = (platform: string, handle: string) => {
    const urls: { [key: string]: string } = {
      leetcode: `https://leetcode.com/${handle}`,
      codeforces: `https://codeforces.com/profile/${handle}`,
      codechef: `https://codechef.com/users/${handle}`,
      atcoder: `https://atcoder.jp/users/${handle}`
    };
    return urls[platform];
  };

  const getPlatformLogo = (platform: string) => {
    // Using text logos for now, but these could be replaced with actual platform logos
    const logos: { [key: string]: string } = {
      leetcode: 'LC',
      codeforces: 'CF',
      codechef: 'CC',
      atcoder: 'AC'
    };
    return logos[platform];
  };

  if (!handle) {
    return (
      <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-6 text-center">
        <div className={`mx-auto w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white font-bold text-lg mb-3`}>
          {getPlatformLogo(platform)}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 capitalize mb-2">{platform}</h3>
        <p className="text-sm text-gray-500 mb-4">Connect your {platform} account</p>
        <button 
          onClick={() => {/* This would open the handle modal */}}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Add Handle
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white font-bold text-lg mr-3`}>
            {getPlatformLogo(platform)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 capitalize">{platform}</h3>
            <a
              href={getPlatformUrl(platform, handle)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
            >
              @{handle}
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {stats ? (
        <div className="space-y-3">
          {platform === 'leetcode' && (
            <>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Solved</span>
                <span className="text-sm font-medium">{stats.totalSolved}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Easy</span>
                <span className="text-sm font-medium text-green-600">{stats.easy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Medium</span>
                <span className="text-sm font-medium text-orange-600">{stats.medium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Hard</span>
                <span className="text-sm font-medium text-red-600">{stats.hard}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Acceptance Rate</span>
                <span className="text-sm font-medium">{stats.acceptanceRate}%</span>
              </div>
            </>
          )}
          {platform === 'codeforces' && (
            <>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Rating</span>
                <span className="text-sm font-medium">{stats.rating}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Max Rating</span>
                <span className="text-sm font-medium">{stats.maxRating}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Rank</span>
                <span className="text-sm font-medium">{stats.rank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Problems Solved</span>
                <span className="text-sm font-medium">{stats.totalSolved}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Contests</span>
                <span className="text-sm font-medium">{stats.contests}</span>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
            {loading ? 'Loading stats...' : 'Click refresh to load stats'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlatformCard;