import './Badge.css';

const VARIANT_MAP = {
  pending_review: 'warning',
  in_review: 'info',
  approved: 'success',
  merged: 'success',
  staging: 'info',
  production: 'default',
  bug: 'danger',
  feature: 'info',
  refactor: 'warning',
  security: 'danger',
  testing: 'default',
  ui: 'info',
  auth: 'warning',
  api: 'default',
  backend: 'default',
  'real-time': 'info',
};

export default function Badge({ children, variant, dot }) {
  const resolvedVariant = variant || VARIANT_MAP[children?.toLowerCase?.()] || 'default';

  return (
    <span className={`badge badge--${resolvedVariant}`}>
      {dot && <span className="badge__dot" />}
      {children}
    </span>
  );
}
