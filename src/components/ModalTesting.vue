<template>
  <div class="modal">
    <div class="modal-container full-page">
      <div class="modal__card">
        <div class="modal__header">
          <h2 class="text-title">
            Решение теста
          </h2>
          <i
            class="mdi mdi-plus pos-right mdi-rotate-45 mdi-36px close"
            @click="closeModal"
          />
        </div>
        <div class="modal__content wrapper">
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
              <textarea
                v-model="questions.name"
                class="txt-full"
                rows="4"
                placeholder="Вопрос..."
              />
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
                  >
                  <label
                    :for="`checkbox-${index}-${i}`"
                    class="checkbox-custom-label"
                  >верный</label>
                  <div class="input-effect">
                    <input
                      v-model="answer.text"
                      class="effect"
                      type="text"
                      required
                    >
                    <label>Ответ</label>
                    <span class="focus-border" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card vertical mb-1">
            <header class="card-header d-flex justify-content-around">
              <button
                class="btn btn-primary rounded"
                @click="calcAnswers"
              >
                Завершить
              </button>
            </header>
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
      scoreStudent: '2',
      score: 0,
      totalTrueAnswers: 0,
      totalPercent: 0,
    };
  },
  mounted() {
    this.modal = document.querySelector('.modal');
    this.modal.classList.remove('out');
    this.modal.classList.add(`${this.anim}`);
  },
  methods: {
    closeModal() {
      this.modal.classList.add('out');
      this.modal.addEventListener('animationend', () => {
        this.$emit('close');
      }, false);
    },

    // TODO: Delete and rewrite AALLL calc code :(
    calcAnswers() {
      const questionCount = this.test.questions.length;
      for (let i = 0; i < questionCount; i += 1) {
        const totalCheckedInBox = document.querySelectorAll(`.card[data-id="${i}"] .checkbox-custom:checked`);
        let scoreIncrement = 0;
        totalCheckedInBox.forEach((item) => {
          const elVal = parseInt(item.value);
          if (elVal === 0) {
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
    },
    calcTotalTrueAnswers() {
      document.querySelectorAll('.checkbox-custom:checked')
        .forEach((item) => {
          const elVal = parseInt(item.value);
          if (elVal === 1) {
            this.totalTrueAnswers += 1;
          }
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
        student: localStorage.getItem('name'),
        group: localStorage.getItem('group'),
        result: this.scoreStudent,
        time: '123',
        date: (new Date()).toString().split(' ').splice(1, 4)
          .join(' '),
        test: this.test.title,
      };
      this.$store.dispatch('createResult', data);
    },
    saveTest() {
      // eslint-disable-next-line default-case
      switch (this.mode) {
        case 'create':
          this.$store.dispatch('createTest', this.test);
          break;
        case 'update':
          this.$store.dispatch('updateTest', { oldTest: this.updatingTest, newTest: this.test });
          break;
      }
    },
  },
};
</script>

<style scoped>
    .checkbox .input-effect {
        margin: 0;
    }
</style>
