<template>
  <aside class="sidebar">
    <header class="sidebar__header d-flex justify-content-between align-items-center">
      <div class="logo">
        Logo
      </div>
      <div class="burger">
        <span />
        <span />
        <span />
      </div>
    </header>
    <div class="sidebar__content">
      <ul class="sidebar__nav-menu vertical-list">
        <li class="vertical-list__heading">
          Меню
        </li>
        <li class="vertical-list__item --active">
          <a
            href="#"
            aria-expanded="true"
          >
            <span class="mdi mdi-clipboard-text-outline pos-left-null" />
            Заявления
            <span class="mdi mdi-chevron-up pos-right-null" />
          </a>
          <ul class="submenu">
            <li class="submenu__item">
              <a
                class=""
                href=""
              >Новые</a>
            </li>
            <li class="submenu__item">
              <a
                class=""
                href=""
              >Активные</a>
            </li>
            <li class="submenu__item">
              <a
                class=""
                href=""
              >Завершённые</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <footer class="sidebar__footer d-flex justify-content-center align-items-center">
      <router-link
        to="/"
        class="btn btn-primary"
      >
        Выход
      </router-link>
    </footer>
  </aside>
</template>

<script>
export default {
  name: 'NavAside',
};
</script>

<style scoped></style>
