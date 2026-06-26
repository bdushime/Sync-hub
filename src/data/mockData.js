export const ROLES = {
  JUNIOR: 'junior',
  SENIOR: 'senior',
  QA: 'qa',
  DEVOPS: 'devops',
  SCRUM: 'scrum',
  MANAGER: 'manager',
};

export const ROLE_LABELS = {
  [ROLES.JUNIOR]: 'Junior Developer',
  [ROLES.SENIOR]: 'Senior Developer',
  [ROLES.QA]: 'QA Engineer',
  [ROLES.DEVOPS]: 'DevOps Engineer',
  [ROLES.SCRUM]: 'Scrum Master',
  [ROLES.MANAGER]: 'DI Manager',
};

export const ROLE_DESCRIPTIONS = {
  [ROLES.JUNIOR]: 'Submit PRs, track reviews, and monitor your pipeline',
  [ROLES.SENIOR]: 'Submit & review code, manage availability, approve merges',
  [ROLES.QA]: 'Test staging deployments, approve or reject for production',
  [ROLES.DEVOPS]: 'Deploy to staging & production, manage release pipeline',
  [ROLES.SCRUM]: 'Monitor team velocity, identify bottlenecks, schedule reviews',
  [ROLES.MANAGER]: 'Department velocity, resource health, and environment stability',
};

export const USERS = {
  junior1: { id: 'junior1', name: 'Dushime', avatar: 'AC', role: ROLES.JUNIOR },
  junior2: { id: 'junior2', name: 'Beni', avatar: 'PS', role: ROLES.JUNIOR },
  senior1: { id: 'senior1', name: 'Victor', avatar: 'MJ', role: ROLES.SENIOR, status: 'available' },
  senior2: { id: 'senior2', name: 'Eric', avatar: 'SK', role: ROLES.SENIOR, status: 'busy' },
  senior3: { id: 'senior3', name: 'Janvier', avatar: 'DO', role: ROLES.SENIOR, status: 'available' },
  qa1: { id: 'qa1', name: 'Clarisse', avatar: 'LN', role: ROLES.QA },
  devops1: { id: 'devops1', name: 'Malaika', avatar: 'JR', role: ROLES.DEVOPS },
  scrum1: { id: 'scrum1', name: 'Thierry', avatar: 'EW', role: ROLES.SCRUM },
  manager1: { id: 'manager1', name: 'Michel', avatar: 'PH', role: ROLES.MANAGER },
};

export const PR_STATUSES = {
  PENDING_REVIEW: 'pending_review',
  IN_REVIEW: 'in_review',
  APPROVED: 'approved',
  MERGED: 'merged',
  STAGING_AWAITING_QA: 'staging_awaiting_qa',
  STAGING_QA_APPROVED: 'staging_qa_approved',
  STAGING_QA_REJECTED: 'staging_qa_rejected',
  PRODUCTION: 'production',
};

export const PR_STATUS_LABELS = {
  [PR_STATUSES.PENDING_REVIEW]: 'Pending Review',
  [PR_STATUSES.IN_REVIEW]: 'In Review',
  [PR_STATUSES.APPROVED]: 'Approved',
  [PR_STATUSES.MERGED]: 'Merged',
  [PR_STATUSES.STAGING_AWAITING_QA]: 'Awaiting QA',
  [PR_STATUSES.STAGING_QA_APPROVED]: 'QA Approved',
  [PR_STATUSES.STAGING_QA_REJECTED]: 'QA Rejected',
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
  },
  {
    id: 'pr-2',
    title: 'Add pagination to user management table',
    url: 'https://github.com/brd/platform/pull/339',
    author: USERS.junior2,
    reviewer: USERS.senior2,
    status: PR_STATUSES.IN_REVIEW,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'pr-3',
    title: 'Refactor database connection pooling',
    url: 'https://github.com/brd/platform/pull/336',
    author: USERS.senior1,
    reviewer: USERS.senior3,
    status: PR_STATUSES.APPROVED,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: 'pr-4',
    title: 'Update API rate limiting middleware',
    url: 'https://github.com/brd/platform/pull/333',
    author: USERS.junior2,
    reviewer: USERS.senior1,
    status: PR_STATUSES.MERGED,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 'pr-5',
    title: 'Implement WebSocket notification service',
    url: 'https://github.com/brd/platform/pull/330',
    author: USERS.junior1,
    reviewer: USERS.senior2,
    status: PR_STATUSES.STAGING_AWAITING_QA,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
  {
    id: 'pr-6',
    title: 'Fix CSS grid layout in dashboard widgets',
    url: 'https://github.com/brd/platform/pull/328',
    author: USERS.junior2,
    reviewer: USERS.senior3,
    status: PR_STATUSES.PRODUCTION,
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
  },
  {
    id: 'pr-7',
    title: 'Add unit tests for payment processing module',
    url: 'https://github.com/brd/platform/pull/345',
    author: USERS.senior1,
    reviewer: USERS.senior2,
    status: PR_STATUSES.PENDING_REVIEW,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: 'pr-8',
    title: 'Add email verification on signup flow',
    url: 'https://github.com/brd/platform/pull/348',
    author: USERS.junior1,
    reviewer: USERS.senior1,
    status: PR_STATUSES.STAGING_AWAITING_QA,
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
  },
  {
    id: 'pr-9',
    title: 'Optimize image compression pipeline',
    url: 'https://github.com/brd/platform/pull/350',
    author: USERS.senior3,
    reviewer: USERS.senior1,
    status: PR_STATUSES.STAGING_QA_APPROVED,
    createdAt: new Date(Date.now() - 50 * 60 * 60 * 1000),
  },
  {
    id: 'pr-10',
    title: 'Fix race condition in checkout flow',
    url: 'https://github.com/brd/platform/pull/352',
    author: USERS.junior2,
    reviewer: USERS.senior3,
    status: PR_STATUSES.STAGING_QA_REJECTED,
    createdAt: new Date(Date.now() - 40 * 60 * 60 * 1000),
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
