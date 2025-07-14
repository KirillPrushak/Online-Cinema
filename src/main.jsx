import CssBaseline from '@mui/material/CssBaseline';
import { createRoot } from 'react-dom/client';

import App from './components/App.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <CssBaseline />
    <App />
  </>,
);
