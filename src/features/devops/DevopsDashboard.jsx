import { useRole } from '../../context/RoleContext';
import { usePRs } from '../../context/PRContext';
import { PR_STATUSES, ENV_STATUS, getTimeAgo } from '../../data/mockData';
import Card, { CardHeader } from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import ReleaseRadarFeed from '../../components/widgets/ReleaseRadarFeed';
import { Server, Globe, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';
import '../../styles/DashboardLayout.css';
import './DevopsDashboard.css';

export default function DevopsDashboard() {
  const { activeTab } = useRole();
  const { prs, updatePRStatus, addNotification } = usePRs();

  const awaitingQA = prs.filter(pr => pr.status === PR_STATUSES.STAGING_AWAITING_QA);
  const qaApproved = prs.filter(pr => pr.status === PR_STATUSES.STAGING_QA_APPROVED);
  const qaRejected = prs.filter(pr => pr.status === PR_STATUSES.STAGING_QA_REJECTED);
  const merged = prs.filter(pr => pr.status === PR_STATUSES.MERGED);

  const handleDeployStaging = (pr) => {
    updatePRStatus(pr.id, PR_STATUSES.STAGING_AWAITING_QA);
    addNotification(`"${pr.title}" deployed to staging`, 'success');
  };

  const handleDeployProd = (pr) => {
    updatePRStatus(pr.id, PR_STATUSES.PRODUCTION);
    addNotification(`"${pr.title}" deployed to production`, 'success');
  };

  const handleRollback = (pr) => {
    updatePRStatus(pr.id, PR_STATUSES.MERGED);
    addNotification(`"${pr.title}" rolled back from staging`, 'info');
  };

  const PRItem = ({ pr, actions }) => (
    <div className="devops-item">
      <div className="devops-item__info">
        <h4 className="devops-item__title">{pr.title}</h4>
        <div className="devops-item__meta">
          <span>by {pr.author.name}</span>
          <span className="devops-item__time"><Clock size={12} /> {getTimeAgo(pr.createdAt)}</span>
        </div>
      </div>
      {actions && (
        <div className="devops-item__actions">
          {actions}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'environments') {
      return (
        <>
          <div className="dashboard__env-bar">
            {Object.values(ENV_STATUS).map((env) => (
              <div key={env.label} className="dashboard__env-status">
                <span>{env.icon}</span>
                <span className="dashboard__env-label">{env.label}</span>
                <span className="dashboard__env-value">Stable</span>
              </div>
            ))}
          </div>
          <ReleaseRadarFeed />
        </>
      );
    }

    if (activeTab === 'pipeline') {
      return (
        <div className="devops-sections">
          <Card>
            <CardHeader>
              <h3>
                <Server size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-2px' }} />
                Ready to Deploy
                <span className="devops-count">{merged.length}</span>
              </h3>
            </CardHeader>
            {merged.length === 0 ? (
              <p className="devops-empty">No merged PRs awaiting deployment</p>
            ) : (
              <div className="devops-list">
                {merged.map(pr => (
                  <PRItem key={pr.id} pr={pr} actions={
                    <Button variant="primary" size="sm" onClick={() => handleDeployStaging(pr)}>
                      Deploy to Staging
                    </Button>
                  } />
                ))}
              </div>
            )}
          </Card>
        </div>
      );
    }

    return (
      <div className="devops-sections">
        <div className="dashboard__env-bar">
          {Object.values(ENV_STATUS).map((env) => (
            <div key={env.label} className="dashboard__env-status">
              <span>{env.icon}</span>
              <span className="dashboard__env-label">{env.label}</span>
              <span className="dashboard__env-value">Stable</span>
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <h3>
              <Server size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-2px' }} />
              Ready to Deploy
              <span className="devops-count">{merged.length}</span>
            </h3>
          </CardHeader>
          {merged.length === 0 ? (
            <p className="devops-empty">No merged PRs awaiting deployment</p>
          ) : (
            <div className="devops-list">
              {merged.map(pr => (
                <PRItem key={pr.id} pr={pr} actions={
                  <Button variant="primary" size="sm" onClick={() => handleDeployStaging(pr)}>
                    Deploy to Staging
                  </Button>
                } />
              ))}
            </div>
          )}
        </Card>

        <Card>
          <CardHeader>
            <h3>
              <ShieldCheck size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-2px' }} />
              Awaiting QA (In Staging)
              <span className="devops-count">{awaitingQA.length}</span>
            </h3>
          </CardHeader>
          {awaitingQA.length === 0 ? (
            <p className="devops-empty">No PRs awaiting QA</p>
          ) : (
            <div className="devops-list">
              {awaitingQA.map(pr => (
                <PRItem key={pr.id} pr={pr} />
              ))}
            </div>
          )}
        </Card>

        <div className="devops-grid-2">
          <Card className="devops-section--approved">
            <CardHeader>
              <h3>
                <Globe size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-2px' }} />
                QA Approved (Ready for Prod)
                <span className="devops-count devops-count--green">{qaApproved.length}</span>
              </h3>
            </CardHeader>
            {qaApproved.length === 0 ? (
              <p className="devops-empty">No QA-approved PRs</p>
            ) : (
              <div className="devops-list">
                {qaApproved.map(pr => (
                  <PRItem key={pr.id} pr={pr} actions={
                    <Button variant="primary" size="sm" onClick={() => handleDeployProd(pr)}>
                      Deploy to Prod
                    </Button>
                  } />
                ))}
              </div>
            )}
          </Card>

          <Card className="devops-section--rejected">
            <CardHeader>
              <h3>
                <AlertTriangle size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-2px' }} />
                Rollback Requested (Failed QA)
                <span className="devops-count devops-count--red">{qaRejected.length}</span>
              </h3>
            </CardHeader>
            {qaRejected.length === 0 ? (
              <p className="devops-empty">No rollback requests</p>
            ) : (
              <div className="devops-list">
                {qaRejected.map(pr => (
                  <PRItem key={pr.id} pr={pr} actions={
                    <Button variant="danger" size="sm" onClick={() => handleRollback(pr)}>
                      Rollback
                    </Button>
                  } />
                ))}
              </div>
            )}
          </Card>
        </div>

        <ReleaseRadarFeed />
      </div>
    );
  };

  return (
    <div className="dashboard">
      <div className="dashboard__hero dashboard__hero--devops">
        <div className="dashboard__hero-content">
          <h1 className="dashboard__greeting">Deployment Pipeline</h1>
          <p className="dashboard__subtitle">
            <strong>{qaApproved.length}</strong> ready for prod, <strong>{qaRejected.length}</strong> need rollback
          </p>
        </div>
        <div className="dashboard__hero-stats">
          <div className="dashboard__stat-card">
            <Server size={18} />
            <div>
              <span className="dashboard__stat-value">{awaitingQA.length}</span>
              <span className="dashboard__stat-label">In QA</span>
            </div>
          </div>
          <div className="dashboard__stat-card">
            <Globe size={18} />
            <div>
              <span className="dashboard__stat-value">{qaApproved.length}</span>
              <span className="dashboard__stat-label">Ready</span>
            </div>
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}
