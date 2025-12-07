import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onLogin();
  };

  const handleSSOLogin = () => {
    onLogin();
  };

  // Forgot Password Screen
  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-amber-600 mb-2">Hive</h1>
            <h2 className="text-gray-700">Reset Password</h2>
            <p className="text-gray-600 mt-2">Enter your email to receive a password reset link</p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            alert('Password reset link sent to ' + email);
            setShowForgotPassword(false);
          }}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors mb-4"
            >
              Send Reset Link
            </button>

            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="w-full text-amber-600 hover:text-amber-700"
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Sign Up Screen
  if (showSignUp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-amber-100 rounded-full mb-4">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <div className="text-white">🐝</div>
              </div>
            </div>
            <h1 className="text-amber-600 mb-2">Welcome to Hive</h1>
            <p className="text-gray-600">Create your account</p>
          </div>

          <form onSubmit={handleSignUp} className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Sign Up
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-gray-500">Or</span>
            </div>
          </div>

          <button
            onClick={handleSSOLogin}
            className="w-full border-2 border-amber-600 text-amber-600 py-3 rounded-lg hover:bg-amber-50 transition-colors mb-4"
          >
            Sign Up with SSO
          </button>

          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <button
              type="button"
              onClick={() => setShowSignUp(false)}
              className="text-amber-600 hover:text-amber-700"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login Screen (Default)
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-amber-100 rounded-full mb-4">
            <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
              <div className="text-white">🐝</div>
            </div>
          </div>
          <h1 className="text-amber-600 mb-2">Welcome to Hive</h1>
          <p className="text-gray-600">Your Academic Hub</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="text-right mb-6">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-amber-600 hover:text-amber-700"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors mb-4"
          >
            Log In
          </button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-gray-500">Or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSSOLogin}
            className="w-full border-2 border-amber-600 text-amber-600 py-3 rounded-lg hover:bg-amber-50 transition-colors"
          >
            Sign In with SSO
          </button>
        </form>

        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            type="button"
            onClick={() => setShowSignUp(true)}
            className="text-amber-600 hover:text-amber-700"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}