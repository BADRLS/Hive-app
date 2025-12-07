import { useState } from 'react';
import { Link, Unlink, Shield, Bell, User, Mail } from 'lucide-react';

interface ConnectedAccount {
  id: string;
  name: string;
  connected: boolean;
  email?: string;
}

export function Settings() {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    { id: 'canvas', name: 'Canvas', connected: true, email: 'alex.johnson@canvas.university.edu' },
    { id: 'outlook', name: 'Outlook', connected: true, email: 'alex.johnson@university.edu' },
    { id: 'google', name: 'Google Calendar', connected: true, email: 'alex.johnson@gmail.com' },
    { id: 'zoom', name: 'Zoom', connected: false },
  ]);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  const toggleConnection = (id: string) => {
    setAccounts(accounts.map(account =>
      account.id === id
        ? { ...account, connected: !account.connected }
        : account
    ));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-600">Manage your account preferences and connected services</p>
      </div>

      {/* Account Connections */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Link className="text-amber-600" size={24} />
          <h3 className="text-gray-900">Connected Accounts</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Manage your OAuth connections to third-party platforms. Connect or disconnect accounts to control which data sources appear in your feed.
        </p>
        <div className="space-y-4">
          {accounts.map(account => (
            <div
              key={account.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  account.connected ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {account.connected ? (
                    <Link className="text-green-600" size={24} />
                  ) : (
                    <Unlink className="text-gray-400" size={24} />
                  )}
                </div>
                <div>
                  <h4 className="text-gray-900">{account.name}</h4>
                  {account.connected && account.email ? (
                    <p className="text-gray-600">{account.email}</p>
                  ) : (
                    <p className="text-gray-500">Not connected</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => toggleConnection(account.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  account.connected
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-amber-600 text-white hover:bg-amber-700'
                }`}
              >
                {account.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="text-amber-600" size={24} />
          <h3 className="text-gray-900">Notification Preferences</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Choose how you want to receive updates about assignments, deadlines, and announcements.
        </p>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <div>
              <h4 className="text-gray-900">Email Notifications</h4>
              <p className="text-gray-600">Receive important updates via email</p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-5 h-5 text-amber-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <div>
              <h4 className="text-gray-900">Push Notifications</h4>
              <p className="text-gray-600">Get instant alerts on your device</p>
            </div>
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e.target.checked)}
              className="w-5 h-5 text-amber-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <div>
              <h4 className="text-gray-900">Weekly Digest</h4>
              <p className="text-gray-600">Summary of upcoming tasks every Monday</p>
            </div>
            <input
              type="checkbox"
              checked={weeklyDigest}
              onChange={(e) => setWeeklyDigest(e.target.checked)}
              className="w-5 h-5 text-amber-600 rounded"
            />
          </label>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <User className="text-amber-600" size={24} />
          <h3 className="text-gray-900">Profile Settings</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="Alex Johnson"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="alex.johnson@university.edu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Major</label>
            <input
              type="text"
              defaultValue="Computer Science"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* Privacy & Data */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="text-amber-600" size={24} />
          <h3 className="text-gray-900">Privacy & Data</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-900">
              <strong>Important:</strong> Figma Make is designed for prototyping and is not intended for collecting personally identifiable information (PII) or securing sensitive data.
            </p>
          </div>
          <button className="text-amber-600 hover:text-amber-700">
            View Data Usage Policy
          </button>
          <br />
          <button className="text-amber-600 hover:text-amber-700">
            Download My Data
          </button>
          <br />
          <button className="text-red-600 hover:text-red-700">
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}
