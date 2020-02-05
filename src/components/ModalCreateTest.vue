<template>
  <div class="modal">
    <div class="modal-container full-page">
      <div class="modal__card">
        <div class="modal__header">
          <h2 class="text-title">
            Создание теста
          </h2>
          <i class="mdi mdi-plus pos-right mdi-rotate-45 mdi-36px close"></i>
        </div>
        <div class="modal__content wrapper">
          <div class="card vertical mb-1">
            <header class="card-header">
              <h3 class="text-title">
                {{ test.title }}
              </h3>
            </header>
            <div class="card-content">
              <div class="input-effect">
                <input
                  v-model="test.title"
                  class="effect"
                  required
                >
                <span class="focus-border" />
                <label>Название теста</label>
              </div>
            </div>
          </div>
          <div
            v-for="(questions, index) in test.questions"
            :key="`question-${index}`"
            class="card vertical mb-1"
          >
            <header class="card-header">
              <h3 class="text-title">
                Вопрос №{{index + 1}}
              </h3>
              <i class="mdi mdi-plus pos-right mdi-rotate-45 mdi-36px"></i>
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
                    :id="`checkbox-${i}`"
                    v-model="answer.answer"
                    class="checkbox-custom"
                    type="checkbox"
                  >
                  <label
                    :for="`checkbox-${i}`"
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
                  <i
                    class="mdi mdi-plus deleteAnswer"
                    @click="deleteAnswer(index, i)"
                  />
                </div>
              </div>
              <button
                class="btn btn-secondary size-1"
                @click="addAnswer(index)"
              >
                Добавить ответ
              </button>
            </div>
          </div>
          <div class="card vertical mb-1">
            <header class="card-header d-flex justify-content-around">
              <button
                class="btn btn-secondary rounded"
                @click="addQuestion"
              >
                Добавить вопрос
              </button>
              <button class="btn btn-primary rounded">
                Сохранить
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
  name: 'ModalCreateTest',
  props: ['anim'],
  data() {
    return {
      modal: null,

      test:
        {
          title: 'Название теста',
          questions: [
            {
              name: 'Question Answer',

              answers: [
                {
                  text: 'Answer Text1',
                  answer: false,
                },
                {
                  text: 'Answer Text2',
                  answer: true,
                },
                {
                  text: 'Answer Text3',
                  answer: false,
                },
              ],

            },
          ],
        },

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
    addQuestion() {
      this.test.questions.push({
        name: 'Question Answer',
        answers: [
          {
            text: '',
            answer: false,
          },
        ],
      });
    },
    addAnswer(i) {
      this.test.questions[i].answers.push({
        text: 'Answer Text1',
        answer: false,
      });
    },
    deleteAnswer(questionInd, answerInd) {
      this.test.questions[questionInd].answers.splice(answerInd, 1);
    },
  },
};
</script>

<style scoped>
  .checkbox .input-effect {
    margin: 0;
  }
</style>
