import { useState } from 'react';
import { Link, Check } from 'lucide-react';

interface ConnectedAccount {
  id: string;
  name: string;
  description: string;
  connected: boolean;
}

interface AccountLinkingProps {
  onContinue: () => void;
}

export function AccountLinking({ onContinue }: AccountLinkingProps) {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    {
      id: 'canvas',
      name: 'Canvas',
      description: 'Sync assignments, grades, and course materials',
      connected: false,
    },
    {
      id: 'outlook',
      name: 'Outlook',
      description: 'Import calendar events and email notifications',
      connected: false,
    },
    {
      id: 'google',
      name: 'Google Calendar',
      description: 'Sync your academic and personal calendar',
      connected: false,
    },
  ]);

  const toggleConnection = (id: string) => {
    setAccounts(
      accounts.map((account) =>
        account.id === id
          ? { ...account, connected: !account.connected }
          : account
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-amber-100 rounded-full mb-4">
            <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
              <div className="text-white">🐝</div>
            </div>
          </div>
          <h2 className="text-gray-900 mb-2">Connect Your Academic Life</h2>
          <p className="text-gray-600">Link your accounts to populate your smart feed.</p>
        </div>

        <div className="space-y-4 mb-8">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={`flex items-center justify-between p-5 rounded-lg border-2 transition-all ${
                account.connected
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    account.connected ? 'bg-green-100' : 'bg-gray-100'
                  }`}
                >
                  {account.connected ? (
                    <Check className="text-green-600" size={24} />
                  ) : (
                    <Link className="text-gray-400" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">{account.name}</h4>
                  <p className="text-gray-600">{account.description}</p>
                </div>
              </div>
              <button
                onClick={() => toggleConnection(account.id)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  account.connected
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-amber-600 text-white hover:bg-amber-700'
                }`}
              >
                {account.connected ? 'Connected' : 'Connect'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center text-gray-500 mb-6">
          <p>You can always connect or disconnect accounts later in Settings</p>
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}
