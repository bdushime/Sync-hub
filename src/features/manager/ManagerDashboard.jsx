import { useRole } from '../../context/RoleContext';
import { usePRs } from '../../context/PRContext';
import { PR_STATUSES } from '../../data/mockData';
import VelocityMetricsGrid from './VelocityMetricsGrid';
import MockChartComponent from './MockChartComponent';
import StageAnalyticsTable from './StageAnalyticsTable';
import DisciplineBandwidthWidget from './DisciplineBandwidthWidget';
import ReleaseRadarFeed from '../../components/widgets/ReleaseRadarFeed';
import Card, { CardHeader } from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { TrendingUp, Download, Server, Globe } from 'lucide-react';
import '../../styles/DashboardLayout.css';

export default function ManagerDashboard() {
  const { currentUser, activeTab } = useRole();
  const { prs } = usePRs();

  const inProd = prs.filter(pr => pr.status === PR_STATUSES.PRODUCTION).length;
  const rejectedInStaging = prs.filter(pr => pr.status === PR_STATUSES.STAGING_QA_REJECTED).length;
  const stagingStatus = rejectedInStaging > 0 ? 'Issues' : 'Stable';
  const stagingIcon = rejectedInStaging > 0 ? '⚠️' : '✅';

  const envBanner = (
    <Card>
      <CardHeader><h3>Environment Status</h3></CardHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="dashboard__env-status">
          <span>{stagingIcon}</span>
          <span className="dashboard__env-label">Staging</span>
          <span className="dashboard__env-value" style={rejectedInStaging > 0 ? { color: 'var(--status-urgent)' } : undefined}>
            {stagingStatus}
          </span>
        </div>
        <div className="dashboard__env-status">
          <span>✅</span>
          <span className="dashboard__env-label">Production</span>
          <span className="dashboard__env-value">Stable</span>
        </div>
      </div>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return (
          <>
            <VelocityMetricsGrid />
            <div className="dashboard__grid dashboard__grid--scrum">
              <div className="dashboard__col dashboard__col--main">
                <MockChartComponent />
                <StageAnalyticsTable />
              </div>
              <div className="dashboard__col dashboard__col--side">
                <ReleaseRadarFeed />
              </div>
            </div>
          </>
        );
      case 'resources':
        return (
          <div className="dashboard__grid dashboard__grid--scrum">
            <div className="dashboard__col dashboard__col--main">
              <DisciplineBandwidthWidget />
              <StageAnalyticsTable />
            </div>
            <div className="dashboard__col dashboard__col--side">
              {envBanner}
            </div>
          </div>
        );
      default:
        return (
          <>
            <VelocityMetricsGrid />
            <div className="dashboard__grid dashboard__grid--scrum">
              <div className="dashboard__col dashboard__col--main">
                <MockChartComponent />
                <StageAnalyticsTable />
              </div>
              <div className="dashboard__col dashboard__col--side">
                <DisciplineBandwidthWidget />
                {envBanner}
                <ReleaseRadarFeed />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__hero dashboard__hero--scrum">
        <div className="dashboard__hero-content">
          <h1 className="dashboard__greeting">
            Digital Innovation
          </h1>
          <p className="dashboard__subtitle">
            <strong>{prs.length}</strong> PRs in pipeline, <strong>{inProd}</strong> shipped to production
          </p>
        </div>
        <div className="dashboard__hero-stats">
          <div className="dashboard__stat-card">
            <TrendingUp size={18} />
            <div>
              <span className="dashboard__stat-value">{prs.length}</span>
              <span className="dashboard__stat-label">Total PRs</span>
            </div>
          </div>
          <div className="dashboard__stat-card">
            <Globe size={18} />
            <div>
              <span className="dashboard__stat-value">{inProd}</span>
              <span className="dashboard__stat-label">In Production</span>
            </div>
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}
