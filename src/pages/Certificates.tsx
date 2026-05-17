import React, { useState } from 'react';
import { CertificateCard } from '../components/certificates/CertificateCard';
import { certificates } from '../data/certificates';
import { Search, Award, ShieldCheck, FileText, Sparkles } from 'lucide-react';

export const Certificates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const filteredCertificates = certificates.filter(cert => {
    if (selectedType && cert.type !== selectedType) return false;
    if (searchTerm && !cert.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !cert.holder.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !cert.issuer.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleVerify = () => {
    if (verifyCode) {
      const found = certificates.find(c => c.verifyCode === verifyCode);
      if (found) {
        alert(`验证成功！\n证书名称：${found.title}\n持有人：${found.holder.name}\n颁发机构：${found.issuer.name}\n状态：${found.status}`);
      } else {
        alert('未找到该验证码对应的证书，请检查后重新输入。');
      }
      setVerifyCode('');
      setShowVerifyModal(false);
    }
  };

  const certTypes = [...new Set(certificates.map(c => c.type))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-amber-600 via-orange-500 to-amber-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium">权威认证 · 可查验 · 可追溯</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">证书中心</h1>
            <p className="text-xl text-amber-100 mb-8">展示和验证集团高校培训证书</p>

            <button
              onClick={() => setShowVerifyModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl font-semibold hover:shadow-lg transition-shadow"
            >
              <ShieldCheck className="w-5 h-5" />
              验证证书
            </button>
          </div>
        </div>
      </div>

      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">证书验证</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="输入证书验证码"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleVerify}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold"
                >
                  立即验证
                </button>
                <button
                  onClick={() => setShowVerifyModal(false)}
                  className="px-6 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索证书名称、持有人、机构..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                !selectedType
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              全部
            </button>
            {certTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedType === type
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map(cert => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">未找到证书</h3>
            <p className="text-gray-400">请尝试其他搜索条件</p>
          </div>
        )}
      </div>
    </div>
  );
};
