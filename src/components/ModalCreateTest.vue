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
              <div v-for="(answer, i) in question.answers" :key="`answer-${i}`" class="checkbox">
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
import Api from "@/helpers/api";
import { mask } from "vue-the-mask";
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "ModalCreateTest",
  directives: { mask },
  components: {
    editor: Editor,
  },
  props: ["anim", "updatingTest"],
  data() {
    return {
      modal: null,
      mode: "create",
      editorConfig: {
        height: 500,
        language: "ru",
        plugins: "codesample image link lists media print table",
        menubar: false,
        toolbar:
          "undo redo | bold italic underline strikethrough | " +
          "fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | " +
          "outdent indent | numlist bullist | forecolor backcolor removeformat | codesample image link media print ",
        table_toolbar:
          "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
        toolbar_mode: "sliding",
        images_upload_handler: function(blobInfo, success, failure) {
          let formData = new FormData();
          formData.append("files[]", blobInfo.blob());
          formData.append("path", "uploaded");
          formData.append("disk", "public");
          formData.append("overwrite", 0);
          Api.post("http://192.168.1.200/file-manager/upload", formData)
            .then(response => {
              success(response.data.result.url);
            })
            .catch(error => {
              failure(error.data)
            });
        },
        file_picker_callback(callback) {
          let x =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.getElementsByTagName("body")[0].clientWidth;
          let y =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.getElementsByTagName("body")[0].clientHeight;
          window.tinymce.activeEditor.windowManager.openUrl({
            url: "http://192.168.1.200/file-manager/tinymce5",
            title: "Laravel File manager",
            width: x * 0.8,
            height: y * 0.9,
          });
          window.addEventListener("message", function(e) {
            if (e.data.mceAction === "insertContent") {
              callback(e.data.content, { text: e.data.text });
            }
          });
        },
      },
      timemask: {
        mask: "A#:B#:B#",
        tokens: {
          A: { pattern: /[0-2]/ },
          B: { pattern: /[0-6]/ },
          "#": { pattern: /[0-9]/ },
        },
      },
      test: {
        title: "",
        time: "00:15:00",
        questions: [
          {
            name: "",
            answers: [
              {
                text: "",
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
        name: "",
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
        text: "",
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
  },
};
</script>

<style scoped>
.checkbox .input-effect {
  margin: 0;
}
.mdi-plus {
  cursor: pointer;
}
</style>
