import { usePRs } from '../../context/PRContext';
import { PR_STATUSES } from '../../data/mockData';
import Card, { CardHeader } from '../../components/shared/Card';
import './ManagerWidgets.css';

const WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

export default function MockChartComponent() {
  const { prs } = usePRs();

  const total = prs.length;
  const merged = prs.filter(pr =>
    pr.status === PR_STATUSES.MERGED ||
    pr.status === PR_STATUSES.STAGING_AWAITING_QA ||
    pr.status === PR_STATUSES.STAGING_QA_APPROVED ||
    pr.status === PR_STATUSES.PRODUCTION
  ).length;

  const weeklyOpened = [
    Math.round(total * 0.2),
    Math.round(total * 0.3),
    Math.round(total * 0.25),
    total - Math.round(total * 0.2) - Math.round(total * 0.3) - Math.round(total * 0.25),
  ];
  const weeklyMerged = [
    Math.round(merged * 0.15),
    Math.round(merged * 0.25),
    Math.round(merged * 0.3),
    merged - Math.round(merged * 0.15) - Math.round(merged * 0.25) - Math.round(merged * 0.3),
  ];

  const maxVal = Math.max(...weeklyOpened, ...weeklyMerged, 1);

  return (
    <Card>
      <CardHeader>
        <h3>Department Velocity</h3>
        <div className="chart-legend">
          <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--opened" /> Opened</span>
          <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--merged" /> Merged</span>
        </div>
      </CardHeader>
      <div className="mock-chart">
        {WEEKS.map((week, i) => (
          <div key={week} className="mock-chart__group">
            <div className="mock-chart__bars">
              <div
                className="mock-chart__bar mock-chart__bar--opened"
                style={{ height: `${(weeklyOpened[i] / maxVal) * 120}px` }}
              >
                <span className="mock-chart__val">{weeklyOpened[i]}</span>
              </div>
              <div
                className="mock-chart__bar mock-chart__bar--merged"
                style={{ height: `${(weeklyMerged[i] / maxVal) * 120}px` }}
              >
                <span className="mock-chart__val">{weeklyMerged[i]}</span>
              </div>
            </div>
            <span className="mock-chart__label">{week}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
