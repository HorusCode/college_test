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
        <button class="btn btn-danger size-1" @click="removeFiles">
          <i class="mdi mdi-file-remove" />
          Очистить
        </button>
        <button class="btn btn-secondary size-1 width-2" @click="loadFile">
          <i class="mdi mdi-file" />
          Загрузить
        </button>
        <table class="rwd-table">
          <tr>
            <th>Имя файла</th>
            <th>Действия</th>
          </tr>
          <tr v-for="(file, index) in files" :key="index">
            <td>{{ file.name }}</td>
            <td>
              <button
                class="btn btn-danger is-small width-1 m-0"
                @click="deleteFile(file.dir, index)"
              >
                Удалить
              </button>
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

const { shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { dialog } = require('electron').remote;
const { ncp } = require('ncp');

export default {
  name: 'Presentation',
  components: {
    NavAside,
  },
  data() {
    return {
      files: [],
      fileDir: '',
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
    this.fileDir = path.join(this.$path, '/ppt');
    if (!fs.existsSync(this.fileDir)) {
      fs.mkdirSync(this.fileDir);
    }
  },
  methods: {
    removeFiles() {
      this.files = [];
      fs.readdir(this.fileDir, (err, files) => {
        files.forEach(file => {
          fs.unlink(this.fileDir + file, () => {});
        });
      });
    },
    openFile(dir) {
      shell.openItem(dir);
    },
    deleteFile(dir, i) {
      fs.unlink(dir, () => {});
      this.files.splice(i, 1);
    },
    loadFile() {
      dialog.showOpenDialog(
        {
          title: 'Выбрать файлы',
          filters: [{ name: 'PowerPoint', extensions: ['ppt', 'pptx'] }],
          properties: ['multiSelections'],
        },
        folderPaths => {
          if (folderPaths === undefined) {
            return false;
          }
          folderPaths.forEach((value, i) => {
            const dirArr = value.split('\\');
            const fileName = dirArr[dirArr.length - 1];
            ncp(value.toString(), this.fileDir + fileName, err => {
              if (i === folderPaths.length - 1) {
                dialog.showMessageBox({
                  type: 'info',
                  title: 'Успех',
                  message: 'Файл успешно перемещён!',
                });
              }
            });
            this.files.push({
              name: fileName,
              dir: this.fileDir + fileName,
            });
          });
        }
      );
    },
  },
};
</script>
