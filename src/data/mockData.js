export const ROLES = {
  JUNIOR: 'junior',
  SENIOR: 'senior',
  DEVOPS: 'devops',
  SCRUM: 'scrum',
};

export const ROLE_LABELS = {
  [ROLES.JUNIOR]: 'Junior Developer',
  [ROLES.SENIOR]: 'Senior Developer',
  [ROLES.DEVOPS]: 'DevOps Engineer',
  [ROLES.SCRUM]: 'Scrum Master',
};

export const ROLE_DESCRIPTIONS = {
  [ROLES.JUNIOR]: 'Submit PRs, track reviews, and monitor your pipeline',
  [ROLES.SENIOR]: 'Review code, manage your availability, and approve merges',
  [ROLES.DEVOPS]: 'Deploy to staging & production, manage release pipeline',
  [ROLES.SCRUM]: 'Monitor team velocity, identify bottlenecks, schedule reviews',
};

export const USERS = {
  junior1: { id: 'junior1', name: 'Alex Chen', avatar: 'AC', role: ROLES.JUNIOR },
  junior2: { id: 'junior2', name: 'Priya Sharma', avatar: 'PS', role: ROLES.JUNIOR },
  senior1: { id: 'senior1', name: 'Marcus Johnson', avatar: 'MJ', role: ROLES.SENIOR, status: 'available' },
  senior2: { id: 'senior2', name: 'Sarah Kim', avatar: 'SK', role: ROLES.SENIOR, status: 'busy' },
  senior3: { id: 'senior3', name: 'David Okafor', avatar: 'DO', role: ROLES.SENIOR, status: 'available' },
  devops1: { id: 'devops1', name: 'Jordan Rivera', avatar: 'JR', role: ROLES.DEVOPS },
  scrum1: { id: 'scrum1', name: 'Emily Watson', avatar: 'EW', role: ROLES.SCRUM },
};

export const PR_STATUSES = {
  PENDING_REVIEW: 'pending_review',
  IN_REVIEW: 'in_review',
  APPROVED: 'approved',
  MERGED: 'merged',
  STAGING: 'staging',
  PRODUCTION: 'production',
};

export const PR_STATUS_LABELS = {
  [PR_STATUSES.PENDING_REVIEW]: 'Pending Review',
  [PR_STATUSES.IN_REVIEW]: 'In Review',
  [PR_STATUSES.APPROVED]: 'Approved',
  [PR_STATUSES.MERGED]: 'Merged',
  [PR_STATUSES.STAGING]: 'Staging',
  [PR_STATUSES.PRODUCTION]: 'Production',
};

export const MOCK_PRS = [
  {
    id: 'pr-1',
    title: 'Fix authentication token refresh logic',
    url: 'https://github.com/brd/platform/pull/342',
    author: USERS.junior1,
    reviewer: USERS.senior1,
    status: PR_STATUSES.PENDING_REVIEW,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    labels: ['bug', 'auth'],
    linesAdded: 47,
    linesRemoved: 12,
    filesChanged: 3,
  },
  {
    id: 'pr-2',
    title: 'Add pagination to user management table',
    url: 'https://github.com/brd/platform/pull/339',
    author: USERS.junior2,
    reviewer: USERS.senior2,
    status: PR_STATUSES.IN_REVIEW,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    labels: ['feature', 'ui'],
    linesAdded: 156,
    linesRemoved: 23,
    filesChanged: 5,
  },
  {
    id: 'pr-3',
    title: 'Refactor database connection pooling',
    url: 'https://github.com/brd/platform/pull/336',
    author: USERS.junior1,
    reviewer: USERS.senior3,
    status: PR_STATUSES.APPROVED,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    labels: ['refactor', 'backend'],
    linesAdded: 89,
    linesRemoved: 67,
    filesChanged: 4,
  },
  {
    id: 'pr-4',
    title: 'Update API rate limiting middleware',
    url: 'https://github.com/brd/platform/pull/333',
    author: USERS.junior2,
    reviewer: USERS.senior1,
    status: PR_STATUSES.MERGED,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    labels: ['security', 'api'],
    linesAdded: 34,
    linesRemoved: 8,
    filesChanged: 2,
  },
  {
    id: 'pr-5',
    title: 'Implement WebSocket notification service',
    url: 'https://github.com/brd/platform/pull/330',
    author: USERS.junior1,
    reviewer: USERS.senior2,
    status: PR_STATUSES.STAGING,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    labels: ['feature', 'real-time'],
    linesAdded: 245,
    linesRemoved: 0,
    filesChanged: 8,
  },
  {
    id: 'pr-6',
    title: 'Fix CSS grid layout in dashboard widgets',
    url: 'https://github.com/brd/platform/pull/328',
    author: USERS.junior2,
    reviewer: USERS.senior3,
    status: PR_STATUSES.PRODUCTION,
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
    labels: ['bug', 'ui'],
    linesAdded: 18,
    linesRemoved: 22,
    filesChanged: 2,
  },
  {
    id: 'pr-7',
    title: 'Add unit tests for payment processing module',
    url: 'https://github.com/brd/platform/pull/345',
    author: USERS.junior1,
    reviewer: null,
    status: PR_STATUSES.PENDING_REVIEW,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    labels: ['testing'],
    linesAdded: 312,
    linesRemoved: 0,
    filesChanged: 6,
  },
];

export const RELEASE_LOG = [
  { id: 'rel-1', message: 'Deployed PR #330 to Staging', env: 'staging', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), author: USERS.devops1 },
  { id: 'rel-2', message: 'Deployed PR #328 to Production', env: 'production', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), author: USERS.devops1 },
  { id: 'rel-3', message: 'Deployed PR #325 to Production', env: 'production', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), author: USERS.devops1 },
  { id: 'rel-4', message: 'Rollback PR #322 from Staging', env: 'staging', timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000), author: USERS.devops1 },
  { id: 'rel-5', message: 'Deployed PR #320 to Staging', env: 'staging', timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), author: USERS.devops1 },
];

export const REVIEW_SCHEDULE = [
  { id: 'sched-1', day: 'Monday', startTime: '10:00', endTime: '12:00', label: 'Morning Review Block' },
  { id: 'sched-2', day: 'Wednesday', startTime: '14:00', endTime: '16:00', label: 'Afternoon Review Block' },
  { id: 'sched-3', day: 'Friday', startTime: '09:00', endTime: '11:00', label: 'Sprint Cleanup Reviews' },
];

export const ENV_STATUS = {
  staging: { label: 'Staging', status: 'stable', icon: '✅' },
  production: { label: 'Production', status: 'stable', icon: '✅' },
};

export function getTimeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function getWaitHours(date) {
  return ((Date.now() - date.getTime()) / 3600000).toFixed(1);
}
