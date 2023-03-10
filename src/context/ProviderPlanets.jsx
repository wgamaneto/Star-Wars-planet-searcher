import React, { useState, useEffect, useMemo } from 'react';
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
  const [handleFilter, setHandleFilter] = useState([]);

  const [handleColumn, setHandleColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    const planetsAPI = async () => {
      const response = await fetchAPI();
      console.log(response);
      setPlanetInfo(response);
      setRenderPlanet(response);
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

  const value = useMemo(() => ({
    planetInfo,
    renderPlanet,
    setRenderPlanet,
    handleName,
    handleValues,
    filters,
    setFilters,
    filterByNumericValues,
    setFilterByNumericValues,
    handleFilter,
    setHandleFilter,
    handleColumn,
    setHandleColumn,
  }), [planetInfo, renderPlanet, handleName,
    handleValues, filters, filterByNumericValues, handleFilter, handleColumn]);

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

ProviderPlanets.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderPlanets;
