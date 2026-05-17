import React from 'react';
import { Banner } from '../components/home/Banner';
import { CategoryNav } from '../components/home/CategoryNav';
import { HotCourses } from '../components/home/HotCourses';
import { Stats } from '../components/home/Stats';
import { CertificateWall } from '../components/home/CertificateWall';
import { courses } from '../data/courses';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Banner />
        <CategoryNav />
        <HotCourses courses={courses} />
        <CertificateWall />
        <Stats />
      </div>
    </div>
  );
};
