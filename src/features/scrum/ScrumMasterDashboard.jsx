import { useRole } from '../../context/RoleContext';
import { MOCK_PRS, PR_STATUS_LABELS, getWaitHours } from '../../data/mockData';
import PRQueueList from '../../components/pr/PRQueueList';
import ScrumCalendar from './ScrumCalendar';
import Card, { CardHeader } from '../../components/shared/Card';
import { AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';
import '../../styles/DashboardLayout.css';

export default function ScrumMasterDashboard() {
  const { activeTab } = useRole();

  const allPRs = MOCK_PRS;
  const bottleneckPRs = allPRs.filter(
    pr => (pr.status === 'pending_review' || pr.status === 'in_review') && parseFloat(getWaitHours(pr.createdAt)) > 4
  );
  const mergedCount = allPRs.filter(pr => pr.status === 'merged' || pr.status === 'staging' || pr.status === 'production').length;
  const avgWait = (
    allPRs
      .filter(pr => pr.status === 'pending_review' || pr.status === 'in_review')
      .reduce((acc, pr) => acc + parseFloat(getWaitHours(pr.createdAt)), 0) /
    Math.max(allPRs.filter(pr => pr.status === 'pending_review' || pr.status === 'in_review').length, 1)
  ).toFixed(1);

  const pipelineChart = (
    <Card>
      <CardHeader>
        <h3><BarChart3 size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-2px' }} />Pipeline Board</h3>
      </CardHeader>
      <div className="pipeline-overview">
        {['pending_review', 'in_review', 'approved', 'merged', 'staging', 'production'].map((status) => {
          const count = allPRs.filter(pr => pr.status === status).length;
          return (
            <div key={status} className="pipeline-stage">
              <div className="pipeline-stage__bar" style={{ background: 'var(--brd-green)', opacity: 0.7 + (count * 0.1), height: `${Math.max(count * 30, 8)}px` }} />
              <span className="pipeline-stage__count">{count}</span>
              <span className="pipeline-stage__label">{PR_STATUS_LABELS[status]}</span>
            </div>
          );
        })}
      </div>
    </Card>
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
                prs={allPRs.filter(pr => pr.status === 'pending_review' || pr.status === 'in_review')}
                emptyMessage="No active PRs in the pipeline"
              />
            </div>
            <div className="dashboard__col dashboard__col--side">
              <ScrumCalendar />
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="dashboard__grid dashboard__grid--scrum">
            <div className="dashboard__col dashboard__col--main">
              <div className="dashboard__velocity-grid">
                <div className="dashboard__velocity-card">
                  <span className="dashboard__velocity-label">PRs This Sprint</span>
                  <span className="dashboard__velocity-value dashboard__velocity-value--green">{allPRs.length}</span>
                  <span className="dashboard__velocity-change dashboard__velocity-change--up">+2 from last sprint</span>
                </div>
                <div className="dashboard__velocity-card">
                  <span className="dashboard__velocity-label">Merged</span>
                  <span className="dashboard__velocity-value dashboard__velocity-value--blue">{mergedCount}</span>
                  <span className="dashboard__velocity-change dashboard__velocity-change--up">On track</span>
                </div>
                <div className="dashboard__velocity-card">
                  <span className="dashboard__velocity-label">Avg. Wait Time</span>
                  <span className="dashboard__velocity-value dashboard__velocity-value--amber">{avgWait}h</span>
                  <span className="dashboard__velocity-change">Target: &lt; 3h</span>
                </div>
                <div className="dashboard__velocity-card">
                  <span className="dashboard__velocity-label">Bottlenecks</span>
                  <span className="dashboard__velocity-value dashboard__velocity-value--red">{bottleneckPRs.length}</span>
                  <span className="dashboard__velocity-change dashboard__velocity-change--down">Needs attention</span>
                </div>
              </div>
              {pipelineChart}
            </div>
            <div className="dashboard__col dashboard__col--side">
              <ScrumCalendar />
            </div>
          </div>
        );
      default:
        return (
          <>
            <div className="dashboard__velocity-grid">
              <div className="dashboard__velocity-card">
                <span className="dashboard__velocity-label">PRs This Sprint</span>
                <span className="dashboard__velocity-value dashboard__velocity-value--green">{allPRs.length}</span>
                <span className="dashboard__velocity-change dashboard__velocity-change--up">+2 from last sprint</span>
              </div>
              <div className="dashboard__velocity-card">
                <span className="dashboard__velocity-label">Merged</span>
                <span className="dashboard__velocity-value dashboard__velocity-value--blue">{mergedCount}</span>
                <span className="dashboard__velocity-change dashboard__velocity-change--up">On track</span>
              </div>
              <div className="dashboard__velocity-card">
                <span className="dashboard__velocity-label">Avg. Wait Time</span>
                <span className="dashboard__velocity-value dashboard__velocity-value--amber">{avgWait}h</span>
                <span className="dashboard__velocity-change">Target: &lt; 3h</span>
              </div>
              <div className="dashboard__velocity-card">
                <span className="dashboard__velocity-label">Bottlenecks</span>
                <span className="dashboard__velocity-value dashboard__velocity-value--red">{bottleneckPRs.length}</span>
                <span className="dashboard__velocity-change dashboard__velocity-change--down">Needs attention</span>
              </div>
            </div>

            <div className="dashboard__grid dashboard__grid--scrum">
              <div className="dashboard__col dashboard__col--main">
                {pipelineChart}
                <PRQueueList
                  title="All Team PRs"
                  prs={allPRs.filter(pr => pr.status === 'pending_review' || pr.status === 'in_review')}
                  emptyMessage="No active PRs in the pipeline"
                />
              </div>
              <div className="dashboard__col dashboard__col--side">
                <ScrumCalendar />
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
            Monitor velocity, identify bottlenecks, and keep the team flowing
          </p>
        </div>
        <div className="dashboard__hero-stats">
          <div className="dashboard__stat-card">
            <TrendingUp size={18} />
            <div>
              <span className="dashboard__stat-value">{allPRs.length}</span>
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
