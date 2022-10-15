export function setTitle(document, title){
  document.title = title;
}

export function setFavicon(document) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
  }
  link.href = '/images/favicon.ico';
}
