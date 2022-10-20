import { setTitle } from "../../common";

const outletInit = (id, title) => {
  const element = document.getElementById(id);
  element.addEventListener('click', () => {
    if (window.innerWidth <= 800) {
      const asideToggle = document.getElementById('asideToggle');
      const aside = document.querySelector("#mainContent > aside");
      asideToggle.value = 'hide';
      aside.style.display = 'none';
    }
  });
  setTitle(document, title);
}

export default outletInit;
