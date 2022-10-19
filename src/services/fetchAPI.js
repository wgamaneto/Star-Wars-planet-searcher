const fetchAPI = async () => {
  const endpoint = 'https://swapi.dev/api/planets';
  const request = await fetch(endpoint);
  const { results } = await request.json();
  results.filter((opa) => delete opa.residents);
  return results;
};

export default fetchAPI;
