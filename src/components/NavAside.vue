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
          </router-link>
        </li>
      </ul>
    </div>
    <footer class="sidebar__footer d-flex justify-content-center align-items-center">
      <button id="logout" class="btn btn-primary is-extended" @click="exit">
        <i class="mdi mdi-logout" />
        <span>Выход</span>
      </button>
    </footer>
  </aside>
</template>

<script>
import { Role } from '@/helpers/role';
import { mapState } from 'vuex';

export default {
  name: 'NavAside',
  data() {
    return {
      routerLinks: {
        admin: [
          {
            path: '/admin',
            title: 'Результаты',
            class: 'mdi-chart-bar',
          },
          {
            path: '/admin/test',
            title: 'Тесты',
            class: 'mdi-test-tube-empty',
          },
          {
            path: '/admin/groups',
            title: 'Группы',
            class: 'mdi-account-group-outline',
          },
          {
            path: '/admin/practices',
            title: 'Практические',
            class: 'mdi-file-document-box-outline',
          },
          {
            path: '/admin/lectures',
            title: 'Лекции',
            class: 'mdi-file-cabinet',
          },
          {
            path: '/admin/presentation',
            title: 'Презентации',
            class: 'mdi-file-powerpoint-outline',
          },
        ],
        user: [
          {
            path: '/user',
            title: 'Тестирование',
            class: 'mdi-test-tube',
          },
          {
            path: '/user/results',
            title: 'Мои результаты',
            class: 'mdi-chart-bar',
          },
          {
            path: '/user/practices',
            title: 'Практические',
            class: 'mdi-file-document-box-outline',
          },
          {
            path: '/user/lectures',
            title: 'Лекции',
            class: 'mdi-file-cabinet',
          },
          {
            path: '/user/presentation',
            title: 'Презентации',
            class: 'mdi-file-powerpoint-outline',
          },
        ],
      },
      activeLinks: [],
    };
  },
  computed: {
    ...mapState({
      role: state => state.userModule.role,
    }),
  },
  watch: {
    role(newValue) {
      if (newValue) {
        this.setLinks();
      }
    },
  },
  created() {
    this.setLinks();
  },
  methods: {
    exit() {
      this.$store.dispatch('logOut').then(() => {
        this.$router.push('/');
      });
    },
    setLinks() {
      const role = this.role;
      if (role === '') return false;
      const type = Object.keys(Role).find(key => Role[key] === role);
      this.activeLinks = this.routerLinks[type.toLowerCase()];
    },
  },
};
</script>

<style scoped></style>
