import { useRole } from '../../context/RoleContext';
import { MOCK_PRS } from '../../data/mockData';
import PRSubmissionForm from './PRSubmissionForm';
import PRQueueList from '../../components/pr/PRQueueList';
import ReviewerStatusList from '../../components/widgets/ReviewerStatusList';
import ReleaseRadarFeed from '../../components/widgets/ReleaseRadarFeed';
import ScrumCalendar from '../scrum/ScrumCalendar';
import { GitPullRequest, Clock } from 'lucide-react';
import '../../styles/DashboardLayout.css';

export default function JuniorDashboard() {
  const { currentUser, activeTab } = useRole();
  const myPRs = MOCK_PRS.filter(pr => pr.author.id === currentUser?.id);
  const pendingPRs = myPRs.filter(pr =>
    pr.status === 'pending_review' || pr.status === 'in_review'
  );

  const greeting = getGreeting();

  const renderContent = () => {
    switch (activeTab) {
      case 'prs':
        return (
          <div className="dashboard__grid dashboard__grid--junior">
            <div className="dashboard__col dashboard__col--main">
              <PRSubmissionForm />
              <PRQueueList
                title="My Pending PRs"
                prs={pendingPRs}
                emptyMessage="All your PRs have been reviewed!"
                actions={(pr) => {
                  const isAvailable = pr.reviewer?.status === 'available';
                  return [{
                    label: 'Ping Reviewer',
                    variant: 'secondary',
                    disabled: !isAvailable,
                    onClick: () => {},
                  }];
                }}
              />
            </div>
            <div className="dashboard__col dashboard__col--side">
              <ReleaseRadarFeed />
            </div>
          </div>
        );
      case 'reviewers':
        return (
          <div className="dashboard__grid dashboard__grid--junior">
            <div className="dashboard__col dashboard__col--main">
              <ReviewerStatusList />
            </div>
            <div className="dashboard__col dashboard__col--side">
              <ScrumCalendar readOnly />
            </div>
          </div>
        );
      default:
        return (
          <div className="dashboard__grid dashboard__grid--junior">
            <div className="dashboard__col dashboard__col--main">
              <PRSubmissionForm />
              <PRQueueList
                title="My Pending PRs"
                prs={pendingPRs}
                emptyMessage="All your PRs have been reviewed!"
                actions={(pr) => {
                  const isAvailable = pr.reviewer?.status === 'available';
                  return [{
                    label: 'Ping Reviewer',
                    variant: 'secondary',
                    disabled: !isAvailable,
                    onClick: () => {},
                  }];
                }}
              />
            </div>
            <div className="dashboard__col dashboard__col--side">
              <ReviewerStatusList />
              <ReleaseRadarFeed />
              <ScrumCalendar readOnly />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__hero dashboard__hero--junior">
        <div className="dashboard__hero-content">
          <h1 className="dashboard__greeting">
            {greeting}, <span className="dashboard__name">{currentUser?.name?.split(' ')[0]}</span>
          </h1>
          <p className="dashboard__subtitle">
            You have <strong>{pendingPRs.length} PRs</strong> awaiting review
          </p>
        </div>
        <div className="dashboard__hero-stats">
          <div className="dashboard__stat-card">
            <GitPullRequest size={18} />
            <div>
              <span className="dashboard__stat-value">{myPRs.length}</span>
              <span className="dashboard__stat-label">Total PRs</span>
            </div>
          </div>
          <div className="dashboard__stat-card">
            <Clock size={18} />
            <div>
              <span className="dashboard__stat-value">{pendingPRs.length}</span>
              <span className="dashboard__stat-label">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
