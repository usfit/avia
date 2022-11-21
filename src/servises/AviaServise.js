const baseURL = 'https://front-test.dev.aviasales.ru/';

async function getId() {
  const url = `${baseURL}search`;
  const res = await fetch(url);
  const body = await res.json();
  return body;
}

async function getTickets() {
  const searchId = await getId();
  const url = `${baseURL}tickets?searchId=${searchId.searchId}`;
  const res = await fetch(url);
  return res;
}

export default getTickets;
