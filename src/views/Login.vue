<template>
  <div
    id="login"
    class="grid-login bg--orange-gradient"
  >
    <div class="card rad-1 login-card">
      <div class="card-media">
        <div class="image">
          <img
            :src="require('../assets/image/login-image.jpg')"
            alt="Login please"
          >
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
        <student-form-card @showform="showForm" />
        <repair-form-card @showform="showForm" />
        <register-form-card @showform="showForm" />
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
import StudentFormCard from '../components/Cards/LoginFormCard';
import TeacherFormCard from '../components/Cards/TeacherFormCard';
import RepairFormCard from '../components/Cards/RepairFormCard';
import RegisterFormCard from '../components/Cards/RegisterFormCard';


export default {
  name: 'Login',
  components: {
    RegisterFormCard, RepairFormCard, StudentFormCard,
  },
  data() {
    return {
      activeForm: '.loginForm',
      openRegisterBtn: true,
    };
  },
  created() {
    if (this.$store.getters.isUserAuth) {
      // eslint-disable-next-line default-case
      switch (this.$store.getters.currentUser.role) {
        case 'Student':
          this.$router.push('/user');
          break;
        case 'Teacher':
          this.$router.push('/admin');
          break;
      }
    }
  },
  methods: {
    showForm(closeForm, openForm) {
      this.openRegisterBtn = openForm !== '.registerForm';
      this.activeForm = openForm;
      const forms = anime.timeline({
        duration: 750,
        easing: 'easeInOutBack',
      });
      forms.add({
        targets: closeForm,
        translateX: '150%',
        complete: () => {
          document.querySelector(openForm).style.display = 'flex';
          document.querySelector(closeForm).style.display = 'none';
        },
      }).add({
        targets: openForm,
        translateX: ['150%', '0%'],
      });
    },
  },
};
</script>
