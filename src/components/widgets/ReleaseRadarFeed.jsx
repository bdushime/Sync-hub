import { RELEASE_LOG, getTimeAgo } from '../../data/mockData';
import Card, { CardHeader } from '../shared/Card';
import { Rocket, ArrowUpCircle, RotateCcw } from 'lucide-react';
import './ReleaseRadarFeed.css';

const getIcon = (message) => {
  if (message.includes('Rollback')) return <RotateCcw size={14} />;
  if (message.includes('Production')) return <ArrowUpCircle size={14} />;
  return <Rocket size={14} />;
};

const getEnvClass = (env) => {
  if (env === 'production') return 'radar__env--prod';
  return 'radar__env--staging';
};

export default function ReleaseRadarFeed() {
  return (
    <Card className="radar">
      <CardHeader>
        <h3>Release Radar</h3>
        <div className="radar__live-dot">
          <span className="radar__pulse" />
          Live
        </div>
      </CardHeader>

      <div className="radar__feed">
        {RELEASE_LOG.map((entry) => (
          <div key={entry.id} className="radar__entry">
            <div className={`radar__icon ${getEnvClass(entry.env)}`}>
              {getIcon(entry.message)}
            </div>
            <div className="radar__details">
              <span className="radar__message">{entry.message}</span>
              <div className="radar__meta">
                <span className={`radar__env-tag ${getEnvClass(entry.env)}`}>
                  {entry.env}
                </span>
                <span className="radar__time">{getTimeAgo(entry.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
