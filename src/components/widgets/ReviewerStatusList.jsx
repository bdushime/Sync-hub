import { usePRs } from '../../context/PRContext';
import Avatar from '../shared/Avatar';
import Card, { CardHeader } from '../shared/Card';
import { Circle } from 'lucide-react';
import './ReviewerStatusList.css';

export default function ReviewerStatusList() {
  const { seniors } = usePRs();

  return (
    <Card className="reviewer-status">
      <CardHeader>
        <h3>Reviewer Availability</h3>
        <span className="reviewer-status__count">
          {seniors.filter(s => s.status === 'available').length}/{seniors.length} online
        </span>
      </CardHeader>

      <div className="reviewer-status__list">
        {seniors.map((senior) => (
          <div key={senior.id} className="reviewer-status__item">
            <div className="reviewer-status__person">
              <Avatar name={senior.name} initials={senior.avatar} size="md" status={senior.status} />
              <div className="reviewer-status__info">
                <span className="reviewer-status__name">{senior.name}</span>
                <span className="reviewer-status__role">Senior Developer</span>
              </div>
            </div>
            <div className={`reviewer-status__badge reviewer-status__badge--${senior.status}`}>
              <Circle size={8} fill="currentColor" />
              <span>{senior.status === 'available' ? 'Available' : 'Heads Down'}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
