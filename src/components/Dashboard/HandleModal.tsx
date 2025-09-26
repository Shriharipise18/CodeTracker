import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PlatformHandles } from '../../types';

interface HandleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (handles: PlatformHandles) => void;
  currentHandles: PlatformHandles;
}

const HandleModal: React.FC<HandleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentHandles
}) => {
  const [handles, setHandles] = useState<PlatformHandles>(currentHandles);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(handles);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Platform Handles</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="leetcode" className="block text-sm font-medium text-gray-700 mb-1">
              LeetCode Handle
            </label>
            <input
              type="text"
              id="leetcode"
              value={handles.leetcode || ''}
              onChange={(e) => setHandles({ ...handles, leetcode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your-leetcode-username"
            />
          </div>

          <div>
            <label htmlFor="codeforces" className="block text-sm font-medium text-gray-700 mb-1">
              Codeforces Handle
            </label>
            <input
              type="text"
              id="codeforces"
              value={handles.codeforces || ''}
              onChange={(e) => setHandles({ ...handles, codeforces: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your-codeforces-handle"
            />
          </div>

          <div>
            <label htmlFor="codechef" className="block text-sm font-medium text-gray-700 mb-1">
              CodeChef Handle
            </label>
            <input
              type="text"
              id="codechef"
              value={handles.codechef || ''}
              onChange={(e) => setHandles({ ...handles, codechef: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your-codechef-username"
            />
          </div>

          <div>
            <label htmlFor="atcoder" className="block text-sm font-medium text-gray-700 mb-1">
              AtCoder Handle
            </label>
            <input
              type="text"
              id="atcoder"
              value={handles.atcoder || ''}
              onChange={(e) => setHandles({ ...handles, atcoder: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your-atcoder-username"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Handles
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HandleModal;