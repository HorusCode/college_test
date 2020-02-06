<template>
  <div class="grid-main">
    <nav-aside />
    <main class="content">
      <header class="content__header">
        <h2 class="text-title">
          Выполнение тестов
        </h2>
      </header>
      <div class="content__body">
        <div class="select">
          <input
            type="checkbox"
            class="options-view-button"
          >
          <div class="select__button">
            <div class="selected__value">
              <span>{{ selectedFile }}</span>
            </div>
            <div class="chevrons">
              <i class="mdi mdi-chevron-up" />
              <i class="mdi mdi-chevron-down" />
            </div>
          </div>
          <div class="options">
            <div
              v-for="(filename, index) in files"
              :key="index"
              class="option"
            >
              <input
                class="option__radio"
                type="radio"
                @click="select(filename)"
              >
              <span class="label">{{ filename.split('.')[0] }}</span>
            </div>
          </div>
        </div>


        <button
          id="loadTest"
          class="btn btn-primary"
          :disabled="activeBtn"
          @click="openFile()"
        >
          Открыть
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import NavAside from '../../components/NavAside';

const fs = require('fs');
const ipc = require('electron').ipcRenderer;

export default {
  name: 'Presentation',
  components: {
    NavAside,
  },
  data() {
    return {
      files: [],
      selectedFile: '',
      file: '',
      activeBtn: true,
    };
  },
  created() {
    fs.readdir(`${__dirname}../../../word`, (err, files) => {
      this.files = files;
    });
  },
  methods: {
    select(filename) {
      this.file = filename;
      this.selectedFile = filename.split('.')[0];
      this.activeBtn = false;
    },
    openFile() {
      ipc.send('openNewWindow', `/word/${this.file}`);
    },
  },
};
</script>
