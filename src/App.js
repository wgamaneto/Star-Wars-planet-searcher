import React from 'react';
import ProviderPlanets from './context/ProviderPlanets';
import Table from './components/Table';

import './App.css';

function App() {
  return (
    <ProviderPlanets>
      <Table />
    </ProviderPlanets>
  );
}

export default App;
