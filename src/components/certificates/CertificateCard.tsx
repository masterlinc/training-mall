import React from 'react';
import { Award, CheckCircle, Clock, Download, Share2, Printer } from 'lucide-react';
import { Certificate } from '../../data/certificates';
import { Link } from 'react-router-dom';

interface CertificateCardProps {
  certificate: Certificate;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  const templateStyles = {
    elegant: 'from-amber-50 to-orange-50 border-amber-200',
    modern: 'from-blue-50 to-cyan-50 border-blue-200',
    tech: 'from-purple-50 to-indigo-50 border-purple-200',
    professional: 'from-gray-50 to-slate-50 border-gray-300',
    secure: 'from-green-50 to-emerald-50 border-green-200',
    creative: 'from-pink-50 to-rose-50 border-pink-200'
  };

  return (
    <div className="group bg-gradient-to-br rounded-2xl p-6 border hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-[1.02] duration-300">
      <div className={`bg-gradient-to-br ${templateStyles[certificate.template as keyof typeof templateStyles] || templateStyles.elegant} rounded-xl p-6 mb-4 relative overflow-hidden`}>
        <div className="absolute top-4 right-4 opacity-20">
          <Award className="w-16 h-16 text-amber-600" />
        </div>
        
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-amber-600" />
            <span className="text-xs font-medium text-amber-700 px-2 py-1 bg-amber-100 rounded-full">
              {certificate.type}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight">
            {certificate.title}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-semibold text-sm">
                {certificate.holder.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{certificate.holder.name}</div>
                <div className="text-xs text-gray-500">{certificate.holder.university}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">颁发机构</span>
          <span className="font-medium text-gray-900">{certificate.issuer.name}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">颁发日期</span>
          <span className="font-medium text-gray-900">{certificate.issueDate}</span>
        </div>
        
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600 font-medium flex-1">证书有效</span>
          <span className="text-xs text-gray-400">验证码: {certificate.verifyCode}</span>
        </div>

        <div className="flex items-center gap-2 pt-3">
          <Link
            to={`/certificates/${certificate.id}`}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
          >
            查看详情
          </Link>
          <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
