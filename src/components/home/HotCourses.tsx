import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, BookOpen, ArrowRight } from 'lucide-react';
import { Course } from '../../data/courses';

interface HotCoursesProps {
  courses: Course[];
}

export const HotCourses: React.FC<HotCoursesProps> = ({ courses }) => {
  return (
    <div className="my-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">热门课程</h2>
          <p className="text-gray-500 mt-1">精选高校优质课程，助力专业成长</p>
        </div>
        <Link
          to="/courses"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          查看全部
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.slice(0, 4).map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-transparent hover:shadow-xl hover:shadow-blue-500/10 transition-all transform hover:-translate-y-1"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                  {course.category}
                </span>
              </div>
              <div className="absolute bottom-3 right-3">
                <span className="px-3 py-1 bg-cyan-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                  {course.certificateType}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{course.university}</p>

              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium text-gray-700">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.studentCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-600">{course.instructor.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-blue-600">¥{course.price}</span>
                  {course.originalPrice > course.price && (
                    <span className="text-sm text-gray-400 line-through ml-1">¥{course.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
