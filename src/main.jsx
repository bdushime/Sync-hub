import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App.jsx';
import { RoleProvider } from './context/RoleContext';
import { PRProvider } from './context/PRContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoleProvider>
      <PRProvider>
        <App />
      </PRProvider>
    </RoleProvider>
  </StrictMode>,
);
