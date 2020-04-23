// Collapsible lists
import anime from 'animejs';

window.onload = () => {
  let $grid = document.querySelector('.grid-main');

  document.querySelectorAll('.vertical-list__trigger').forEach(item => {
    item.addEventListener('click', function() {
      let subMenu = this.nextElementSibling;
      this.querySelector('.mdi-chevron-up').classList.toggle('mdi-rotate-180');
      let arr =
        subMenu.clientHeight == subMenu.scrollHeight
          ? [subMenu.scrollHeight, 0]
          : [0, subMenu.scrollHeight];
      anime({
        targets: subMenu,
        height: arr,
        easing: 'easeOutQuad',
        duration: 200,
      });
    });
  });

  document.querySelector('.burger').addEventListener('click', function() {

    let $sidebar = $grid.querySelector('.sidebar');
    $sidebar.classList.toggle('close');

    let logout = document.getElementById('logout');
    if (logout.classList.contains('is-extended')) {
      logout.classList.replace('btn-primary', 'btn-primary-text');
      logout.classList.replace('is-extended', 'btn-icon');
    } else {
      logout.classList.replace('btn-icon', 'is-extended');
      logout.classList.replace('btn-primary-text', 'btn-primary');
    }
  });
};
