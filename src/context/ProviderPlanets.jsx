import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Context from './Context';
import fetchAPI from '../services/fetchAPI';

function ProviderPlanets({ children }) {
  const [planetInfo, setPlanetInfo] = useState([]);
  const [renderPlanet, setRenderPlanet] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
  });
  const [filterByNumericValues, setFilterByNumericValues] = useState(
    { column: 'population', comparison: 'maior que', value: '0' },
  );

  useEffect(() => {
    const planetsAPI = async () => {
      const response = await fetchAPI();
      console.log(response);
      setPlanetInfo(response);
    };
    planetsAPI();
  }, [setPlanetInfo]);

  const handleName = ({ target }) => {
    const { value } = target;
    setFilters({ ...filters, filterByName: { name: value } });
  };

  const handleValues = ({ target }) => {
    const { value, name } = target;
    setFilterByNumericValues({ ...filterByNumericValues, [name]: value });
  };

  const value = {
    setPlanetInfo,
    renderPlanet,
    setRenderPlanet,
    handleName,
    handleValues,
    filters,
    setFilters,
    filterByNumericValues,
    setFilterByNumericValues,
  };

  return (
    <Context.Provider value={ {...value, planetInfo} }>
      {children}
    </Context.Provider>
  );
}

ProviderPlanets.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderPlanets;
