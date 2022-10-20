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
    setFilterByNumericValues,
    handleFilter,
    setHandleFilter,
    handleColumn,
    setHandleColumn,
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

  useEffect(() => {
    if (handleFilter.length > 0) {
      const newColumn = handleColumn
        .filter((column) => column !== handleFilter[handleFilter.length - 1].column);
      setFilterByNumericValues(
        { column: newColumn[0], comparison: 'maior que', value: '0' },
      );
      setHandleColumn(newColumn);
    }
  }, [handleFilter]);

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
    setHandleFilter([...handleFilter, filterByNumericValues]);
  };

  return (
    <div>
      <form>
        <input
          data-testid="name-filter"
          id="filterByName"
          name="filterByName"
          type="text"
          value={ filters.filterByName.name }
          onChange={ (event) => handleName(event) }
        />
        <select
          data-testid="column-filter"
          name="column"
          id="column"
          value={ filterByNumericValues.column }
          onChange={ (event) => handleValues(event) }
        >
          {handleColumn.map((element) => (
            <option
              key={ element }
              value={ element }
            >
              {element}
            </option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          name="comparison"
          id="comparison"
          value={ filterByNumericValues.comparison }
          onChange={ (event) => handleValues(event) }
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
      <div>
        {handleFilter.length > 0 && (
          handleFilter.map((filter, index) => (
            <p key={ index }>
              {`${filter.column} ${filter.comparison} ${filter.value}`}
            </p>
          ))
        )}
      </div>
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
