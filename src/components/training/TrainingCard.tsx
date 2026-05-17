import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Clock } from 'lucide-react';
import { Training } from '../../data/trainings';

interface TrainingCardProps {
  training: Training;
}

export const TrainingCard: React.FC<TrainingCardProps> = ({ training }) => {
  const statusColors = {
    '报名中': 'bg-green-100 text-green-700',
    '已满员': 'bg-red-100 text-red-700',
    '已结束': 'bg-gray-100 text-gray-600',
    '即将开始': 'bg-amber-100 text-amber-700'
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-transparent hover:shadow-xl hover:shadow-blue-500/10 transition-all transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={training.coverImage}
          alt={training.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
            {training.category}
          </span>
          <span className={`px-3 py-1 backdrop-blur-sm rounded-full text-xs font-medium ${statusColors[training.status as keyof typeof statusColors] || statusColors['报名中']}`}>
            {training.status}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
            {training.title}
          </h3>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{training.location}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-gray-600">
            {training.startDate} 至 {training.endDate}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{training.enrolled}/{training.capacity}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{training.mode}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-500">费用</span>
            <div className="text-xl font-bold text-blue-600">¥{training.price}</div>
          </div>
          <Link
            to={`/training/${training.id}`}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            立即报名
          </Link>
        </div>
      </div>
    </div>
  );
};
