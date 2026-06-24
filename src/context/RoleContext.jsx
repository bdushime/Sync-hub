import { createContext, useContext, useState } from 'react';
import { ROLES, USERS } from '../data/mockData';

const RoleContext = createContext(null);

const ROLE_USER_MAP = {
  [ROLES.JUNIOR]: USERS.junior1,
  [ROLES.SENIOR]: USERS.senior1,
  [ROLES.DEVOPS]: USERS.devops1,
  [ROLES.SCRUM]: USERS.scrum1,
};

export function RoleProvider({ children }) {
  const [role, setRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const selectRole = (newRole) => {
    setRole(newRole);
    setCurrentUser(ROLE_USER_MAP[newRole]);
    setActiveTab('dashboard');
  };

  const logout = () => {
    setRole(null);
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  return (
    <RoleContext.Provider value={{ role, currentUser, selectRole, logout, activeTab, setActiveTab }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRole must be used within RoleProvider');
  return context;
}
