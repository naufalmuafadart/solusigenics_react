export function setTitle(document, title){
  document.title = title;
}

export function checkIsLoggedIn() {
  if (localStorage.getItem('accessToken') === null && localStorage.getItem('refreshToken') === null) {
    window.location.href = '/login';
  }
}

export function checkIsLoggedOut() {
  if (localStorage.getItem('accessToken') !== null && localStorage.getItem('refreshToken') !== null) {
    window.location.href = '/';
  }
}

export async function fetchRequestToHapiWithAuth(url, method, data) {
  const BASE_URL = `${import.meta.env.VITE_HAPI_HOST}`;
  let accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(`Authorization`, `Bearer ${accessToken}`);

  let requestOptions = {
    method,
    headers: myHeaders,
    redirect: 'follow',
  };

  if (data != null) {
    requestOptions['body'] = JSON.stringify(data);
  }

  let response = await fetch(`${BASE_URL}${url}`, requestOptions);
  let responseBody = await response.text();
  responseBody = JSON.parse(responseBody);

  if (responseBody.statusCode !== 401) {
    return responseBody;
  }

  if (responseBody.statusCode == 401) {
    const putAuthenticationsHeader = new Headers();
    putAuthenticationsHeader.append("Content-Type", "application/json");

    const putAuthenticationsPayload = { refreshToken };

    response = await fetch(`${BASE_URL}/authentications`, {
      method: 'PUT',
      headers: putAuthenticationsHeader,
      body: JSON.stringify(putAuthenticationsPayload),
      redirect: 'follow',
    });
    responseBody = await response.text();
    responseBody = JSON.parse(responseBody);
    const { data } = responseBody;
    accessToken = data.accessToken;
    localStorage.setItem('accessToken', accessToken);
  }

  myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(`Authorization`, `Bearer ${accessToken}`);

  requestOptions.headers = myHeaders;

  response = await fetch(`${BASE_URL}${url}`, requestOptions);
  responseBody = await response.text();
  responseBody = JSON.parse(responseBody);
  return responseBody;
}

export async function fetchRequestToHapi(url, method, data) {
  const BASE_URL = `${import.meta.env.VITE_HAPI_HOST}`;

  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let requestOptions = {
    method,
    headers: myHeaders,
    redirect: 'follow',
  };

  if (data != null) {
    requestOptions['body'] = JSON.stringify(data);
  }

  let response = await fetch(`${BASE_URL}${url}`, requestOptions);
  let responseBody = await response.text();
  responseBody = JSON.parse(responseBody);
  return responseBody;
}

export async function fetchRequestToFlask(url, method, data) {
  const BASE_URL = `${import.meta.env.VITE_FLASK_HOST}`;

  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let requestOptions = {
    method,
    headers: myHeaders,
    redirect: 'follow',
  };

  if (data != null) {
    requestOptions['body'] = JSON.stringify(data);
  }

  let response = await fetch(`${BASE_URL}${url}`, requestOptions);
  let responseBody = await response.text();
  return responseBody;
}
