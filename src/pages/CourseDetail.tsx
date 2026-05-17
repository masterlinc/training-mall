import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Users, BookOpen, Clock, Award, Play, ChevronDown, ChevronUp, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { courses } from '../data/courses';
import { useAuthStore } from '../store';

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = courses.find(c => c.id === id);
  const { user, enrollCourse } = useAuthStore();
  const [activeTab, setActiveTab] = useState('info');
  const [showAllSyllabus, setShowAllSyllabus] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">课程未找到</h2>
          <Link to="/courses" className="text-blue-600 hover:underline">返回课程列表</Link>
        </div>
      </div>
    );
  }

  const isEnrolled = user?.enrolledCourses.includes(course.id);
  const isCompleted = user?.completedCourses.includes(course.id);

  const handleEnroll = () => {
    if (user && !isEnrolled) {
      enrollCourse(course.id);
      alert('报名成功！');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">{course.category}</span>
                <span className="px-3 py-1 bg-cyan-500/30 backdrop-blur-sm rounded-full text-sm">{course.certificateType}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{course.subtitle}</p>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  <span>{course.studentCount} 学员</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>{course.level}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-gray-900">
              <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                <img src={course.coverImage} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Play className="w-8 h-8 text-blue-600 ml-1" />
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-3xl font-bold text-blue-600">¥{course.price}</span>
                {course.originalPrice > course.price && (
                  <span className="text-lg text-gray-400 line-through ml-2">¥{course.originalPrice}</span>
                )}
              </div>

              {isEnrolled ? (
                <Link
                  to={`/learning/${course.id}`}
                  className="block w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold text-center hover:shadow-lg transition-shadow"
                >
                  {isCompleted ? '复习课程' : '继续学习'}
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-shadow"
                >
                  立即报名
                </button>
              )}

              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  收藏
                </button>
                <button className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  分享
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className="flex gap-4 border-b mb-6">
                {['info', 'syllabus', 'reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-2 font-medium transition-colors ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'info' ? '课程介绍' : tab === 'syllabus' ? '课程大纲' : '学员评价'}
                  </button>
                ))}
              </div>

              {activeTab === 'info' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">课程描述</h3>
                    <p className="text-gray-600 leading-relaxed">{course.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">授课机构</h3>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl font-bold">
                        {course.university.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{course.university}</div>
                        <div className="text-sm text-gray-500">官方认证机构</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">授课讲师</h3>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <img src={course.instructor.avatar} alt={course.instructor.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <div className="font-semibold text-gray-900">{course.instructor.name}</div>
                        <div className="text-sm text-gray-500">{course.instructor.title}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">课程标签</h3>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'syllabus' && (
                <div className="space-y-3">
                  {course.syllabus.slice(0, showAllSyllabus ? undefined : 5).map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                        {item.chapter}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.duration}</div>
                      </div>
                    </div>
                  ))}
                  {course.syllabus.length > 5 && (
                    <button
                      onClick={() => setShowAllSyllabus(!showAllSyllabus)}
                      className="w-full py-3 text-blue-600 font-medium flex items-center justify-center gap-2 hover:bg-blue-50 rounded-xl transition-colors"
                    >
                      {showAllSyllabus ? (
                        <>收起 <ChevronUp className="w-4 h-4" /></>
                      ) : (
                        <>查看全部 {course.syllabus.length} 章 <ChevronDown className="w-4 h-4" /></>
                      )}
                    </button>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {course.reviews.length > 0 ? (
                    course.reviews.map((review, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-semibold">
                            {review.user.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{review.user}</div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                        <div className="text-sm text-gray-400 mt-2">{review.date}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>暂无评价</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">课程信息</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">课程难度</span>
                  <span className="font-medium text-gray-900">{course.level}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">课程时长</span>
                  <span className="font-medium text-gray-900">{course.duration}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">学习人数</span>
                  <span className="font-medium text-gray-900">{course.studentCount}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">证书类型</span>
                  <span className="font-medium text-gray-900">{course.certificateType}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">课程评分</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-gray-900">{course.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
