import { Bell, User, Settings, Home, LogOut } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function Header({ currentView, onNavigate, onLogout }: HeaderProps) {
  const notificationCount = 3;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white">🐝</span>
            </div>
            <h1 className="text-amber-600">Hive</h1>
          </div>

          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'dashboard' 
                  ? 'bg-amber-50 text-amber-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Home size={20} />
              Dashboard
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('notifications')}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell size={20} className={currentView === 'notifications' ? 'text-amber-600' : 'text-gray-600'} />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                {notificationCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${
              currentView === 'profile' ? 'text-amber-600' : 'text-gray-600'
            }`}
          >
            <User size={20} />
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${
              currentView === 'settings' ? 'text-amber-600' : 'text-gray-600'
            }`}
          >
            <Settings size={20} />
          </button>

          <button
            onClick={onLogout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
