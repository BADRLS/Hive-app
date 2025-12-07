import { useState } from 'react';
import { Search, Filter, AlertCircle, Calendar, FileText, Megaphone } from 'lucide-react';
import { TaskCard } from './TaskCard';

interface DashboardProps {
  onSelectAssignment: (assignment: any) => void;
}

// Mock data
const mockTasks = [
  {
    id: 1,
    title: 'Machine Learning Assignment 3',
    course: 'CS 4780',
    type: 'assignment',
    priority: 'high',
    dueDate: '2025-12-02T23:59:00',
    description: 'Implement and train a neural network for image classification',
    hasFiles: true,
    status: 'pending'
  },
  {
    id: 2,
    title: 'Organic Chemistry Lab Report',
    course: 'CHEM 2510',
    type: 'assignment',
    priority: 'high',
    dueDate: '2025-12-03T17:00:00',
    description: 'Complete lab report on synthesis experiment',
    hasFiles: false,
    status: 'pending'
  },
  {
    id: 3,
    title: 'Office Hours - Prof. Johnson',
    course: 'CS 4780',
    type: 'event',
    priority: 'medium',
    dueDate: '2025-12-01T14:00:00',
    description: 'Discuss assignment questions',
    hasFiles: false,
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'Reading Quiz Chapter 7',
    course: 'ECON 3010',
    type: 'assignment',
    priority: 'medium',
    dueDate: '2025-12-04T11:59:00',
    description: 'Quiz on macroeconomic principles',
    hasFiles: false,
    status: 'pending'
  },
  {
    id: 5,
    title: 'Final Project Proposal Due',
    course: 'INFO 3450',
    type: 'assignment',
    priority: 'high',
    dueDate: '2025-12-05T23:59:00',
    description: 'Submit final project proposal with team members',
    hasFiles: true,
    status: 'pending'
  },
  {
    id: 6,
    title: 'New Course Announcement',
    course: 'CS 4780',
    type: 'announcement',
    priority: 'low',
    dueDate: '2025-11-30T09:00:00',
    description: 'Extension granted for Assignment 2',
    hasFiles: false,
    status: 'read'
  },
  {
    id: 7,
    title: 'Study Group Meeting',
    course: 'CHEM 2510',
    type: 'event',
    priority: 'low',
    dueDate: '2025-12-02T19:00:00',
    description: 'Group study session at library',
    hasFiles: false,
    status: 'upcoming'
  },
  {
    id: 8,
    title: 'Midterm Exam',
    course: 'ECON 3010',
    type: 'event',
    priority: 'high',
    dueDate: '2025-12-06T10:00:00',
    description: 'Comprehensive midterm covering chapters 1-8',
    hasFiles: false,
    status: 'upcoming'
  }
];

export function Dashboard({ onSelectAssignment }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || task.type === filterType;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesType && matchesPriority;
  });

  const highPriorityTasks = filteredTasks.filter(t => t.priority === 'high');
  const mediumPriorityTasks = filteredTasks.filter(t => t.priority === 'medium');
  const lowPriorityTasks = filteredTasks.filter(t => t.priority === 'low');

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
        <h2 className="mb-2">Welcome back, Alex! 👋</h2>
        <p>You have {highPriorityTasks.length} high priority items and {filteredTasks.filter(t => t.type === 'event').length} upcoming events</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tasks, events, or courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={20} />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Types</option>
                <option value="assignment">Assignments</option>
                <option value="event">Events</option>
                <option value="announcement">Announcements</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* High Priority Section */}
      {highPriorityTasks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-red-500" size={24} />
            <h3 className="text-red-600">High Priority</h3>
          </div>
          <div className="space-y-3">
            {highPriorityTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onClick={() => onSelectAssignment(task)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Medium Priority Section */}
      {mediumPriorityTasks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-amber-500" size={24} />
            <h3 className="text-amber-600">Medium Priority</h3>
          </div>
          <div className="space-y-3">
            {mediumPriorityTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onClick={() => onSelectAssignment(task)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Low Priority Section */}
      {lowPriorityTasks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-gray-500" size={24} />
            <h3 className="text-gray-600">Low Priority</h3>
          </div>
          <div className="space-y-3">
            {lowPriorityTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onClick={() => onSelectAssignment(task)}
              />
            ))}
          </div>
        </div>
      )}

      {filteredTasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No tasks found matching your filters</p>
        </div>
      )}
    </div>
  );
}
