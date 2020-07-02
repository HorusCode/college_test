<template>
  <div class="modal full-page">
    <div class="modal__card">
      <div class="modal__header">
        <h2 class="text-title">
          Создание теста
        </h2>
        <i class="mdi mdi-plus pos-right mdi-rotate-45 mdi-36px close" @click="closeModal" />
      </div>
      <div class="modal__content wrapper">
        <div class="card vertical mb-1">
          <header class="card-header">
            <h3 class="text-title">
              {{ test.title }}
            </h3>
          </header>
          <div class="card-content flex-row justify-content-between">
            <div class="input-line">
              <label class="input-label">Название теста</label>
              <input v-model="test.title" type="text" class="input" />
            </div>
            <div class="input-line">
              <label class="input-label">Время прохождения</label>
              <input v-model="test.time" v-mask="timemask" type="text" class="input" />
            </div>
          </div>
        </div>

        <div
          v-for="(question, index) in test.questions"
          :key="`question-${index}`"
          class="card vertical mb-1"
        >
          <header class="card-header">
            <h3 class="text-title">Вопрос №{{ index + 1 }}</h3>
            <i
              class="mdi mdi-plus pos-right mdi-rotate-45 mdi-36px"
              @click="deleteQuestion(index)"
            />
          </header>
          <div class="card-content">
            <editor
              v-model="question.name"
              api-key="mohavi6jwno1pmy1mk56zqri2l8vqihfl82mt4u4v1yhytee"
              :init="editorConfig"
            />
            <div class="answers">
              <div
                v-for="(answer, i) in question.answers"
                :key="`answer-${i}`"
                class="d-flex align-items-center"
              >
                <input
                  v-if="typeClass(question.type) === 'radio'"
                  :id="`radio-${index}-${i}`"
                  v-model="answer.answer"
                  value="true"
                  class="radio-custom"
                  type="radio"
                  :name="`radio-${index}`"
                  @click="changeRadioButton(index), (answer.answer = !$event.target.checked)"
                />
                <input
                  v-else-if="typeClass(question.type) === 'checkbox'"
                  :id="`checkbox-${index}-${i}`"
                  v-model="answer.answer"
                  class="checkbox-custom"
                  type="checkbox"
                  :name="`checkbox-${index}`"
                />
                <label
                  :for="`${typeClass(question.type)}-${index}-${i}`"
                  :class="typeClass(question.type) + '-custom-label'"
                >
                  верный
                </label>
                <div class="input-line">
                  <div class="input-group">
                    <input
                      v-model="answer.text"
                      class="input default transparent square"
                      type="text"
                      required
                    />
                    <i
                      class="mdi pos-right mdi-plus mdi-rotate-45 c-pointer"
                      @click="deleteAnswer(index, i)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-secondary size-1" @click="addAnswer(index)">
              Добавить ответ
            </button>
          </div>
          <div class="card vertical child-left">
            <header class="card-header">
              <h3>Тип вопроса</h3>
            </header>
            <div class="card-content">
              <div v-for="(type, key) in types" :key="key" class="mb-1">
                <input
                  :id="`${key}-${index}`"
                  v-model="question.type"
                  type="radio"
                  class="radio-custom"
                  :name="'keys-' + index"
                  :value="key"
                  @click="changeRadioButton(index)"
                />
                <label :for="`${key}-${index}`" class="radio-custom-label">
                  {{ type.title }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="card vertical mb-1">
          <header class="card-header d-flex justify-content-around">
            <button class="btn btn-secondary rounded" @click="addQuestion">
              Добавить вопрос
            </button>
            <button class="btn btn-primary rounded" @click="saveTest">
              Сохранить
            </button>
          </header>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';
import Editor from '@tinymce/tinymce-vue';
import editorConfig from '@/helpers/tinyMCE';

export default {
  name: 'ModalCreateTest',
  directives: { mask },
  components: {
    editor: Editor,
  },
  props: ['anim', 'updatingTest'],
  data() {
    return {
      modal: null,
      editorConfig,
      mode: 'create',
      timemask: {
        mask: 'A#:B#:B#',
        tokens: {
          A: { pattern: /[0-2]/ },
          B: { pattern: /[0-6]/ },
          '#': { pattern: /[0-9]/ },
        },
      },
      types: {
        multichoice: {
          class: 'checkbox',
          title: 'Множественный выбор',
        },
        singlechoice: {
          class: 'radio',
          title: 'Одиночный выбор',
        },
        missingword: {
          class: 'checkbox',
          title: 'Пропущенное слово',
        },
      },
      test: {
        title: '',
        time: '00:15:00',
        questions: [
          {
            name: '',
            type: 'multichoice', // multichoice, singlechoice, missingword
            answers: [
              {
                text: '',
                answer: false,
              },
            ],
          },
          {
            name: '',
            type: 'singlechoice', // multichoice, singlechoice, missingword
            answers: [
              {
                text: '',
                answer: false,
              },
              {
                text: '',
                answer: true,
              },
              {
                text: '',
                answer: false,
              },
              {
                text: '',
                answer: false,
              },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    if (Object.keys(this.updatingTest).length !== 0) {
      this.test = JSON.parse(JSON.stringify(this.updatingTest));
      this.mode = 'update';
    } else {
      this.mode = 'create';
    }
    this.modal = document.querySelector('.modal');
    this.modal.classList.remove('out');
    this.modal.classList.add(`${this.anim}`);
  },
  methods: {
    closeModal() {
      this.modal.classList.add('out');
      this.modal.addEventListener(
        'animationend',
        () => {
          this.$emit('close');
        },
        false,
      );
    },
    changeRadioButton(q) {
      this.test.questions[q].answers.forEach(value => {
        value.answer = false;
      });
    },
    typeClass(type) {
      return this.types[type].class;
    },
    addQuestion() {
      this.test.questions.push({
        name: '',
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
        text: '',
        answer: false,
      });
    },
    deleteAnswer(questionInd, answerInd) {
      this.test.questions[questionInd].answers.splice(answerInd, 1);
    },
    deleteQuestion(questionInd) {
      this.test.questions.splice(questionInd, 1);
    },
    saveTest() {
      switch (this.mode) {
        case 'create':
          this.$store.dispatch('createTest', this.test).then(() => {
            this.closeModal();
          });
          break;
        case 'update':
          this.$store.dispatch('updateTest', this.test).then(() => {
            this.closeModal();
          });
          break;
      }
    },
  },
};
</script>

<style lang="scss">
.checkbox .input-effect {
  margin: 0;
}

.mdi-plus {
  cursor: pointer;
}

.tox-tinymce {
  margin-bottom: 1rem;
}
</style>
