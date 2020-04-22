<template>
  <div class="grid-main">
    <NavAside />
    <main class="content">
      <header class="content__header">
        <h2 class="text-title">
          Лекции
        </h2>
      </header>
      <div class="content__body">
        <table class="rwd-table">
          <tr>
            <th>Имя файла</th>
            <th>Действия</th>
          </tr>
          <tr v-for="(file, index) in files" :key="index">
            <td>{{ file.name }}</td>
            <td>
              <button class="btn btn-primary is-small width-1 m-0" @click="openFile(file.dir)">
                Открыть
              </button>
            </td>
          </tr>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
import NavAside from '../../components/NavAside';

const fs = require('fs');
const { shell } = require('electron');
const path = require('path');

export default {
  name: 'Lectures',
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
  mounted() {
    fs.readdir(this.fileDir, (err, files) => {
      files.forEach(file => {
        this.files.push({
          name: file,
          dir: this.fileDir + file,
        });
      });
    });
  },
  created() {
    this.fileDir = path.join(this.$path, '/pdf');
  },
  methods: {
    openFile(dir) {
      shell.openItem(dir);
    },
  },
};
</script>
