<template>
  <aside class="aside-left">
    <nav class="main-menu">
      <ul class="menu-items">
        <li class="menu-item">
          <a class="menu-link active" href="index.html">
            <i class="fal fa-poll"></i>
            <span class="nav-text">Результаты</span>
          </a>
        </li>
        <li class="menu-item">
          <a class="menu-link" href="test.html">
            <i class="fas fa-tasks"></i>
            <span class="nav-text">Тесты</span>
          </a>
        </li>
        <li class="menu-item">
          <a class="menu-link" href="practical.html">
            <i class="fal fa-superscript"></i>
            <span class="nav-text">Практические</span>
          </a>
        </li>
        <li class="menu-item">
          <a class="menu-link" href="lecture.html">
            <i class="fal fa-book"></i>
            <span class="nav-text">Лекции</span>
          </a>
        </li>
        <li class="menu-item">
          <a class="menu-link" href="presentation.html">
            <i class="fal fa-presentation"></i>
            <span class="nav-text">Презентации</span>
          </a>
        </li>
      </ul>

      <ul class="logout">
        <li class="menu-item">
          <span class="menu-link-non support">
            <i class="far fa-question-circle"></i>
            <span class="nav-text">Справка</span>
          </span>
        </li>
        <li class="menu-item">
          <a class="menu-link exit">
            <i class="fal fa-sign-out"></i>
            <span class="nav-text">Выход</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "NavAside"
};
</script>

<style scoped></style>
