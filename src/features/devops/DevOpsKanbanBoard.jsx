import { useState } from 'react';
import { MOCK_PRS, PR_STATUSES, getTimeAgo } from '../../data/mockData';
import Avatar from '../../components/shared/Avatar';
import Button from '../../components/shared/Button';
import { ArrowRight, Server, Globe, GitMerge } from 'lucide-react';
import './DevOpsKanbanBoard.css';

const COLUMNS = [
  {
    id: PR_STATUSES.MERGED,
    title: 'Merged',
    subtitle: 'Awaiting Deployment',
    icon: GitMerge,
    color: '#475569',
    bg: '#f5e6b8',
    action: 'Deploy to Staging',
  },
  {
    id: PR_STATUSES.STAGING,
    title: 'Staging',
    subtitle: 'In QA',
    icon: Server,
    color: '#044122',
    bg: '#f0e0a8',
    action: 'Promote to Prod',
  },
  {
    id: PR_STATUSES.PRODUCTION,
    title: 'Production',
    subtitle: 'Live',
    icon: Globe,
    color: '#044122',
    bg: '#edd99a',
    action: null,
  },
];

export default function DevOpsKanbanBoard() {
  const [prs, setPrs] = useState(MOCK_PRS);

  const movePR = (prId, toStatus) => {
    setPrs(prev => prev.map(pr =>
      pr.id === prId ? { ...pr, status: toStatus } : pr
    ));
  };

  return (
    <div className="kanban">
      <div className="kanban__columns">
        {COLUMNS.map((col) => {
          const Icon = col.icon;
          const colPrs = prs.filter(pr => pr.status === col.id);
          const nextCol = COLUMNS[COLUMNS.indexOf(col) + 1];

          return (
            <div key={col.id} className="kanban__column">
              <div className="kanban__column-header" style={{ background: col.bg }}>
                <div className="kanban__column-title">
                  <div className="kanban__column-icon" style={{ background: col.color }}>
                    <Icon size={14} color="white" />
                  </div>
                  <div>
                    <h4>{col.title}</h4>
                    <span className="kanban__column-sub">{col.subtitle}</span>
                  </div>
                </div>
                <span className="kanban__column-count" style={{ color: col.color, background: `${col.color}15` }}>
                  {colPrs.length}
                </span>
              </div>

              <div className="kanban__cards">
                {colPrs.length === 0 ? (
                  <div className="kanban__empty">
                    <Icon size={20} style={{ color: col.color, opacity: 0.3 }} />
                    <span>No items</span>
                  </div>
                ) : (
                  colPrs.map((pr) => (
                    <div key={pr.id} className="kanban__card">
                      <div className="kanban__card-top">
                        <span className="kanban__card-title">{pr.title}</span>
                      </div>
                      <div className="kanban__card-bottom">
                        <div className="kanban__card-author">
                          <Avatar name={pr.author.name} initials={pr.author.avatar} size="sm" />
                          <span>{pr.author.name}</span>
                          <span className="kanban__card-time">{getTimeAgo(pr.createdAt)}</span>
                        </div>
                        {nextCol && col.action && (
                          <Button
                            variant="primary"
                            size="sm"
                            icon={<ArrowRight size={13} />}
                            onClick={() => movePR(pr.id, nextCol.id)}
                          >
                            {col.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
