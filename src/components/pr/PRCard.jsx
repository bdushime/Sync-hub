import { PR_STATUS_LABELS, getTimeAgo, getWaitHours } from '../../data/mockData';
import Badge from '../shared/Badge';
import Button from '../shared/Button';
import { Clock } from 'lucide-react';
import './PRCard.css';

export default function PRCard({ pr, actions = [] }) {
  const waitHrs = getWaitHours(pr.createdAt);
  const isUrgent = pr.status === 'pending_review' && parseFloat(waitHrs) > 4;

  return (
    <div className={`pr-card ${isUrgent ? 'pr-card--urgent' : ''}`}>
      <div className="pr-card__top">
        <div className="pr-card__title-row">
          <h4 className="pr-card__title">{pr.title}</h4>
          <Badge variant={isUrgent ? 'danger' : undefined}>{PR_STATUS_LABELS[pr.status]}</Badge>
        </div>
      </div>

      <div className="pr-card__bottom">
        <div className="pr-card__time">
          <Clock size={12} />
          <span>{getTimeAgo(pr.createdAt)}</span>
        </div>

        {actions.length > 0 && (
          <div className="pr-card__actions">
            {actions.map((action, i) => (
              <Button
                key={i}
                variant={action.variant || 'ghost'}
                size="sm"
                onClick={action.onClick}
                disabled={action.disabled}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
