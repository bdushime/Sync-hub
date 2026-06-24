import { useRole } from '../../context/RoleContext';
import { MOCK_PRS } from '../../data/mockData';
import AvailabilityToggle from './AvailabilityToggle';
import PRQueueList from '../../components/pr/PRQueueList';
import ReleaseRadarFeed from '../../components/widgets/ReleaseRadarFeed';
import ScrumCalendar from '../scrum/ScrumCalendar';
import Card, { CardHeader } from '../../components/shared/Card';
import { Eye, TrendingUp, CheckCircle } from 'lucide-react';
import '../../styles/DashboardLayout.css';

export default function SeniorDashboard() {
  const { activeTab } = useRole();

  const reviewQueue = MOCK_PRS
    .filter(pr => pr.status === 'pending_review' || pr.status === 'in_review')
    .sort((a, b) => a.createdAt - b.createdAt);

  const approvedCount = MOCK_PRS.filter(pr => pr.status === 'approved' || pr.status === 'merged').length;

  const renderContent = () => {
    switch (activeTab) {
      case 'queue':
        return (
          <div className="dashboard__grid dashboard__grid--senior">
            <div className="dashboard__col dashboard__col--main">
              <PRQueueList
                title="Review Queue"
                icon={Eye}
                prs={reviewQueue}
                emptyMessage="Queue is clear — take a break!"
                actions={(pr) => [{
                  label: 'Approve & Merge',
                  variant: 'primary',
                  onClick: () => {},
                }]}
              />
            </div>
            <div className="dashboard__col dashboard__col--side">
              <AvailabilityToggle />
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="dashboard__grid dashboard__grid--senior">
            <div className="dashboard__col dashboard__col--main">
              <Card>
                <CardHeader>
                  <h3><TrendingUp size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-2px' }} />Review Analytics</h3>
                </CardHeader>
                <div className="dashboard__velocity-grid" style={{ marginBottom: 0 }}>
                  <div className="dashboard__velocity-card">
                    <span className="dashboard__velocity-label">Reviews Done</span>
                    <span className="dashboard__velocity-value dashboard__velocity-value--green">{approvedCount}</span>
                  </div>
                  <div className="dashboard__velocity-card">
                    <span className="dashboard__velocity-label">In Queue</span>
                    <span className="dashboard__velocity-value">{reviewQueue.length}</span>
                  </div>
                </div>
              </Card>
            </div>
            <div className="dashboard__col dashboard__col--side">
              <ScrumCalendar readOnly />
            </div>
          </div>
        );
      default:
        return (
          <div className="dashboard__grid dashboard__grid--senior">
            <div className="dashboard__col dashboard__col--main">
              <AvailabilityToggle />
              <PRQueueList
                title="Review Queue"
                icon={Eye}
                prs={reviewQueue}
                emptyMessage="Queue is clear — take a break!"
                actions={(pr) => [{
                  label: 'Approve & Merge',
                  variant: 'primary',
                  onClick: () => {},
                }]}
              />
            </div>
            <div className="dashboard__col dashboard__col--side">
              <ReleaseRadarFeed />
              <ScrumCalendar readOnly />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__hero dashboard__hero--senior">
        <div className="dashboard__hero-content">
          <h1 className="dashboard__greeting">Review Hub</h1>
          <p className="dashboard__subtitle">
            <strong>{reviewQueue.length} PRs</strong> awaiting your review
          </p>
        </div>
        <div className="dashboard__hero-stats">
          <div className="dashboard__stat-card">
            <Eye size={18} />
            <div>
              <span className="dashboard__stat-value">{reviewQueue.length}</span>
              <span className="dashboard__stat-label">In Queue</span>
            </div>
          </div>
          <div className="dashboard__stat-card">
            <CheckCircle size={18} />
            <div>
              <span className="dashboard__stat-value">{approvedCount}</span>
              <span className="dashboard__stat-label">Approved</span>
            </div>
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}
