export function SignUpFn(e, api, options) {
  e.preventDefault();
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api}
`,
    options,
  )
    .then(response => response.json())
    .then(data => {
      return data;
    });
}
