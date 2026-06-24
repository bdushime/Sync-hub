import { useRole } from '../../context/RoleContext';
import { ENV_STATUS } from '../../data/mockData';
import DevOpsKanbanBoard from './DevOpsKanbanBoard';
import ReleaseRadarFeed from '../../components/widgets/ReleaseRadarFeed';
import { Server, Globe } from 'lucide-react';
import '../../styles/DashboardLayout.css';

export default function DevopsDashboard() {
  const { activeTab } = useRole();

  const renderContent = () => {
    switch (activeTab) {
      case 'pipeline':
        return (
          <div className="dashboard__grid dashboard__grid--devops">
            <DevOpsKanbanBoard />
          </div>
        );
      case 'environments':
        return (
          <>
            <div className="dashboard__env-bar">
              {Object.values(ENV_STATUS).map((env) => (
                <div key={env.label} className="dashboard__env-status">
                  <span>{env.icon}</span>
                  <span className="dashboard__env-label">{env.label}</span>
                  <span className="dashboard__env-value">Stable</span>
                </div>
              ))}
            </div>
            <ReleaseRadarFeed />
          </>
        );
      default:
        return (
          <>
            <div className="dashboard__env-bar">
              {Object.values(ENV_STATUS).map((env) => (
                <div key={env.label} className="dashboard__env-status">
                  <span>{env.icon}</span>
                  <span className="dashboard__env-label">{env.label}</span>
                  <span className="dashboard__env-value">Stable</span>
                </div>
              ))}
            </div>
            <div className="dashboard__grid dashboard__grid--devops">
              <DevOpsKanbanBoard />
              <ReleaseRadarFeed />
            </div>
          </>
        );
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__hero dashboard__hero--devops">
        <div className="dashboard__hero-content">
          <h1 className="dashboard__greeting">Deployment Pipeline</h1>
          <p className="dashboard__subtitle">
            Manage releases across <strong>Staging</strong> and <strong>Production</strong>
          </p>
        </div>
        <div className="dashboard__hero-stats">
          <div className="dashboard__stat-card">
            <Server size={18} />
            <div>
              <span className="dashboard__stat-value">✅</span>
              <span className="dashboard__stat-label">Staging</span>
            </div>
          </div>
          <div className="dashboard__stat-card">
            <Globe size={18} />
            <div>
              <span className="dashboard__stat-value">✅</span>
              <span className="dashboard__stat-label">Production</span>
            </div>
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}
