import CodeMirror from 'codemirror'

//  位置{}

function sync(cm, html) {
  let editor_scroll = cm.getScrollInfo();
  console.log(editor_scroll);
}

function syncEditorByPreview(cm, html) {
  let editor_scroll = cm.getScrollInfo();
  console.log(editor_scroll);
  setEditorPos(getPreviewPos());
}

function syncPreviewByEditor() {
  setPreviewPos(getEditorPos());
}

function getEditorPos() {

}

function getPreviewPos() {

}

function setEditorPos() {

}

function setPreviewPos() {

}

export default {
  sync: sync,
  syncPreviewByEditor: syncPreviewByEditor,
  syncEditorByPreview: syncEditorByPreview
}

