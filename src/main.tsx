import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept and suppress cross-origin iframe runtime errors/script warning artifacts
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (
      event.message === 'Script error.' || 
      event.message?.includes('Script error') ||
      event.message?.includes('ResizeObserver')
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault();
    event.stopPropagation();
  }, true);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

