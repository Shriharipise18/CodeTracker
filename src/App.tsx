import React, { useState } from 'react';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Layout/Header';

type AuthMode = 'login' | 'register';

function App() {
  const [user, setUser] = useState<any>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: '1',
        username: 'demo_user',
        email: email
      });
      setLoading(false);
    }, 1500);
  };

  const handleRegister = async (username: string, email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: '1',
        username: username,
        email: email
      });
      setLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    if (authMode === 'login') {
      return (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToRegister={() => setAuthMode('register')}
          loading={loading}
        />
      );
    } else {
      return (
        <RegisterForm
          onRegister={handleRegister}
          onSwitchToLogin={() => setAuthMode('login')}
          loading={loading}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      <Dashboard user={user} />
    </div>
  );
}

export default App;