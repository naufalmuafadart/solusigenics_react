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
