import { useState, useEffect } from 'react';
import { useRole } from '../../context/RoleContext';
import { ROLES, ROLE_LABELS } from '../../data/mockData';
import Avatar from '../shared/Avatar';
import { GitPullRequest, Bell, LogOut, ChevronDown, LayoutDashboard, Code2, Rocket, BarChart3, Settings } from 'lucide-react';
import './HeaderNav.css';

const NAV_ITEMS = {
  [ROLES.JUNIOR]: [
    { label: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
    { label: 'My PRs', icon: GitPullRequest, id: 'prs' },
    { label: 'Reviewers', icon: Code2, id: 'reviewers' },
  ],
  [ROLES.SENIOR]: [
    { label: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
    { label: 'Review Queue', icon: GitPullRequest, id: 'queue' },
    { label: 'Analytics', icon: BarChart3, id: 'analytics' },
  ],
  [ROLES.DEVOPS]: [
    { label: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
    { label: 'Pipeline', icon: Rocket, id: 'pipeline' },
    { label: 'Environments', icon: Settings, id: 'environments' },
  ],
  [ROLES.SCRUM]: [
    { label: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
    { label: 'Pipeline', icon: GitPullRequest, id: 'pipeline' },
    { label: 'Reports', icon: BarChart3, id: 'reports' },
  ],
};

export default function HeaderNav() {
  const { role, currentUser, logout, activeTab, setActiveTab } = useRole();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = NAV_ITEMS[role] || [];
  const notifications = 3;

  return (
    <header className={`header-nav ${scrolled ? 'header-nav--scrolled' : ''}`}>
      <div className="header-nav__inner">
        <div className="header-nav__left">
          <div className="header-nav__brand" onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
            <img src="/brd-logo.png" alt="BRD" className="header-nav__logo-img" />
            <span className="header-nav__title">Sync Hub</span>
          </div>

          <nav className="header-nav__tabs">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`header-nav__tab ${activeTab === item.id ? 'header-nav__tab--active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="header-nav__right">
          <div className="header-nav__role-badge">
            {ROLE_LABELS[role]}
          </div>

          <button className="header-nav__icon-btn header-nav__notification-btn">
            <Bell size={18} />
            {notifications > 0 && (
              <span className="header-nav__notification-count">{notifications}</span>
            )}
          </button>

          <div className="header-nav__user-area" onClick={() => setShowUserMenu(!showUserMenu)}>
            <Avatar
              name={currentUser?.name}
              initials={currentUser?.avatar}
              size="sm"
            />
            <div className="header-nav__user-info">
              <span className="header-nav__user-name">{currentUser?.name}</span>
            </div>
            <ChevronDown size={14} className={`header-nav__chevron ${showUserMenu ? 'header-nav__chevron--open' : ''}`} />

            {showUserMenu && (
              <div className="header-nav__dropdown">
                <button className="header-nav__dropdown-item" onClick={logout}>
                  <LogOut size={15} />
                  <span>Switch Role</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
