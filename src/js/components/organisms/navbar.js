export const init = (document) => {
  const navbar = document.getElementById("navbar");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const welcomeGreeting = document.getElementById("welcomeGreeting");
  const textVideoFavorite = document.getElementById('text-video-favorite');
  const icMenu = document.getElementById("ic-menu");
  
  navbar.addEventListener("mouseleave", () => {
    dropdownMenu.style.display = "none";
  });

  welcomeGreeting.innerHTML = "Welcome, user";

  if (window.innerWidth < 650) {
    textVideoFavorite.innerHTML = 'Favorit';
    welcomeGreeting.innerHTML = 'user';
  }

  if (window.innerWidth > 800) {
    icMenu.style.display = 'none';
  }
  else {
    icMenu.style.display = 'inherit';
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth < 650) {
      textVideoFavorite.innerHTML = 'Favorit';
      welcomeGreeting.innerHTML = 'user';
    }
    else {
      textVideoFavorite.innerHTML = 'Video Favorit';
      welcomeGreeting.innerHTML = "Welcome, user";
    }

    if (window.innerWidth > 800) {
      icMenu.style.display = 'none';
    }
    else {
      icMenu.style.display = 'inherit';
    }
  });
}

export const hide = (document) => {
  if (window.innerWidth <= 800) {
    const asideToggle = document.getElementById('asideToggle');
    const aside = document.querySelector("#mainContent > aside");
    asideToggle.value = 'hide';
    aside.style.display = 'none';
  }
}

export const show = (document) => {
  if (window.innerWidth <= 800) {
    const asideToggle = document.getElementById('asideToggle');
    const aside = document.querySelector("#mainContent > aside");
    asideToggle.value = 'active';
    aside.style.display = 'block';
  }
}
