import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept and suppress cross-origin iframe runtime errors/script warning artifacts
if (typeof window !== 'undefined') {
  const suppressMsg = (msg: any): boolean => {
    if (!msg) return false;
    const m = String(msg).toLowerCase();
    return m.includes('script error') || 
           m.includes('resizeobserver') ||
           m.includes('cross-origin') ||
           m.includes('same-origin') ||
           m.includes('securityerror');
  };

  const oldOnError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    if (suppressMsg(message)) {
      return true;
    }
    if (oldOnError) {
      return oldOnError.apply(this, arguments as any);
    }
    return false;
  };

  window.addEventListener('error', (event) => {
    const msg = event.message || (event.error && event.error.message);
    if (suppressMsg(msg)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const msg = event.reason && (event.reason.message || event.reason);
    if (suppressMsg(msg)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  const originalConsoleError = console.error;
  console.error = function(...args) {
    if (suppressMsg(args[0])) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

