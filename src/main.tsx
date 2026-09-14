import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TiltProvider } from './context/DeviceTiltContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TiltProvider>
      <App />
    </TiltProvider>
  </StrictMode>,
);
