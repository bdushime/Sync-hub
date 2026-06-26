import { usePRs } from '../../context/PRContext';
import { PR_STATUSES } from '../../data/mockData';
import Card, { CardHeader } from '../../components/shared/Card';
import './ManagerWidgets.css';

const STAGES = [
  { label: 'Code Review', statuses: [PR_STATUSES.PENDING_REVIEW, PR_STATUSES.IN_REVIEW] },
  { label: 'QA Testing', statuses: [PR_STATUSES.STAGING_AWAITING_QA] },
  { label: 'Deployment', statuses: [PR_STATUSES.MERGED, PR_STATUSES.STAGING_QA_APPROVED] },
];

export default function StageAnalyticsTable() {
  const { prs } = usePRs();

  const stageCounts = STAGES.map(stage => ({
    ...stage,
    count: prs.filter(pr => stage.statuses.includes(pr.status)).length,
  }));

  const totalInPipeline = Math.max(stageCounts.reduce((a, s) => a + s.count, 0), 1);

  return (
    <Card>
      <CardHeader>
        <h3>Bottleneck Analytics</h3>
      </CardHeader>
      <div className="stage-table">
        {stageCounts.map((stage) => {
          const pct = Math.round((stage.count / totalInPipeline) * 100);
          return (
            <div key={stage.label} className="stage-table__row">
              <div className="stage-table__info">
                <span className="stage-table__name">{stage.label}</span>
                <span className="stage-table__count">{stage.count} PRs</span>
              </div>
              <div className="stage-table__bar-wrap">
                <div className="stage-table__bar" style={{ width: `${pct}%` }} />
              </div>
              <span className="stage-table__pct">{pct}%</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
