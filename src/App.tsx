import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { Certificates } from './pages/Certificates';
import { Training } from './pages/Training';
import { TrainingDetail } from './pages/TrainingDetail';
import { Profile } from './pages/Profile';

function App() {
  return (
    <BrowserRouter basename="/training-mall">
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/certificates/:id" element={<Certificates />} />
            <Route path="/training" element={<Training />} />
            <Route path="/training/:id" element={<TrainingDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
