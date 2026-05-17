import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">高校培训商城</div>
                <div className="text-xs text-gray-500">Training Mall</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              汇聚集团内高校优质培训资源，为师生提供专业、便捷的在线学习平台。
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/courses" className="hover:text-cyan-400 transition-colors">课程中心</a></li>
              <li><a href="/certificates" className="hover:text-cyan-400 transition-colors">证书中心</a></li>
              <li><a href="/training" className="hover:text-cyan-400 transition-colors">培训报名</a></li>
              <li><a href="/profile" className="hover:text-cyan-400 transition-colors">个人中心</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">合作高校</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">清华大学</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">北京大学</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">复旦大学</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">上海交通大学</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">联系我们</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>北京市海淀区中关村大街1号</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>010-12345678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>contact@training-mall.edu.cn</span>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-cyan-500 transition-colors">
                <span className="text-sm">微</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-cyan-500 transition-colors">
                <span className="text-sm">推</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-cyan-500 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© 2024 高校培训商城. 保留所有权利. | 京ICP备12345678号</p>
        </div>
      </div>
    </footer>
  );
};
