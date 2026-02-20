import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WhatsAppFloatingButton />
    <App />
  </StrictMode>
);
