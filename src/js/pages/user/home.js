import { setTitle } from "../common";

const init = () => {
  setTitle(document, "Beranda");
  const aside = document.querySelector("#mainContent > aside");
  const asideToggle = document.getElementById("asideToggle");

  if (window.innerWidth > 800) {
    aside.style.display = 'block';
  }
  else {
    aside.style.display = 'none';
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
      aside.style.display = 'block';
      asideToggle.value = 'active';
    }
    else {
      aside.style.display = 'none';
      asideToggle.value = 'hide';
    }
  });
};

export default init;
