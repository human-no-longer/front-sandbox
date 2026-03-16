const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    body: data,
  });
  return await res.text();
};

const getResource = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};

export { getResource, postData };
