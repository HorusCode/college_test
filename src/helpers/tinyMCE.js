import Api from '@/helpers/api';
import { writeword } from '@/plugins/writeword.tinymce';

let editorConfig = {
  height: 500,
  language: 'ru',
  plugins: 'codesample image link lists media print table code writeword importcss',
  menubar: false,
  body_class: 'mb-1',
  content_css: '/app.css',
  toolbar:
    'undo redo | bold italic underline strikethrough | ' +
    'fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | ' +
    'outdent indent | numlist bullist | forecolor backcolor removeformat | codesample image link media print code table inputButton',
  toolbar_mode: 'sliding',
  setup: function() {
    window.tinymce.PluginManager.add('writeword', writeword);
  },
  images_upload_handler: function(blobInfo, success, failure) {
    const formData = new FormData();
    formData.append('files[]', blobInfo.blob());
    formData.append('path', 'uploaded');
    formData.append('disk', 'public');
    formData.append('overwrite', 0);
    Api.post('http://192.168.1.200/file-manager/upload', formData)
      .then(response => {
        success(response.data.result.url);
      })
      .catch(error => {
        failure(error.data);
      });
  },
  file_picker_callback(callback) {
    const x =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.getElementsByTagName('body')[0].clientWidth;
    const y =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.getElementsByTagName('body')[0].clientHeight;
    window.tinymce.activeEditor.windowManager.openUrl({
      url: 'http://192.168.1.200/file-manager/tinymce5',
      title: 'Laravel File manager',
      width: x * 0.8,
      height: y * 0.9,
    });
    window.addEventListener('message', function(e) {
      if (e.data.mceAction === 'insertContent') {
        callback(e.data.content, { text: e.data.text });
      }
    });
  },
};

export default editorConfig;
