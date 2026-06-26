import { usePRs } from '../../context/PRContext';
import { PR_STATUSES, getWaitHours } from '../../data/mockData';
import '../../styles/DashboardLayout.css';

export default function VelocityMetricsGrid() {
  const { prs, releaseLog } = usePRs();

  const mergedPRs = prs.filter(pr =>
    pr.status === PR_STATUSES.MERGED ||
    pr.status === PR_STATUSES.STAGING_AWAITING_QA ||
    pr.status === PR_STATUSES.STAGING_QA_APPROVED ||
    pr.status === PR_STATUSES.PRODUCTION
  );

  const pendingPRs = prs.filter(pr =>
    pr.status === PR_STATUSES.PENDING_REVIEW || pr.status === PR_STATUSES.IN_REVIEW
  );

  const avgMergeHours = mergedPRs.length > 0
    ? (mergedPRs.reduce((acc, pr) => acc + parseFloat(getWaitHours(pr.createdAt)), 0) / mergedPRs.length / 24).toFixed(1)
    : '0.0';

  const prodDeploys = releaseLog.filter(r => r.env === 'production').length;
  const hittingTarget = parseFloat(avgMergeHours) <= 2;

  return (
    <div className="dashboard__velocity-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
      <div className="dashboard__velocity-card">
        <span className="dashboard__velocity-label">Avg. Merge Time</span>
        <span className={`dashboard__velocity-value ${hittingTarget ? 'dashboard__velocity-value--green' : 'dashboard__velocity-value--red'}`}>
          {avgMergeHours}d
        </span>
        <span className={`dashboard__velocity-change ${hittingTarget ? 'dashboard__velocity-change--up' : 'dashboard__velocity-change--down'}`}>
          Target: &lt; 2 days
        </span>
      </div>
      <div className="dashboard__velocity-card">
        <span className="dashboard__velocity-label">Sprint Velocity</span>
        <span className="dashboard__velocity-value dashboard__velocity-value--green">{mergedPRs.length}</span>
        <span className="dashboard__velocity-change dashboard__velocity-change--up">PRs merged this sprint</span>
      </div>
      <div className="dashboard__velocity-card">
        <span className="dashboard__velocity-label">Prod Deploys</span>
        <span className="dashboard__velocity-value dashboard__velocity-value--blue">{prodDeploys}</span>
        <span className="dashboard__velocity-change">This period</span>
      </div>
    </div>
  );
}
