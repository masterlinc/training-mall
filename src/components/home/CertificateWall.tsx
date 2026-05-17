import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle, ArrowRight } from 'lucide-react';
import { certificates } from '../../data/certificates';

export const CertificateWall: React.FC = () => {
  return (
    <div className="my-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">优秀证书展示</h2>
          <p className="text-gray-500 mt-1">见证学员的成长与成就</p>
        </div>
        <Link
          to="/certificates"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          查看全部
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.slice(0, 3).map((cert) => (
          <div
            key={cert.id}
            className="group relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 hover:shadow-xl hover:shadow-amber-500/10 transition-all transform hover:-translate-y-1"
          >
            <div className="absolute top-4 right-4">
              <Award className="w-8 h-8 text-amber-400" />
            </div>

            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium mb-3">
                {cert.type}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                {cert.title}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-semibold">
                  {cert.holder.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{cert.holder.name}</div>
                  <div className="text-xs text-gray-500">{cert.holder.university}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-amber-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">颁发机构</span>
                  <span className="font-medium text-gray-900">{cert.issuer.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-500">颁发日期</span>
                  <span className="font-medium text-gray-900">{cert.issueDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">证书有效</span>
                <span className="text-xs text-gray-400 ml-auto">验证码: {cert.verifyCode}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
