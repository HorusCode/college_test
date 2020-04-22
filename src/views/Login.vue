<template>
  <div id="login" class="grid-login bg--orange-gradient">
    <div class="card rad-1 login-card">
      <div class="card-media">
        <div class="image">
          <img :src="require('../assets/image/login-image.jpg')" alt="Login please" />
        </div>
      </div>
      <div class="card-content">
        <header class="card-header">
          <h1 class="text-title text-primary">
            College Test
          </h1>
          <h3 class="text-subtitle">
            Система тестирования студентов
          </h3>
        </header>
        <LoginFormCard @showform="showForm" />
        <CodeFormCard @showform="showForm" />
        <EmailFormCard @showform="showForm" />
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
import LoginFormCard from '../components/Cards/LoginFormCard';
import EmailFormCard from '../components/Cards/EmailFormCard';
import CodeFormCard from '../components/Cards/CodeFormCard';

export default {
  name: 'Login',
  components: {
    CodeFormCard,
    EmailFormCard,
    LoginFormCard,
  },
  data() {
    return {
      activeForm: '.loginForm',
      openRegisterBtn: true,
    };
  },
  computed: {
    isUserAuth() {
      return this.$store.getters.isUserAuth;
    },
  },
  methods: {
    showForm(closeForm, openForm) {
      this.openRegisterBtn = openForm !== '.registerForm';
      this.activeForm = openForm;
      const forms = anime.timeline({
        duration: 750,
        easing: 'easeInOutBack',
      });
      forms
        .add({
          targets: closeForm,
          translateX: '150%',
          complete: () => {
            document.querySelector(openForm).style.display = 'flex';
            document.querySelector(closeForm).style.display = 'none';
          },
        })
        .add({
          targets: openForm,
          translateX: ['150%', '0%'],
        });
    },
  },
};
</script>
