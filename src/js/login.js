export function handlerLoginFn(e, api, options) {
  e.preventDefault();
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api}`,
    options,
  )
    .then(response => response.json())
    .then(data => {
      return data;
    });
}
