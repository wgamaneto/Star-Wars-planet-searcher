import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

function Table() {
  const {
    planetInfo,
    renderPlanet,
    setRenderPlanet,
    handleName,
    handleValues,
    filters,
    filterByNumericValues,
  } = useContext(Context);

  useEffect(() => {
    const { filterByName: { name } } = filters;
    const filterNames = renderPlanet.filter((planet) => planet.name.includes(name));
    if (name.length > 0) {
      setRenderPlanet(filterNames);
    } else {
      setRenderPlanet(planetInfo);
    }
  }, [filters]);

  const handleComparison = () => {
    const { column, comparison, value } = filterByNumericValues;
    switch (comparison) {
    case 'maior que':
      return renderPlanet.filter((planet) => Number(planet[column]) > Number(value));
    case 'menor que':
      return renderPlanet.filter((planet) => Number(planet[column]) < Number(value));
    case 'igual a':
      return renderPlanet.filter((planet) => Number(planet[column]) === Number(value));
    default:
      return planetInfo;
    }
  };

  const filterValues = () => {
    const planetsFilterByValue = handleComparison();
    setRenderPlanet(planetsFilterByValue);
  };

  return (
    <div>
      <form>
        <input
          data-testid="name-filter"
          id="filterByName"
          name="filterByName"
          value={ filters.filterByName.name }
          type="text"
          onChange={ (event) => handleName(event) }
        />
        <select
          data-testid="column-filter"
          name="column"
          id="column"
          value={ filterByNumericValues.column }
          onChange={ (event) => handleValues(event) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <select
          data-testid="comparison-filter"
          name="comparison"
          id="comparison"
          value={ filterByNumericValues.comparison }
          onChange={ (event) => handleName(event) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          data-testid="value-filter"
          type="number"
          name="value"
          id="value"
          value={ filterByNumericValues.value }
          onChange={ (event) => handleValues(event) }
        />

        <button
          data-testid="button-filter"
          type="button"
          onClick={ filterValues }
        >
          Filtrar
        </button>
      </form>
      <table>
        <thead>
          <tr>
            {planetInfo.length > 0 && (
              Object.keys(planetInfo[0]).map((event) => (
                <th key={ event }>{event}</th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {renderPlanet.map((planet, index) => (
            <tr key={ index }>
              {
                Object.values(planet).map((infoPlanet, i) => (
                  <td key={ i }>{infoPlanet}</td>
                ))
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
