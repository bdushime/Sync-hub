import { useRole } from '../../context/RoleContext';
import { usePRs } from '../../context/PRContext';
import { PR_STATUSES } from '../../data/mockData';
import AvailabilityToggle from './AvailabilityToggle';
import PRSubmissionForm from '../junior/PRSubmissionForm';
import PRQueueList from '../../components/pr/PRQueueList';
import ReleaseRadarFeed from '../../components/widgets/ReleaseRadarFeed';
import ScrumCalendar from '../scrum/ScrumCalendar';
import { Eye, TrendingUp, CheckCircle, Code2 } from 'lucide-react';
import '../../styles/DashboardLayout.css';

export default function SeniorDashboard() {
  const { currentUser, activeTab } = useRole();
  const { prs, updatePRStatus, addNotification } = usePRs();

  const myPRs = prs.filter(pr => pr.author.id === currentUser?.id);
  const myPendingPRs = myPRs.filter(pr =>
    pr.status === PR_STATUSES.PENDING_REVIEW || pr.status === PR_STATUSES.IN_REVIEW
  );

  const reviewQueue = prs
    .filter(pr =>
      (pr.status === PR_STATUSES.PENDING_REVIEW || pr.status === PR_STATUSES.IN_REVIEW) &&
      pr.author.id !== currentUser?.id
    )
    .sort((a, b) => a.createdAt - b.createdAt);

  const approvedCount = prs.filter(pr =>
    pr.status === PR_STATUSES.APPROVED || pr.status === PR_STATUSES.MERGED
  ).length;

  const handleApprove = (pr) => {
    updatePRStatus(pr.id, PR_STATUSES.MERGED);
    addNotification(`"${pr.title}" approved & merged — ready for DevOps`, 'success');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'mycode':
        return (
          <div className="dashboard__grid dashboard__grid--senior">
            <div className="dashboard__col dashboard__col--main">
              <PRSubmissionForm />
              <PRQueueList
                title="My Pending PRs"
                icon={Code2}
                prs={myPendingPRs}
                emptyMessage="All your PRs have been reviewed!"
              />
            </div>
            <div className="dashboard__col dashboard__col--side">
              <ReleaseRadarFeed />
            </div>
          </div>
        );
      case 'reviews':
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
                  onClick: () => handleApprove(pr),
                }]}
              />
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
                  onClick: () => handleApprove(pr),
                }]}
              />
              <PRQueueList
                title="My Pending PRs"
                icon={Code2}
                prs={myPendingPRs}
                emptyMessage="All your PRs have been reviewed!"
              />
            </div>
            <div className="dashboard__col dashboard__col--side">
              <PRSubmissionForm />
              <ReleaseRadarFeed />
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
            <strong>{reviewQueue.length} PRs</strong> to review, <strong>{myPendingPRs.length}</strong> of yours pending
          </p>
        </div>
        <div className="dashboard__hero-stats">
          <div className="dashboard__stat-card">
            <Eye size={18} />
            <div>
              <span className="dashboard__stat-value">{reviewQueue.length}</span>
              <span className="dashboard__stat-label">To Review</span>
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
