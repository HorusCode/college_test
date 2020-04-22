import Api from '@/helpers/api';

let editorConfig = {
  height: 500,
  language: 'ru',
  plugins: 'codesample image link lists media print table code',
  menubar: false,
  body_class: 'mb-1',
  toolbar:
    'undo redo | bold italic underline strikethrough | ' +
    'fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | ' +
    'outdent indent | numlist bullist | forecolor backcolor removeformat | codesample image link media print code table selectiveDateButton',
  toolbar_mode: 'sliding',
  setup: editor => {
    editor.ui.registry.addButton('selectiveDateButton', {
      icon: 'insert-time',
      tooltip: 'Insert Current Date',
      disabled: true,
      onAction: function(_) {
        editor.insertContent("<input type='text' />");
      },
      onSetup: function(buttonApi) {
        const editorEventCallback = function(eventApi) {
          buttonApi.setDisabled(eventApi.element.nodeName.toLowerCase() === 'input');
        };
        editor.on('NodeChange', editorEventCallback);
        return function(buttonApi) {
          editor.off('NodeChange', editorEventCallback);
        };
      },
    });
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
