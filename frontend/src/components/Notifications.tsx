import { useState } from 'react';
import { Bell, Check, Trash2, Settings, Filter } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  course: string;
  time: string;
  read: boolean;
  type: 'assignment' | 'event' | 'announcement' | 'grade';
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'New Assignment Posted',
    message: 'Machine Learning Assignment 3 has been posted and is due December 2nd',
    course: 'CS 4780',
    time: '2 hours ago',
    read: false,
    type: 'assignment'
  },
  {
    id: 2,
    title: 'Grade Posted',
    message: 'Your grade for Lab Report 2 has been posted: A-',
    course: 'CHEM 2510',
    time: '5 hours ago',
    read: false,
    type: 'grade'
  },
  {
    id: 3,
    title: 'Upcoming Event',
    message: 'Office hours with Prof. Johnson tomorrow at 2:00 PM',
    course: 'CS 4780',
    time: '1 day ago',
    read: false,
    type: 'event'
  },
  {
    id: 4,
    title: 'Assignment Reminder',
    message: 'Reading Quiz Chapter 7 is due in 3 days',
    course: 'ECON 3010',
    time: '1 day ago',
    read: true,
    type: 'assignment'
  },
  {
    id: 5,
    title: 'Course Announcement',
    message: 'Extension granted for Assignment 2 until December 5th',
    course: 'CS 4780',
    time: '2 days ago',
    read: true,
    type: 'announcement'
  }
];

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [showSettings, setShowSettings] = useState(false);

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'bg-amber-100 text-amber-700';
      case 'event':
        return 'bg-blue-100 text-blue-700';
      case 'announcement':
        return 'bg-purple-100 text-purple-700';
      case 'grade':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-900 mb-1">Notifications</h2>
            <p className="text-gray-600">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter size={18} />
              {filter === 'all' ? 'Show Unread' : 'Show All'}
            </button>
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              <Check size={18} />
              Mark All Read
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-gray-900 mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-amber-600" />
                <span className="text-gray-700">Email notifications for new assignments</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-amber-600" />
                <span className="text-gray-700">Push notifications for upcoming deadlines</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-amber-600" />
                <span className="text-gray-700">Notifications for grade postings</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 text-amber-600" />
                <span className="text-gray-700">Daily summary emails</span>
              </label>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Bell size={48} className="mx-auto mb-4 opacity-50" />
              <p>No notifications to display</p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.read 
                    ? 'bg-white border-gray-200' 
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-gray-900">{notification.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${getTypeColor(notification.type)}`}>
                        {notification.type}
                      </span>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{notification.message}</p>
                    <div className="flex items-center gap-4 text-gray-500">
                      <span>{notification.course}</span>
                      <span>•</span>
                      <span>{notification.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Check size={18} className="text-green-600" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
