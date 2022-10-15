const init = (document) => {
  const navbar = document.getElementById("navbar");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const threeDots = document.getElementById("three-dots");
  const welcomeGreeting = document.getElementById("welcomeGreeting");
  const textVideoFavorite = document.getElementById('text-video-favorite');
  const icMenu = document.getElementById("ic-menu");

  threeDots.addEventListener("mouseenter", () => {
    dropdownMenu.style.display = "block";
  });
  
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

export default init;
