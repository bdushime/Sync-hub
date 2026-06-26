import { createContext, useContext, useState } from 'react';
import { MOCK_PRS, USERS, PR_STATUSES, RELEASE_LOG } from '../data/mockData';

const PRContext = createContext(null);

const INITIAL_SENIORS = Object.values(USERS)
  .filter(u => u.role === 'senior')
  .map(s => ({ ...s }));

export function PRProvider({ children }) {
  const [prs, setPrs] = useState(MOCK_PRS);
  const [seniors, setSeniors] = useState(INITIAL_SENIORS);
  const [notifications, setNotifications] = useState([]);
  const [releaseLog, setReleaseLog] = useState(RELEASE_LOG);

  const toggleSeniorAvailability = (seniorId) => {
    setSeniors(prev => prev.map(s =>
      s.id === seniorId
        ? { ...s, status: s.status === 'available' ? 'busy' : 'available' }
        : s
    ));
  };

  const addReleaseEntry = (message, env) => {
    setReleaseLog(prev => [{
      id: `rel-${Date.now()}`,
      message,
      env,
      timestamp: new Date(),
    }, ...prev]);
  };

  const updatePRStatus = (prId, newStatus) => {
    const pr = prs.find(p => p.id === prId);
    setPrs(prev => prev.map(p =>
      p.id === prId ? { ...p, status: newStatus } : p
    ));

    if (pr) {
      if (newStatus === PR_STATUSES.STAGING_AWAITING_QA) {
        addReleaseEntry(`Deployed "${pr.title}" to Staging`, 'staging');
      } else if (newStatus === PR_STATUSES.PRODUCTION) {
        addReleaseEntry(`Deployed "${pr.title}" to Production`, 'production');
      } else if (newStatus === PR_STATUSES.STAGING_QA_REJECTED) {
        addReleaseEntry(`QA rejected "${pr.title}" in Staging`, 'staging');
      } else if (newStatus === PR_STATUSES.MERGED && pr.status === PR_STATUSES.STAGING_QA_REJECTED) {
        addReleaseEntry(`Rolled back "${pr.title}" from Staging`, 'staging');
      }
    }
  };

  const addPR = (title, url, author, reviewer) => {
    const newPR = {
      id: `pr-${Date.now()}`,
      title,
      url,
      author,
      reviewer,
      status: PR_STATUSES.PENDING_REVIEW,
      createdAt: new Date(),
    };
    setPrs(prev => [newPR, ...prev]);
    addNotification(`PR "${title}" submitted for review by ${reviewer.name}`, 'success');
  };

  const addNotification = (message, type = 'info') => {
    const id = `notif-${Date.now()}`;
    setNotifications(prev => [{ id, message, type, timestamp: new Date() }, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  return (
    <PRContext.Provider value={{
      prs, updatePRStatus, addPR,
      seniors, toggleSeniorAvailability,
      releaseLog,
      notifications, addNotification,
    }}>
      {children}
    </PRContext.Provider>
  );
}

export function usePRs() {
  const context = useContext(PRContext);
  if (!context) throw new Error('usePRs must be used within PRProvider');
  return context;
}
