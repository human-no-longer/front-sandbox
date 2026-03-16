const createLoader = (onSuccess, onError) => () =>
  fetch(
    // 'https://31.javascript.htmlacademy.pro/code-and-magick/data',
    "SOME API URL",
    {
      method: "GET",
      credentials: "same-origin",
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });

export { createLoader };
