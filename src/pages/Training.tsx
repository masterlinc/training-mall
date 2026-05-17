import React, { useState } from 'react';
import { TrainingCard } from '../components/training/TrainingCard';
import { trainings } from '../data/trainings';
import { Search, Calendar, MapPin, Users, TrendingUp } from 'lucide-react';

export const Training: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredTrainings = trainings.filter(training => {
    if (selectedCategory && training.category !== selectedCategory) return false;
    if (selectedStatus && training.status !== selectedStatus) return false;
    if (searchTerm && !training.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !training.organizer.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const categories = [...new Set(trainings.map(t => t.category))];
  const statuses = [...new Set(trainings.map(t => t.status))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">专业培训 · 名师授课 · 实战演练</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">培训报名</h1>
            <p className="text-xl text-green-100 mb-8">提供各类专业培训项目，助力职业发展</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索培训项目名称、主办方..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              全部类型
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => setSelectedStatus(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedStatus ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              全部状态
            </button>
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedStatus === status ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            共找到 <span className="font-semibold text-gray-900">{filteredTrainings.length}</span> 个培训项目
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainings.map(training => (
            <TrainingCard key={training.id} training={training} />
          ))}
        </div>

        {filteredTrainings.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">未找到培训项目</h3>
            <p className="text-gray-400">请尝试其他搜索条件</p>
          </div>
        )}
      </div>
    </div>
  );
};
