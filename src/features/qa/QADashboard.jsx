import { useRole } from '../../context/RoleContext';
import { usePRs } from '../../context/PRContext';
import { PR_STATUSES, PR_STATUS_LABELS, getTimeAgo } from '../../data/mockData';
import Card, { CardHeader } from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { ShieldCheck, ShieldX, Clock, CheckCircle, XCircle } from 'lucide-react';
import '../../styles/DashboardLayout.css';
import './QADashboard.css';

export default function QADashboard() {
  const { activeTab } = useRole();
  const { prs, updatePRStatus, addNotification } = usePRs();

  const awaitingQA = prs.filter(pr => pr.status === PR_STATUSES.STAGING_AWAITING_QA);
  const approved = prs.filter(pr => pr.status === PR_STATUSES.STAGING_QA_APPROVED);
  const rejected = prs.filter(pr => pr.status === PR_STATUSES.STAGING_QA_REJECTED);

  const handleApprove = (pr) => {
    updatePRStatus(pr.id, PR_STATUSES.STAGING_QA_APPROVED);
    addNotification(`"${pr.title}" approved for production`, 'success');
  };

  const handleReject = (pr) => {
    updatePRStatus(pr.id, PR_STATUSES.STAGING_QA_REJECTED);
    addNotification(`Rollback requested: "${pr.title}" — ${pr.author.name} notified`, 'danger');
  };

  const renderQueue = () => (
    <Card>
      <CardHeader>
        <h3>
          <ShieldCheck size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-2px' }} />
          Staging — Awaiting QA
          <span className="qa-count">{awaitingQA.length}</span>
        </h3>
      </CardHeader>
      {awaitingQA.length === 0 ? (
        <p className="qa-empty">No PRs awaiting testing</p>
      ) : (
        <div className="qa-list">
          {awaitingQA.map(pr => (
            <div key={pr.id} className="qa-card">
              <div className="qa-card__info">
                <h4 className="qa-card__title">{pr.title}</h4>
                <div className="qa-card__meta">
                  <span>by {pr.author.name}</span>
                  <span className="qa-card__time"><Clock size={12} /> {getTimeAgo(pr.createdAt)}</span>
                </div>
              </div>
              <div className="qa-card__actions">
                <Button variant="primary" size="sm" onClick={() => handleApprove(pr)}>
                  Approve for Prod
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleReject(pr)}>
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );

  const renderResults = () => (
    <div className="qa-results">
      <Card>
        <CardHeader>
          <h3>
            <CheckCircle size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-2px' }} />
            Approved
            <span className="qa-count qa-count--green">{approved.length}</span>
          </h3>
        </CardHeader>
        {approved.length === 0 ? (
          <p className="qa-empty">No approved PRs yet</p>
        ) : (
          <div className="qa-list">
            {approved.map(pr => (
              <div key={pr.id} className="qa-card qa-card--approved">
                <div className="qa-card__info">
                  <h4 className="qa-card__title">{pr.title}</h4>
                  <span className="qa-card__status qa-card__status--approved">{PR_STATUS_LABELS[pr.status]}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <CardHeader>
          <h3>
            <XCircle size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-2px' }} />
            Rejected
            <span className="qa-count qa-count--red">{rejected.length}</span>
          </h3>
        </CardHeader>
        {rejected.length === 0 ? (
          <p className="qa-empty">No rejections</p>
        ) : (
          <div className="qa-list">
            {rejected.map(pr => (
              <div key={pr.id} className="qa-card qa-card--rejected">
                <div className="qa-card__info">
                  <h4 className="qa-card__title">{pr.title}</h4>
                  <span className="qa-card__status qa-card__status--rejected">{PR_STATUS_LABELS[pr.status]}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'staging') return renderQueue();
    return (
      <>
        {renderQueue()}
        {renderResults()}
      </>
    );
  };

  return (
    <div className="dashboard">
      <div className="dashboard__hero dashboard__hero--qa">
        <div className="dashboard__hero-content">
          <h1 className="dashboard__greeting">QA Testing</h1>
          <p className="dashboard__subtitle">
            <strong>{awaitingQA.length} PRs</strong> in staging awaiting your review
          </p>
        </div>
        <div className="dashboard__hero-stats">
          <div className="dashboard__stat-card">
            <ShieldCheck size={18} />
            <div>
              <span className="dashboard__stat-value">{awaitingQA.length}</span>
              <span className="dashboard__stat-label">Awaiting QA</span>
            </div>
          </div>
          <div className="dashboard__stat-card">
            <CheckCircle size={18} />
            <div>
              <span className="dashboard__stat-value">{approved.length}</span>
              <span className="dashboard__stat-label">Approved</span>
            </div>
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}
