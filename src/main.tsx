import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <GoogleOAuthProvider clientId="630539047377-2sqafel8kfgsqkk57rtsib7fmc7e1gui.apps.googleusercontent.com">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  // </GoogleOAuthProvider>
);
