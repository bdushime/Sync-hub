import './Card.css';

export default function Card({ children, className = '', hover, padding, onClick }) {
  return (
    <div
      className={`card ${hover ? 'card--hover' : ''} ${onClick ? 'card--clickable' : ''} ${className}`}
      style={padding !== undefined ? { padding } : undefined}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`card__header ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }) {
  return <div className={`card__body ${className}`}>{children}</div>;
}
