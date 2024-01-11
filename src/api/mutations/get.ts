
export const get =  (
  mutation: string,
  token?: string,
) => {
  if(token)
  return fetch(<string>process.env.REACT_APP_SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      query: `mutation {
        ${mutation}
      }`,
        }),
      }
    );
  else
  return fetch(<string>process.env.REACT_APP_SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `mutation {
        ${mutation}
      }`,
        }),
      }
    );
};
export default get;
