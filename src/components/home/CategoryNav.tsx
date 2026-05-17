import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, BarChart3, Blocks, Cloud, Shield, Package, Palette, Rocket } from 'lucide-react';
import { categories } from '../../data/universities';

const iconMap: Record<string, React.ElementType> = {
  Brain,
  BarChart3,
  Blocks,
  Cloud,
  Shield,
  Package,
  Palette,
  Rocket
};

export const CategoryNav: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 my-8">
      {categories.map((category) => {
        const IconComponent = iconMap[category.icon];
        return (
          <Link
            key={category.id}
            to={`/courses?category=${category.id}`}
            className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 hover:border-transparent hover:shadow-xl hover:shadow-blue-500/10 transition-all transform hover:-translate-y-1"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
              {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center">
              {category.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
