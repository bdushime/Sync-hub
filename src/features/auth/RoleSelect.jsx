import { useRole } from '../../context/RoleContext';
import { ROLES, ROLE_LABELS, ROLE_DESCRIPTIONS } from '../../data/mockData';
import { Code2, Shield, Rocket, Users, GitPullRequest, ArrowRight, ShieldCheck, BarChart3 } from 'lucide-react';
import './RoleSelect.css';

const ROLE_CONFIG = [
  {
    role: ROLES.JUNIOR,
    icon: Code2,
    color: '#2563eb',
    gradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
  },
  {
    role: ROLES.SENIOR,
    icon: Shield,
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
  },
  {
    role: ROLES.QA,
    icon: ShieldCheck,
    color: '#0891b2',
    gradient: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
  },
  {
    role: ROLES.DEVOPS,
    icon: Rocket,
    color: '#059669',
    gradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  },
  {
    role: ROLES.SCRUM,
    icon: Users,
    color: '#d97706',
    gradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
  },
  {
    role: ROLES.MANAGER,
    icon: BarChart3,
    color: '#1B5E36',
    gradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  },
];

export default function RoleSelect() {
  const { selectRole } = useRole();

  return (
    <div className="role-select">
      <div className="role-select__bg">
        <div className="role-select__grid-lines" />
      </div>

      <div className="role-select__content">
        <div className="role-select__header">
          <div className="role-select__logo">
            <GitPullRequest size={28} strokeWidth={2.5} />
          </div>
          <h1 className="role-select__title">Sync Hub</h1>
          <p className="role-select__subtitle">BRD Engineering Pipeline</p>
          <p className="role-select__desc">Select your role to access your personalized dashboard</p>
        </div>

        <div className="role-select__grid">
          {ROLE_CONFIG.map(({ role, icon: Icon, color, gradient }) => (
            <button
              key={role}
              className="role-card"
              onClick={() => selectRole(role)}
              style={{ '--role-color': color }}
            >
              <div className="role-card__icon" style={{ background: gradient }}>
                <Icon size={28} color={color} strokeWidth={1.8} />
              </div>
              <div className="role-card__info">
                <h3 className="role-card__title">{ROLE_LABELS[role]}</h3>
                <p className="role-card__desc">{ROLE_DESCRIPTIONS[role]}</p>
              </div>
              <div className="role-card__arrow">
                <ArrowRight size={18} />
              </div>
            </button>
          ))}
        </div>

        {/* <p className="role-select__footer">Demo Mode — No authentication required</p> */}
      </div>
    </div>
  );
}
