import { usePRs } from '../../context/PRContext';
import { PR_STATUSES } from '../../data/mockData';
import Card, { CardHeader } from '../../components/shared/Card';
import './ManagerWidgets.css';

const DISCIPLINES = [
  { name: 'Frontend', keywords: ['ui', 'css', 'grid', 'layout', 'pagination', 'dashboard'] },
  { name: 'Backend', keywords: ['api', 'database', 'auth', 'middleware', 'connection', 'rate'] },
  { name: 'DevOps', keywords: ['deploy', 'staging', 'pipeline', 'compression'] },
  { name: 'QA / Testing', keywords: ['test', 'unit', 'qa', 'verification', 'checkout'] },
];

function getLoad(count) {
  if (count >= 3) return { label: 'Heavy Load', className: 'bandwidth--heavy' };
  if (count >= 1) return { label: 'Moderate', className: 'bandwidth--moderate' };
  return { label: 'Light', className: 'bandwidth--light' };
}

export default function DisciplineBandwidthWidget() {
  const { prs } = usePRs();

  const activePRs = prs.filter(pr =>
    pr.status === PR_STATUSES.PENDING_REVIEW || pr.status === PR_STATUSES.IN_REVIEW
  );

  const disciplines = DISCIPLINES.map(d => {
    const count = activePRs.filter(pr =>
      d.keywords.some(kw => pr.title.toLowerCase().includes(kw))
    ).length;
    return { ...d, count, ...getLoad(count) };
  });

  return (
    <Card>
      <CardHeader>
        <h3>Discipline Bandwidth</h3>
      </CardHeader>
      <div className="bandwidth-list">
        {disciplines.map(d => (
          <div key={d.name} className="bandwidth-item">
            <div className="bandwidth-item__info">
              <span className="bandwidth-item__name">{d.name} Queue</span>
              <span className="bandwidth-item__count">{d.count} in review</span>
            </div>
            <span className={`bandwidth-item__label ${d.className}`}>{d.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
