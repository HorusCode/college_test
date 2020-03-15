<template>
  <aside class="sidebar">
    <header class="sidebar__header d-flex justify-content-between align-items-center">
      <div class="logo" />
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
          <router-link
            v-for="(link, index) in activeLinks"
            :key="index"
            class="link"
            :to="link.path"
            aria-expanded="true"
          >
            <span class="mdi pos-left-null" :class="link.class" />
            {{ link.title }}
            <!--<span class="mdi mdi-chevron-up pos-right-null" />-->
          </router-link>
          <!--<ul class="submenu">
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
                    </ul>-->
        </li>
      </ul>
    </div>
    <footer class="sidebar__footer d-flex justify-content-center align-items-center">
      <button class="btn btn-primary" @click="exit">
        Выход
      </button>
    </footer>
  </aside>
</template>

<script>
import { Role } from "@/helpers/role";

export default {
  name: "NavAside",
  data() {
    return {
      routerLinks: {
        admin: [
          {
            path: "/admin",
            title: "Результаты",
            class: "mdi-chart-bar",
          },
          {
            path: "/admin/test",
            title: "Тесты",
            class: "mdi-test-tube-empty",
          },
          {
            path: "/admin/practices",
            title: "Практические",
            class: "mdi-file-document-box-outline",
          },
          {
            path: "/admin/lectures",
            title: "Лекции",
            class: "mdi-file-cabinet",
          },
          {
            path: "/admin/presentation",
            title: "Презентации",
            class: "mdi-file-powerpoint-outline",
          },
        ],
        user: [
          {
            path: "/user",
            title: "Тестирование",
            class: "mdi-test-tube",
          },
          {
            path: "/user/results",
            title: "Мои результаты",
            class: "mdi-chart-bar",
          },
          {
            path: "/user/practices",
            title: "Практические",
            class: "mdi-file-document-box-outline",
          },
          {
            path: "/user/lectures",
            title: "Лекции",
            class: "mdi-file-cabinet",
          },
          {
            path: "/user/presentation",
            title: "Презентации",
            class: "mdi-file-powerpoint-outline",
          },
        ],
      },
      activeLinks: [],
    };
  },
  mounted() {
    const role = localStorage.getItem("role");
    const type = Object.keys(Role).find(key => Role[key] === role);
    this.activeLinks = this.routerLinks[type.toLowerCase()];
  },
  methods: {
    exit() {
      this.$store.dispatch("stateChanged");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
