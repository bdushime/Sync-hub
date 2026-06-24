import './Avatar.css';

export default function Avatar({ name, initials, size = 'md', status }) {
  return (
    <div className={`avatar avatar--${size}`}>
      <span className="avatar__initials">{initials || (name || '??').slice(0, 2).toUpperCase()}</span>
      {status && (
        <span className={`avatar__status avatar__status--${status}`} />
      )}
    </div>
  );
}
