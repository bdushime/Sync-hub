import { useRole } from '../../context/RoleContext';
import { usePRs } from '../../context/PRContext';
import './AvailabilityToggle.css';

export default function AvailabilityToggle() {
  const { currentUser } = useRole();
  const { seniors, toggleSeniorAvailability } = usePRs();

  const me = seniors.find(s => s.id === currentUser?.id);
  const available = me?.status === 'available';

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
          {available ? 'Juniors can see you as available' : 'Focus mode — hidden from reviewer list'}
        </p>
      </div>
      <button
        className="availability-toggle__switch"
        onClick={() => toggleSeniorAvailability(currentUser.id)}
        role="switch"
        aria-checked={available}
      >
        <span className="availability-toggle__knob" />
      </button>
    </div>
  );
}
