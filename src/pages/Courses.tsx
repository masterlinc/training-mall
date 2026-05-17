import React, { useState } from 'react';
import { CourseCard } from '../components/courses/CourseCard';
import { courses } from '../data/courses';
import { categories } from '../data/universities';
import { Search, Filter, Grid, List } from 'lucide-react';

export const Courses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [level, setLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCourses = courses.filter(course => {
    if (selectedCategory && course.category !== categories.find(c => c.id === selectedCategory)?.name) {
      return false;
    }
    if (priceRange === 'free' && course.price !== 0) return false;
    if (priceRange === 'paid' && course.price === 0) return false;
    if (level !== 'all' && course.level !== level) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return b.studentCount - a.studentCount;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">课程中心</h1>
          <p className="text-gray-600">探索海量优质课程，开启学习之旅</p>
        </div>

        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索课程名称、机构..."
                className="flex-1 bg-transparent outline-none text-gray-700"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 bg-gray-50 rounded-lg text-sm outline-none cursor-pointer"
              >
                <option value="all">全部价格</option>
                <option value="free">免费</option>
                <option value="paid">付费</option>
              </select>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="px-4 py-2 bg-gray-50 rounded-lg text-sm outline-none cursor-pointer"
              >
                <option value="all">全部级别</option>
                <option value="初级">初级</option>
                <option value="中级">中级</option>
                <option value="高级">高级</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-50 rounded-lg text-sm outline-none cursor-pointer"
              >
                <option value="popular">最受欢迎</option>
                <option value="rating">评分最高</option>
                <option value="price-low">价格从低到高</option>
                <option value="price-high">价格从高到低</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                !selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            共找到 <span className="font-semibold text-gray-900">{filteredCourses.length}</span> 门课程
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl p-4 border border-gray-100 flex gap-4 hover:shadow-lg transition-shadow">
                <img src={course.coverImage} alt={course.title} className="w-48 h-32 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{course.university} · {course.instructor.name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>⭐ {course.rating}</span>
                    <span>👥 {course.studentCount}</span>
                    <span>⏱ {course.duration}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">¥{course.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
