import { useRole } from './context/RoleContext';
import { ROLES } from './data/mockData';
import HeaderNav from './components/layout/HeaderNav';
import RoleSelect from './features/auth/RoleSelect';
import JuniorDashboard from './features/junior/JuniorDashboard';
import SeniorDashboard from './features/senior/SeniorDashboard';
import DevopsDashboard from './features/devops/DevopsDashboard';
import ScrumMasterDashboard from './features/scrum/ScrumMasterDashboard';
import './styles/PipelineOverview.css';

const DASHBOARD_MAP = {
  [ROLES.JUNIOR]: JuniorDashboard,
  [ROLES.SENIOR]: SeniorDashboard,
  [ROLES.DEVOPS]: DevopsDashboard,
  [ROLES.SCRUM]: ScrumMasterDashboard,
};

function App() {
  const { role } = useRole();

  if (!role) return <RoleSelect />;

  const Dashboard = DASHBOARD_MAP[role];

  return (
    <div className="app">
      <HeaderNav />
      <main className="app__main">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
