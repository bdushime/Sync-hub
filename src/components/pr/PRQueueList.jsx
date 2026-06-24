import PRCard from './PRCard';
import Card, { CardHeader } from '../shared/Card';

import { GitPullRequest, Filter } from 'lucide-react';
import './PRQueueList.css';

export default function PRQueueList({ title, prs, emptyMessage, actions, icon }) {
  const Icon = icon || GitPullRequest;

  return (
    <Card className="pr-queue">
      <CardHeader>
        <h3>
          <Icon size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-2px' }} />
          {title}
          {prs.length > 0 && (
            <span className="pr-queue__count">{prs.length}</span>
          )}
        </h3>
      </CardHeader>

      {prs.length === 0 ? (
        <div className="pr-queue__empty">
          <div className="pr-queue__empty-icon">
            <GitPullRequest size={28} />
          </div>
          <p>{emptyMessage || 'No PRs to show'}</p>
        </div>
      ) : (
        <div className="pr-queue__list">
          {prs.map((pr) => (
            <PRCard
              key={pr.id}
              pr={pr}
              actions={actions?.(pr) || []}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
