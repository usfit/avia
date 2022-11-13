import React from 'react';
import { createRoot } from 'react-dom/client';

import Avia from './components/Avia';

import './style.scss';

function App() {
  return <Avia />;
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
