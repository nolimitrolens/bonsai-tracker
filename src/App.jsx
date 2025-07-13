import React from 'react';
import GirthTracker from './components/GirthTracker';
import TaskDashboard from './components/TaskDashboard';
import PhotoGallery from './components/PhotoGallery';
import WeatherAlerts from './components/WeatherAlerts';
import './index.css';

export default function App() {
  return (
    <div className="min-h-screen p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">Tim Burton Bonsai Codex 🦇🌲</h1>
      <GirthTracker />
      <TaskDashboard />
      <PhotoGallery />
      <WeatherAlerts zone="6-7" position="west-side" />
    </div>
  );
}