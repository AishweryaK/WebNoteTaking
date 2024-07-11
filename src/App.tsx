import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store';
import RootRouter from './Routes/RootRouter';
import './App.css';

const baseName = import.meta.env.VITE_BASE_NAME;

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HelmetProvider>
          <BrowserRouter basename={baseName}>
            <div
              // id="root"
              className="max-w-screen-xl mx-auto bg-my-background dark:bg-my-bg-dark min-h-screen min-w-full bg-cover bg-center flex flex-col"
            >
              <RootRouter />
            </div>
          </BrowserRouter>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
