import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="630539047377-kfbbhc2l502b6gh679v5v7el4b618vou.apps.googleusercontent.com">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GoogleOAuthProvider>
);
  