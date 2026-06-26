import { useRole } from '../../context/RoleContext';
import { usePRs } from '../../context/PRContext';
import { PR_STATUSES, PR_STATUS_LABELS, getWaitHours } from '../../data/mockData';
import PRQueueList from '../../components/pr/PRQueueList';
import ScrumCalendar from './ScrumCalendar';
import ReleaseRadarFeed from '../../components/widgets/ReleaseRadarFeed';
import Card, { CardHeader } from '../../components/shared/Card';
import { AlertTriangle, TrendingUp, BarChart3, ShieldCheck, Globe } from 'lucide-react';
import '../../styles/DashboardLayout.css';

export default function ScrumMasterDashboard() {
  const { activeTab } = useRole();
  const { prs } = usePRs();

  const pendingReview = prs.filter(pr => pr.status === PR_STATUSES.PENDING_REVIEW || pr.status === PR_STATUSES.IN_REVIEW);
  const merged = prs.filter(pr => pr.status === PR_STATUSES.MERGED);
  const inStaging = prs.filter(pr =>
    pr.status === PR_STATUSES.STAGING_AWAITING_QA ||
    pr.status === PR_STATUSES.STAGING_QA_APPROVED ||
    pr.status === PR_STATUSES.STAGING_QA_REJECTED
  );
  const inProd = prs.filter(pr => pr.status === PR_STATUSES.PRODUCTION);
  const bottleneckPRs = pendingReview.filter(pr => parseFloat(getWaitHours(pr.createdAt)) > 4);

  const avgWait = pendingReview.length > 0
    ? (pendingReview.reduce((acc, pr) => acc + parseFloat(getWaitHours(pr.createdAt)), 0) / pendingReview.length).toFixed(1)
    : '0.0';

  const PIPELINE_STAGES = [
    PR_STATUSES.PENDING_REVIEW,
    PR_STATUSES.IN_REVIEW,
    PR_STATUSES.APPROVED,
    PR_STATUSES.MERGED,
    PR_STATUSES.STAGING_AWAITING_QA,
    PR_STATUSES.STAGING_QA_APPROVED,
    PR_STATUSES.STAGING_QA_REJECTED,
    PR_STATUSES.PRODUCTION,
  ];

  const pipelineChart = (
    <Card>
      <CardHeader>
        <h3><BarChart3 size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-2px' }} />Pipeline Board</h3>
      </CardHeader>
      <div className="pipeline-overview">
        {PIPELINE_STAGES.map((status) => {
          const count = prs.filter(pr => pr.status === status).length;
          return (
            <div key={status} className="pipeline-stage">
              <div className="pipeline-stage__bar" style={{ background: 'var(--brd-green)', opacity: 0.5 + (count * 0.15), height: `${Math.max(count * 30, 8)}px` }} />
              <span className="pipeline-stage__count">{count}</span>
              <span className="pipeline-stage__label">{PR_STATUS_LABELS[status]}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );

  const velocityCards = (
    <div className="dashboard__velocity-grid">
      <div className="dashboard__velocity-card">
        <span className="dashboard__velocity-label">Total PRs</span>
        <span className="dashboard__velocity-value dashboard__velocity-value--green">{prs.length}</span>
        <span className="dashboard__velocity-change dashboard__velocity-change--up">This sprint</span>
      </div>
      <div className="dashboard__velocity-card">
        <span className="dashboard__velocity-label">In Review</span>
        <span className="dashboard__velocity-value dashboard__velocity-value--blue">{pendingReview.length}</span>
        <span className="dashboard__velocity-change">{bottleneckPRs.length > 0 ? `${bottleneckPRs.length} bottleneck${bottleneckPRs.length > 1 ? 's' : ''}` : 'On track'}</span>
      </div>
      <div className="dashboard__velocity-card">
        <span className="dashboard__velocity-label">Avg. Wait Time</span>
        <span className="dashboard__velocity-value dashboard__velocity-value--amber">{avgWait}h</span>
        <span className="dashboard__velocity-change">{parseFloat(avgWait) > 3 ? 'Above target (3h)' : 'Within target'}</span>
      </div>
      <div className="dashboard__velocity-card">
        <span className="dashboard__velocity-label">In Staging</span>
        <span className="dashboard__velocity-value dashboard__velocity-value--blue">{inStaging.length}</span>
        <span className="dashboard__velocity-change">{prs.filter(pr => pr.status === PR_STATUSES.STAGING_QA_REJECTED).length > 0 ? 'Has rejections' : 'Clean'}</span>
      </div>
      <div className="dashboard__velocity-card">
        <span className="dashboard__velocity-label">Merged</span>
        <span className="dashboard__velocity-value dashboard__velocity-value--blue">{merged.length}</span>
        <span className="dashboard__velocity-change">Awaiting deploy</span>
      </div>
      <div className="dashboard__velocity-card">
        <span className="dashboard__velocity-label">In Production</span>
        <span className="dashboard__velocity-value dashboard__velocity-value--green">{inProd.length}</span>
        <span className="dashboard__velocity-change dashboard__velocity-change--up">Shipped</span>
      </div>
      <div className="dashboard__velocity-card">
        <span className="dashboard__velocity-label">QA Approved</span>
        <span className="dashboard__velocity-value dashboard__velocity-value--green">{prs.filter(pr => pr.status === PR_STATUSES.STAGING_QA_APPROVED).length}</span>
        <span className="dashboard__velocity-change dashboard__velocity-change--up">Ready for prod</span>
      </div>
      <div className="dashboard__velocity-card">
        <span className="dashboard__velocity-label">QA Rejected</span>
        <span className="dashboard__velocity-value dashboard__velocity-value--red">{prs.filter(pr => pr.status === PR_STATUSES.STAGING_QA_REJECTED).length}</span>
        <span className="dashboard__velocity-change dashboard__velocity-change--down">{prs.filter(pr => pr.status === PR_STATUSES.STAGING_QA_REJECTED).length > 0 ? 'Needs attention' : 'All clear'}</span>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'pipeline':
        return (
          <div className="dashboard__grid dashboard__grid--scrum">
            <div className="dashboard__col dashboard__col--main">
              {pipelineChart}
              <PRQueueList
                title="All Team PRs"
                prs={pendingReview}
                emptyMessage="No active PRs in the pipeline"
              />
            </div>
            <div className="dashboard__col dashboard__col--side">
              <ScrumCalendar />
              <ReleaseRadarFeed />
            </div>
          </div>
        );
      case 'reports':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {velocityCards}
            {pipelineChart}
            <ReleaseRadarFeed />
          </div>
        );
      default:
        return (
          <>
            {velocityCards}
            <div className="dashboard__grid dashboard__grid--scrum">
              <div className="dashboard__col dashboard__col--main">
                {pipelineChart}
                <PRQueueList
                  title="All Team PRs"
                  prs={pendingReview}
                  emptyMessage="No active PRs in the pipeline"
                />
              </div>
              <div className="dashboard__col dashboard__col--side">
                <ScrumCalendar />
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
          <h1 className="dashboard__greeting">Team Overview</h1>
          <p className="dashboard__subtitle">
            <strong>{prs.length}</strong> total PRs, <strong>{inStaging.length}</strong> in staging, <strong>{inProd.length}</strong> shipped
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
            <AlertTriangle size={18} />
            <div>
              <span className="dashboard__stat-value">{bottleneckPRs.length}</span>
              <span className="dashboard__stat-label">Bottlenecks</span>
            </div>
          </div>
        </div>
      </div>

      {bottleneckPRs.length > 0 && (
        <div className="dashboard__alert">
          <div className="dashboard__alert-icon">
            <AlertTriangle size={18} />
          </div>
          <div>
            <div className="dashboard__alert-text">
              {bottleneckPRs.length} PR{bottleneckPRs.length > 1 ? 's' : ''} waiting &gt; 4 hours
            </div>
            <div className="dashboard__alert-detail">
              Longest wait: {Math.max(...bottleneckPRs.map(pr => parseFloat(getWaitHours(pr.createdAt))))}h — consider assigning additional reviewers
            </div>
          </div>
        </div>
      )}

      {renderContent()}
    </div>
  );
}
