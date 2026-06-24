import { useState } from 'react';
import './AvailabilityToggle.css';

export default function AvailabilityToggle() {
  const [available, setAvailable] = useState(true);

  return (
    <div className={`availability-toggle ${available ? 'availability-toggle--available' : 'availability-toggle--busy'}`}>
      <div className="availability-toggle__content">
        <div className="availability-toggle__status">
          <span className="availability-toggle__emoji">{available ? '🟢' : '🟡'}</span>
          <span className="availability-toggle__label">
            {available ? 'Available for Reviews' : 'Heads Down'}
          </span>
        </div>
        <p className="availability-toggle__hint">
          {available ? 'Juniors can ping you for reviews' : 'Focus mode — pings are paused'}
        </p>
      </div>
      <button
        className="availability-toggle__switch"
        onClick={() => setAvailable(!available)}
        role="switch"
        aria-checked={available}
      >
        <span className="availability-toggle__knob" />
      </button>
    </div>
  );
}
