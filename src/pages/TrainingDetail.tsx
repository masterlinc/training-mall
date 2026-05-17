import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Clock, Phone, Mail, CheckCircle, Award, Share2, Download } from 'lucide-react';
import { trainings } from '../data/trainings';
import { useAuthStore } from '../store';

export const TrainingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const training = trainings.find(t => t.id === id);
  const { user, addTrainingRecord } = useAuthStore();
  const [activeTab, setActiveTab] = useState('info');

  if (!training) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">培训项目未找到</h2>
          <Link to="/training" className="text-blue-600 hover:underline">返回培训列表</Link>
        </div>
      </div>
    );
  }

  const isEnrolled = user?.trainingRecords.includes(training.id);
  const progress = Math.round((training.enrolled / training.capacity) * 100);
  const spotsLeft = training.capacity - training.enrolled;

  const handleEnroll = () => {
    if (user && !isEnrolled) {
      addTrainingRecord(training.id);
      alert('报名成功！我们会尽快与您联系确认。');
    }
  };

  const statusColors = {
    '报名中': 'bg-green-100 text-green-700',
    '已满员': 'bg-red-100 text-red-700',
    '已结束': 'bg-gray-100 text-gray-600',
    '即将开始': 'bg-amber-100 text-amber-700'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">{training.category}</span>
                <span className={`px-3 py-1 backdrop-blur-sm rounded-full text-sm ${statusColors[training.status as keyof typeof statusColors] || 'bg-white/20'}`}>
                  {training.status}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{training.title}</h1>
              <p className="text-lg text-green-100 mb-6">{training.organizer}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Calendar className="w-6 h-6 mb-2" />
                  <div className="text-sm text-green-200">培训时间</div>
                  <div className="font-semibold">{training.startDate}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <MapPin className="w-6 h-6 mb-2" />
                  <div className="text-sm text-green-200">培训地点</div>
                  <div className="font-semibold">{training.location}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Users className="w-6 h-6 mb-2" />
                  <div className="text-sm text-green-200">报名人数</div>
                  <div className="font-semibold">{training.enrolled}/{training.capacity}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Clock className="w-6 h-6 mb-2" />
                  <div className="text-sm text-green-200">培训方式</div>
                  <div className="font-semibold">{training.mode}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-gray-900">
              <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                <img src={training.coverImage} alt={training.title} className="w-full h-full object-cover" />
              </div>

              <div className="mb-4">
                <span className="text-sm text-gray-500">培训费用</span>
                <div className="text-3xl font-bold text-green-600">¥{training.price}</div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">报名进度</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${progress}%` }} />
                </div>
                <div className="text-sm text-gray-500 mt-1">剩余 {spotsLeft} 个名额</div>
              </div>

              {isEnrolled ? (
                <div className="w-full py-3 bg-green-100 text-green-700 rounded-xl font-semibold text-center flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  已报名
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={training.status === '已满员' || training.status === '已结束'}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {training.status === '报名中' ? '立即报名' : '暂不可报名'}
                </button>
              )}

              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  分享
                </button>
                <button className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  下载资料
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
                {['info', 'schedule', 'contact'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-2 font-medium transition-colors ${
                      activeTab === tab
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'info' ? '培训介绍' : tab === 'schedule' ? '培训日程' : '联系方式'}
                  </button>
                ))}
              </div>

              {activeTab === 'info' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">培训简介</h3>
                    <p className="text-gray-600 leading-relaxed">{training.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">主办方</h3>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white text-xl font-bold">
                        {training.organizer.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{training.organizer}</div>
                        <div className="text-sm text-gray-500">官方认证机构</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">报名要求</h3>
                    <div className="space-y-2">
                      {training.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-gray-600">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-4">
                  {training.schedule.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white flex items-center justify-center font-bold">
                        Day {item.day}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1">{item.topic}</div>
                        <div className="text-sm text-gray-500">主讲人：{item.speaker}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">联系方式</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 font-semibold">{training.contact.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{training.contact.name}</div>
                          <div className="text-sm text-gray-500">培训负责人</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <Phone className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{training.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <Mail className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{training.contact.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">培训信息</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">培训类别</span>
                  <span className="font-medium text-gray-900">{training.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">培训方式</span>
                  <span className="font-medium text-gray-900">{training.mode}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">培训地点</span>
                  <span className="font-medium text-gray-900">{training.location}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">开始日期</span>
                  <span className="font-medium text-gray-900">{training.startDate}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">结束日期</span>
                  <span className="font-medium text-gray-900">{training.endDate}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">报名状态</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[training.status as keyof typeof statusColors]}`}>
                    {training.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
