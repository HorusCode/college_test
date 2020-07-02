export const writeword = function(editor) {
  editor.ui.registry.addIcon(
    'textbox',
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" 
          id="mdi-form-textbox" width="24" height="24" viewBox="0 0 24 24">
             <path d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20Z"/>
     </svg>`,
  );

  editor.ui.registry.addToggleButton('inputButton', {
    icon: 'textbox',
    tooltip: 'Пропущенное слово',
    onAction: function(api) {
      let span = editor.selection.getNode(),
        $ = window.tinymce.dom.DomQuery;
      console.log($(span).find('.word').exist());
      if (span.className !== 'word') {
        editor.insertContent('<span class="word">' + editor.selection.getContent() + '</span>');
      }

      if (api.isActive()) {
        let text = span.textContent;
        span.remove();
        editor.insertContent(text);
      }
    },
    onSetup: function(api) {
      const editorEventCallback = function(eventApi) {
        api.setActive(eventApi.element.nodeName.toLowerCase() === 'span');
      };
      editor.on('NodeChange', editorEventCallback);
      return function(api) {
        editor.off('NodeChange', editorEventCallback);
      };
    },
  });
};
