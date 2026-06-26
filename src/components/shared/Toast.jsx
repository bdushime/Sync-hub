import { usePRs } from '../../context/PRContext';
import './Toast.css';

export default function Toast() {
  const { notifications } = usePRs();

  if (notifications.length === 0) return null;

  return (
    <div className="toast-container">
      {notifications.map((n) => (
        <div key={n.id} className={`toast toast--${n.type}`}>
          {n.message}
        </div>
      ))}
    </div>
  );
}
