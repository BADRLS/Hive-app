import { Award, Calendar, CheckCircle, TrendingUp, BookOpen } from 'lucide-react';

const mockAchievements = [
  { id: 1, name: 'Perfect Week', description: 'Submitted all assignments on time for a week', icon: '🎯', earned: true },
  { id: 2, name: 'Early Bird', description: 'Submitted 5 assignments early', icon: '🌅', earned: true },
  { id: 3, name: 'Consistent Learner', description: 'Logged in 30 days in a row', icon: '📚', earned: true },
  { id: 4, name: 'Team Player', description: 'Participated in 10 group projects', icon: '🤝', earned: false },
  { id: 5, name: 'Overachiever', description: 'Completed 50 assignments', icon: '⭐', earned: false },
];

const recentActivity = [
  { id: 1, action: 'Submitted Assignment', course: 'CS 4780', item: 'Machine Learning Assignment 2', time: '2 hours ago' },
  { id: 2, action: 'Viewed Lecture Notes', course: 'CHEM 2510', item: 'Organic Chemistry Chapter 7', time: '1 day ago' },
  { id: 3, action: 'Attended Office Hours', course: 'CS 4780', item: 'Prof. Johnson', time: '2 days ago' },
  { id: 4, action: 'Submitted Assignment', course: 'ECON 3010', item: 'Reading Quiz Chapter 6', time: '3 days ago' },
  { id: 5, action: 'Joined Study Group', course: 'CHEM 2510', item: 'Midterm Prep Session', time: '4 days ago' },
];

export function Profile() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white">
            <span className="text-4xl">👤</span>
          </div>
          <div className="flex-1">
            <h2 className="text-gray-900 mb-1">Alex Johnson</h2>
            <p className="text-gray-600 mb-4">alex.johnson@university.edu</p>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg">
                  <p className="text-gray-600">Year</p>
                  <p>Junior</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
                  <p className="text-gray-600">Major</p>
                  <p>Computer Science</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                  <p className="text-gray-600">GPA</p>
                  <p>3.75</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Completed</p>
              <h3 className="text-gray-900">28</h3>
            </div>
          </div>
          <p className="text-gray-500">Assignments this semester</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Calendar className="text-amber-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Upcoming</p>
              <h3 className="text-gray-900">8</h3>
            </div>
          </div>
          <p className="text-gray-500">Events this week</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">On-Time Rate</p>
              <h3 className="text-gray-900">94%</h3>
            </div>
          </div>
          <p className="text-gray-500">Submission punctuality</p>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Award className="text-amber-600" size={24} />
          <h3 className="text-gray-900">Achievements</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAchievements.map(achievement => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 ${
                achievement.earned
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h4 className="text-gray-900 mb-1">{achievement.name}</h4>
              <p className="text-gray-600">{achievement.description}</p>
              {achievement.earned && (
                <div className="mt-3 flex items-center gap-2 text-green-600">
                  <CheckCircle size={16} />
                  <span>Earned</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="text-amber-600" size={24} />
          <h3 className="text-gray-900">Recent Activity</h3>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-amber-600" size={20} />
              </div>
              <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-900">{activity.action}</p>
                    <p className="text-gray-600">{activity.item}</p>
                    <p className="text-gray-500">{activity.course}</p>
                  </div>
                  <span className="text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
