const fetchAPI = async () => {
  const endpoint = 'https://swapi.dev/api/planets';
  const request = await fetch(endpoint);
  const { results } = await request.json();
  results.forEach((planet) => delete planet.result);
  return results;
};

export default fetchAPI;
