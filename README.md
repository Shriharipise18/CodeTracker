# CodeTracker - Competitive Programming Progress Tracker

A comprehensive web application for tracking competitive programming progress across multiple platforms including LeetCode, Codeforces, CodeChef, and AtCoder.

## 🚀 Features

### Phase 1 (Current Implementation)
- **Authentication System**: JWT-based signup/login with secure password handling
- **Multi-Platform Support**: Track progress on LeetCode, Codeforces, CodeChef, and AtCoder
- **Interactive Dashboard**: Beautiful, responsive dashboard with real-time stats
- **Progress Visualization**: Charts showing problem-solving progress over time
- **Platform Integration**: API integration for fetching user statistics

### Phase 2 (Planned)
- **Friends System**: Add friends and compare statistics
- **Leaderboards**: Competitive leaderboards among friends
- **Social Features**: Follow friends' progress and achievements

### Phase 3 (Future)
- **Activity Feed**: Real-time updates on friends' activities
- **Smart Recommendations**: AI-powered topic recommendations based on weak areas
- **Contest Tracking**: Track upcoming contests and performance

### Phase 4 (Advanced)
- **Gamification**: Badges, streaks, and achievements system
- **Challenges**: Create and participate in coding challenges
- **Analytics**: Advanced progress analytics and insights

## 🏗️ System Architecture

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for modern, responsive design
- **Recharts** for interactive data visualization
- **Lucide React** for consistent iconography

### Backend Architecture (Recommended)
```
Node.js + Express.js
├── Authentication (JWT)
├── API Routes
│   ├── /api/auth (login, register, refresh)
│   ├── /api/users (profile, handles)
│   ├── /api/stats (platform statistics)
│   └── /api/friends (social features)
├── External API Integration
│   ├── LeetCode GraphQL API
│   ├── Codeforces REST API
│   ├── CodeChef API
│   └── AtCoder API
└── Database Layer (Supabase/MongoDB)
```

### Database Schema

#### Users Table/Collection
```javascript
{
  id: string (UUID),
  username: string (unique),
  email: string (unique),
  password: string (hashed),
  handles: {
    leetcode?: string,
    codeforces?: string,
    codechef?: string,
    atcoder?: string
  },
  friends: string[] (user IDs),
  created_at: timestamp,
  updated_at: timestamp
}
```

#### User Stats (Cached)
```javascript
{
  id: string,
  user_id: string,
  platform: string,
  stats: {
    // Platform-specific statistics
    totalSolved: number,
    rating?: number,
    rank?: string,
    // ... other platform-specific fields
  },
  last_updated: timestamp
}
```

## 🔌 API Integration

### LeetCode GraphQL API
```javascript
const LEETCODE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
    }
  }
`;
```

### Codeforces REST API
```javascript
// Get user info
GET https://codeforces.com/api/user.info?handles=username

// Get user submissions
GET https://codeforces.com/api/user.status?handle=username&from=1&count=10000
```

## 📊 Key Components

### Dashboard Components
- **StatsCard**: Display key metrics with trend indicators
- **PlatformCard**: Individual platform statistics and controls
- **ProgressChart**: Interactive line chart showing progress over time
- **HandleModal**: Form for managing platform handles

### Authentication Components
- **LoginForm**: Secure login with password visibility toggle
- **RegisterForm**: User registration with validation
- **Header**: Navigation with user menu and logout

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) - Main brand color
- **Secondary**: Orange (#f59e0b) - LeetCode accent
- **Success**: Green (#10b981) - Positive actions
- **Warning**: Orange (#f59e0b) - Attention items
- **Error**: Red (#ef4444) - Error states
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Inter font family, weights 600-700
- **Body**: Inter font family, weight 400
- **Code**: JetBrains Mono for code snippets

### Component Patterns
- **Cards**: Rounded corners (rounded-xl), subtle shadows
- **Buttons**: Consistent padding, hover states, loading states
- **Forms**: Clear labels, focus states, validation feedback
- **Charts**: Consistent color scheme, interactive tooltips

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (or MongoDB for backend)

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Start development server: `npm run dev`

### Environment Variables
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Consistent component structure
- Modular file organization

## 📈 Future Enhancements

### Technical Improvements
- Progressive Web App (PWA) features
- Offline data caching
- Real-time WebSocket updates
- Advanced analytics dashboard
- Mobile application (React Native)

### Feature Additions
- Contest calendar integration
- Problem recommendation engine
- Study plan generator
- Team challenges and competitions
- Integration with more platforms (HackerRank, TopCoder, etc.)

### Performance Optimizations
- Lazy loading of components
- Virtual scrolling for large lists
- Image optimization
- CDN integration for static assets
- Database query optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Platform APIs for providing public access to user statistics
- React community for excellent tooling and libraries
- Tailwind CSS for the utility-first CSS framework
- Recharts for beautiful, responsive charts