<template>
  <div class="modal full-page">
    <div class="modal__card">
      <div class="modal__header">
        <h2 class="text-title">Создание теста</h2>
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
          v-for="(questions, index) in test.questions"
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
            <VueEditor
              v-model="questions.name"
              class="mb-1"
              use-custom-image-handler
              @image-added="uploadImage"
              @image-removed="removeImage"
            ></VueEditor>
            <div class="answers">
              <div v-for="(answer, i) in questions.answers" :key="`answer-${i}`" class="checkbox">
                <input
                  :id="`checkbox-${index}-${i}`"
                  v-model="answer.answer"
                  class="checkbox-custom"
                  type="checkbox"
                />
                <label :for="`checkbox-${index}-${i}`" class="checkbox-custom-label">верный</label>
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
import { VueEditor } from "vue2-editor";
import Api from "@/helpers/api";
import { mask } from "vue-the-mask";

export default {
  name: "ModalCreateTest",
  components: { VueEditor },
  directives: { mask },
  props: ["anim", "updatingTest"],
  data() {
    return {
      modal: null,
      mode: "create",
      timemask: {
        mask: "A#:B#:B#",
        tokens: {
          A: { pattern: /[0-2]/ },
          B: { pattern: /[0-6]/ },
          "#": { pattern: /[0-9]/ },
        },
      },
      test: {
        title: "Название теста",
        time: "00:15:00",
        questions: [
          {
            name: "Вопрос",
            answers: [
              {
                text: "Answer Text1",
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
      this.mode = "update";
    } else {
      this.mode = "create";
    }
    this.modal = document.querySelector(".modal");
    this.modal.classList.remove("out");
    this.modal.classList.add(`${this.anim}`);
  },
  methods: {
    closeModal() {
      this.modal.classList.add("out");
      this.modal.addEventListener(
        "animationend",
        () => {
          this.$emit("close");
        },
        false,
      );
    },
    addQuestion() {
      this.test.questions.push({
        name: "Question Answer",
        answers: [
          {
            text: "",
            answer: false,
          },
        ],
      });
    },
    addAnswer(i) {
      this.test.questions[i].answers.push({
        text: "Answer Text1",
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
      // eslint-disable-next-line default-case
      switch (this.mode) {
        case "create":
          this.$store.dispatch("createTest", this.test).then(() => {
            this.closeModal();
          });
          break;
        case "update":
          this.$store.dispatch("updateTest", this.test).then(() => {
            this.closeModal();
          });
          break;
      }
    },
    uploadImage: function(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append("files[]", file);
      Api.post("/upload/image", formData)
        .then(result => {
          let url = result.data.data[0];
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeImage: function(file) {
      let name = file.split("/").pop();
      Api.delete("/delete/testing/" + name);
    },
  },
};
</script>

<style scoped>
.checkbox .input-effect {
  margin: 0;
}
</style>
