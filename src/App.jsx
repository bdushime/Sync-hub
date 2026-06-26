import { useRole } from './context/RoleContext';
import { ROLES } from './data/mockData';
import HeaderNav from './components/layout/HeaderNav';
import Toast from './components/shared/Toast';
import RoleSelect from './features/auth/RoleSelect';
import JuniorDashboard from './features/junior/JuniorDashboard';
import SeniorDashboard from './features/senior/SeniorDashboard';
import QADashboard from './features/qa/QADashboard';
import DevopsDashboard from './features/devops/DevopsDashboard';
import ScrumMasterDashboard from './features/scrum/ScrumMasterDashboard';
import ManagerDashboard from './features/manager/ManagerDashboard';
import './styles/PipelineOverview.css';

const DASHBOARD_MAP = {
  [ROLES.JUNIOR]: JuniorDashboard,
  [ROLES.SENIOR]: SeniorDashboard,
  [ROLES.QA]: QADashboard,
  [ROLES.DEVOPS]: DevopsDashboard,
  [ROLES.SCRUM]: ScrumMasterDashboard,
  [ROLES.MANAGER]: ManagerDashboard,
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
      <Toast />
    </div>
  );
}

export default App;
