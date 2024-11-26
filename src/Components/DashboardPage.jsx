// src/components/DashboardPage.jsx
import React from 'react';
import NewsTable from './NewsTable';
import ExhibitionsTable from './ExhibitionsTable';
import './DashboardPage.css';

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard Museo Papalote</h1>
        <div className="dashboard-grid">
          <div className="dashboard-section">
            <NewsTable />
          </div>
          <div className="dashboard-section">
            <ExhibitionsTable />
          </div>
        </div>
      </div>
    </div>
  );
}
