import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, BookOpen, Award, Calendar, Settings, LogOut, Edit2, Mail, Phone, MapPin, Building, Star, Clock, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store';
import { courses } from '../data/courses';
import { certificates } from '../data/certificates';
import { trainings } from '../data/trainings';

export const Profile: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('courses');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">请先登录</h2>
          <Link to="/" className="text-blue-600 hover:underline">返回首页</Link>
        </div>
      </div>
    );
  }

  const userCourses = courses.filter(c => user.enrolledCourses.includes(c.id) || user.completedCourses.includes(c.id));
  const userCertificates = certificates.filter(c => user.certificates.includes(c.id));
  const userTrainings = trainings.filter(t => user.trainingRecords.includes(t.id));

  const tabs = [
    { id: 'courses', label: '我的课程', icon: BookOpen, count: userCourses.length },
    { id: 'certificates', label: '我的证书', icon: Award, count: userCertificates.length },
    { id: 'training', label: '培训记录', icon: Calendar, count: userTrainings.length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
              />
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Edit2 className="w-5 h-5 text-blue-600" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {user.role === 'student' ? '学生' : user.role === 'teacher' ? '教师' : '管理员'}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start text-blue-100">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span className="text-sm">{user.university}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">{user.faculty}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">退出登录</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">{userCourses.length}</div>
              <div className="text-blue-100 text-sm">在学课程</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">{user.completedCourses.length}</div>
              <div className="text-blue-100 text-sm">已完成</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">{userCertificates.length}</div>
              <div className="text-blue-100 text-sm">获得证书</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">{userTrainings.length}</div>
              <div className="text-blue-100 text-sm">培训记录</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCourses.length > 0 ? (
              userCourses.map(course => {
                const isCompleted = user.completedCourses.includes(course.id);
                return (
                  <Link
                    key={course.id}
                    to={`/courses/${course.id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-transparent hover:shadow-xl transition-all"
                  >
                    <div className="relative h-40">
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      {isCompleted && (
                        <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          已完成
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">{course.university}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full text-center py-16">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">暂无课程</h3>
                <p className="text-gray-400 mb-4">开始探索感兴趣的课程吧</p>
                <Link
                  to="/courses"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  浏览课程
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCertificates.length > 0 ? (
              userCertificates.map(cert => (
                <div key={cert.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all">
                  <div className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 mb-4 relative overflow-hidden`}>
                    <div className="absolute top-2 right-2 opacity-20">
                      <Award className="w-12 h-12 text-amber-600" />
                    </div>
                    <div className="relative">
                      <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium mb-2">
                        {cert.type}
                      </span>
                      <h3 className="font-bold text-gray-900 mb-3">{cert.title}</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-semibold">
                          {cert.holder.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{cert.holder.name}</div>
                          <div className="text-xs text-gray-500">{cert.issuer.name}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">颁发日期</span>
                      <span className="font-medium text-gray-900">{cert.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">验证码</span>
                      <span className="font-mono text-xs text-gray-600">{cert.verifyCode}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">{cert.status}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <Award className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">暂无证书</h3>
                <p className="text-gray-400 mb-4">完成课程学习即可获得证书</p>
                <Link
                  to="/courses"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  开始学习
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'training' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userTrainings.length > 0 ? (
              userTrainings.map(training => (
                <div key={training.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                  <div className="relative h-40">
                    <img
                      src={training.coverImage}
                      alt={training.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-bold text-white mb-1">{training.title}</h3>
                      <p className="text-sm text-white/80">{training.organizer}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">培训时间</span>
                        <div className="font-medium text-gray-900">{training.startDate}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">培训地点</span>
                        <div className="font-medium text-gray-900">{training.location}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">培训方式</span>
                        <div className="font-medium text-gray-900">{training.mode}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">报名状态</span>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-green-600">已报名</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">暂无培训记录</h3>
                <p className="text-gray-400 mb-4">浏览并报名感兴趣的培训项目</p>
                <Link
                  to="/training"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  浏览培训
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
