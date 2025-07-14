import CssBaseline from '@mui/material/CssBaseline';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './components/App.jsx';

import 'bear-react-carousel/dist/index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
);
