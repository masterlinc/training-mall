import React, { useEffect, useState } from 'react';
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';
import { stats } from '../../data/universities';

export const Stats: React.FC = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const statsData = [
    { icon: GraduationCap, value: stats.totalUniversities, label: '合作高校', suffix: '+' },
    { icon: BookOpen, value: stats.totalCourses, label: '精选课程', suffix: '+' },
    { icon: Users, value: stats.totalStudents, label: '注册学员', suffix: '+' },
    { icon: Award, value: stats.totalCertificates, label: '颁发证书', suffix: '+' }
  ];

  return (
    <div className="my-16 py-12 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-3xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">平台数据概览</h2>
          <p className="text-blue-100">我们致力于为高校师生提供最优质的学习资源</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center transform hover:scale-105 transition-transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {animated ? (
                    <CountUp end={stat.value} />
                  ) : (
                    0
                  )}
                  <span className="text-2xl">{stat.suffix}</span>
                </div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CountUp: React.FC<{ end: number }> = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count.toLocaleString()}</span>;
};
