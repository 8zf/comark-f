<template>
    <div>
        <div class="editor_preview container">
            <!--编辑器-->
            <div>
                <textarea name="" id="editor" cols="30" rows="10" class="editor">nothing here</textarea>
            </div>
            <!--预览-->
            <div>
                <article id="preview" class="preview" v-html="previewHTML">faq</article>
            </div>
        </div>
    </div>
</template>

<script>
  import CodeMirror from 'codemirror'
  import markdownIt from 'markdown-it'
  import markdownItSourceMap from 'markdown-it-source-map'
  import $ from 'jquery'
  import _ from 'lodash'
  import sync_scroll from '../lib/sync_scroll'
  import 'codemirror/mode/markdown/markdown'
  import './../lib/codemirror.css'
  export default {
    data() {
      return {
        param: "nope",
        editor: {},
        previewHTML: ''
      }
    },
    mounted() {
      this.editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
        lineNumbers: true,
        lineWrapping: true,
        mode: "markdown"
      });
//      检测改变重新渲染
      this.editor.on('change', _.debounce(() => {
        this.renderPreview();
      }, 200));
//      编辑器滚动时触发滚动同步
      this.editor.on('scroll', _.debounce(() => {
        console.log("scroll");
        sync_scroll.syncPreviewByEditor(this.editor, this.previewHTML);
      }, 200));
//      预览滚动时触发同步
      $("#preview").scroll(_.debounce(() => {
        console.log("preview html: " + "nope");
      }, 200));
      this.renderPreview();
    },
    methods: {
      renderPreview() {
        let md = markdownIt().use(markdownItSourceMap);
//        document.getElementById("editor").innerHTML = md.render(this.editor.getValue());
//        console.log(md.render(this.editor.getValue()));
        this.previewHTML = md.render(this.editor.getValue());
      }
    }

  }
</script>

<style>
    .editor_preview {
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        border-width: 5px;
        border-color: black;
    }

    .preview {
        width: 600px;
        height: 600px;
        overflow-y: scroll;

    }
</style>