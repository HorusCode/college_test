<template>
  <div class="modal full-page">
    <div class="modal__card">
      <div class="modal__header">
        <h2 class="text-title">
          Решение теста
        </h2>
        <i
          v-show="activeBtn"
          class="mdi mdi-plus pos-right mdi-rotate-45 mdi-36px close"
          @click="closeModal"
        />
      </div>
      <div class="modal__content grid-modal-testing">
        <div class="g-1_2">
          <div class="card vertical mb-1">
            <header class="card-header">
              <h3 class="text-title">
                {{ test.title }}
              </h3>
            </header>
          </div>
          <div
            v-for="(questions, index) in test.questions"
            :key="`question-${index}`"
            :data-id="index"
            class="card vertical mb-1"
          >
            <header class="card-header">
              <h3 class="text-title">
                Вопрос №{{ index + 1 }}
              </h3>
            </header>
            <div class="card-content">
              <div class="question-text">
                <p>
                  {{ questions.name }}
                </p>
              </div>
              <div
                class="answers"
              >
                <div
                  v-for="(answer, i) in questions.answers"
                  :key="`answer-${i}`"
                  class="checkbox"
                >
                  <input
                    :id="`checkbox-${index}-${i}`"
                    class="checkbox-custom"
                    type="checkbox"
                    :value="answer.answer"
                    :disabled="activeBtn"
                  >
                  <label
                    :for="`checkbox-${index}-${i}`"
                    class="checkbox-custom-label text-primary text-underline"
                  >{{ answer.text }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="card vertical mb-1">
            <header class="card-header d-flex justify-content-around">
              <button
                class="btn btn-primary rounded"
                :disabled="activeBtn"
                @click="calcAnswers"
              >
                Завершить
              </button>
            </header>
          </div>
        </div>
        <div class="g-1_2">
          <div class="card vertical mb-1">
            <header class="card-header">
              <h3 class="text-title">
                Статус
              </h3>
            </header>
          </div>
          <div class="card vertical mb-1">
            <div class="card-content">
              <ul class="vertical-list">
                <li class="vertical-list__heading">
                  Данные
                </li>
                <li class="vertical-list__item">
                  <span class="text-secondary text-subtitle ">ФИО:</span> {{ student }}
                </li>
                <li class="vertical-list__item">
                  <span class="text-secondary text-subtitle ">Группа:</span> {{ group }}
                </li>
                <li class="vertical-list__item">
                  <span class="text-secondary text-subtitle ">Время:</span>
                  <span class="font-bold"> {{ timer }}</span>
                </li>
                <li class="vertical-list__item">
                  <span class="text-green text-subtitle text-underline ">
                    Оценка: <span class="font-bold"> {{ scoreStudent }}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalTesting',
  props: ['anim', 'test'],
  data() {
    return {
      modal: null,
      scoreStudent: '',
      score: 0,
      totalTrueAnswers: 0,
      totalPercent: 0,
      timer: '00:00',
      activeBtn: false,
      interval: null,
      student: '',
      group: '',
    };
  },
  mounted() {
    this.modal = document.querySelector('.modal');
    this.modal.classList.remove('out');
    this.modal.classList.add(`${this.anim}`);
    this.student = localStorage.getItem('name');
    this.group = localStorage.getItem('group');
    this.countDown(15);
  },
  methods: {
    closeModal() {
      this.modal.classList.add('out');
      this.modal.addEventListener('animationend', () => {
        this.$emit('close');
      }, false);
      Object.assign(this.$data, {
        scoreStudent: '',
        score: 0,
        totalTrueAnswers: 0,
        totalPercent: 0,
        timer: '00:00',
        activeBtn: false,
      });
    },

    countDown(min) {
      let seconds = min * 60 + 1;
      this.interval = setInterval(() => {
        if (seconds > 0) {
          seconds -= 1;
          const h = seconds / 3600 ^ 0;
          const m = (seconds - h * 3600) / 60 ^ 0;
          const s = seconds - h * 3600 - m * 60;
          this.timer = `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
        } else {
          this.calcAnswers();
          clearInterval(this.interval);
        }
      }, 1000);
    },

    // TODO: Delete and rewrite AALLL calc code :(
    calcAnswers() {
      const questionCount = this.test.questions.length;
      for (let i = 0; i < questionCount; i += 1) {
        const totalCheckedInBox = document.querySelectorAll(`.card[data-id="${i}"] .checkbox-custom:checked`);
        let scoreIncrement = 0;
        totalCheckedInBox.forEach((item) => {
          const elVal = `${true}` === item.value;
          if (!elVal) {
            scoreIncrement = 0;
            return;
          }
          scoreIncrement += 1;
        });
        this.score += scoreIncrement;
      }
      this.calcTotalTrueAnswers();
      this.calcPercent();
      this.createResult();
      clearInterval(this.interval);
    },
    calcTotalTrueAnswers() {
      document.querySelectorAll(".checkbox-custom[value='true']").forEach(() => {
        this.totalTrueAnswers += 1;
      });
    },
    calcPercent() {
      this.totalPercent = this.score * 100 / this.totalTrueAnswers;
      switch (true) {
        case (this.totalPercent >= 85):
          this.scoreStudent = '5';
          break;
        case (this.totalPercent >= 75 && this.totalPercent < 85):
          this.scoreStudent = '4';
          break;
        case (this.totalPercent >= 60 && this.totalPercent < 75):
          this.scoreStudent = '3';
          break;
        default:
          this.scoreStudent = '2';
          break;
      }
    },
    createResult() {
      const data = {
        student: this.student,
        group: this.group,
        result: this.scoreStudent,
        time: this.timer,
        date: (new Date()).toString().split(' ').splice(1, 4)
          .join(' '),
        test: this.test.title,
      };
      this.$store.dispatch('createResult', data);
      this.activeBtn = true;
    },
  },
};
</script>

<style scoped>
    .checkbox .input-effect {
        margin: 0;
    }
</style>
