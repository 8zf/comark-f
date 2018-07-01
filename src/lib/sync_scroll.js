import CodeMirror from 'codemirror'
import $ from 'jquery'
//  位置{}

const sync = (cm, html) => {
  let editor_scroll = cm.getScrollInfo();
  console.log(editor_scroll)
}

const syncEditorByPreview = (cm, html) => {
  let editor_scroll = cm.getScrollInfo();
  console.log(editor_scroll)
  setEditorPos(getPreviewPos())
}

const syncPreviewByEditor = (editorScroll) => {
  let {lastMarker, nextMarker, percentage} =editorScroll
  let lastPosition = 0
  let nextPosition = 0
  //let nextPosition = $('article#preview').height() - $('.ui-layout-east').height() // maximum scroll
  if (editorScroll.lastMarker) { // no marker at very start
    lastPosition = $('article#preview').find('>[data-source-line="' + editorScroll.lastMarker + '"]').get(0).offsetTop
  }
  if (editorScroll.nextMarker) { // no marker at very end
    nextPosition = $('article#preview').find('>[data-source-line="' + editorScroll.nextMarker + '"]').get(0).offsetTop
  }
  console.log(lastPosition);
  console.log(nextPosition);
  const scrollTop = lastPosition + (nextPosition - lastPosition) * editorScroll.percentage // right scroll according to left percentage
  console.log(scrollTop);
  //scrollRight(scrollTop)
}

function getPreviewPos() {

}

function setEditorPos() {

}

function setPreviewPos() {

}

const getEditorScroll = (editor) => {
  //获取所有源数据行的dom元素
  const lineMarkers = $('article#preview > [data-source-line]')
  const lines = []
  lineMarkers.each((index, element) => {
    //将data-source-line的值依次存为数组，因为这些值不一定为连续的
    lines.push($(element).data('source-line'))
  })
  //获取编辑器的滚动top
  const currentPosition = editor.getScrollInfo().top
  let lastMarker
  let nextMarker
  //遍历line数组
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const height = editor.heightAtLine(line - 1, 'local')
    if (height < currentPosition) {
      lastMarker = line
    } else {
      nextMarker = line
      break
    }
  }
  let percentage = 0
  if (lastMarker && nextMarker && lastMarker !== nextMarker) {
    percentage = (currentPosition - editor.heightAtLine(lastMarker - 1, 'local')) / (editor.heightAtLine(nextMarker - 1, 'local') - editor.heightAtLine(lastMarker - 1, 'local'))
  }
  // returns two neighboring markers' lines, and current scroll percentage between two markers
  //console.log("height of last marker: " + editor.heightAtLine(lastMarker, 'local'));
  //console.log("height of next marker: " + editor.heightAtLine(nextMarker, 'local'));
  return { lastMarker: lastMarker, nextMarker: nextMarker, percentage }
}

const scrollSide = (side, howToScroll) => {
  if (scrollingSide !== null && scrollingSide !== side) {
    return // the other side hasn't finished scrolling
  }
  scrollingSide = side
  clearTimeout(timeoutHandle)
  timeoutHandle = setTimeout(() => { scrollingSide = null }, 512)
  howToScroll()
}

const scrollLeft = (scrollTop) => {
  scrollSide('left', () => {
    const current = editor.getScrollInfo().top
    const step = (scrollTop - current) / 8
    for (let i = 1; i < 8; i++) { // to create some animation
      scrollEditor(current + step * i, 128 / 8 * i)
    }
    scrollEditor(scrollTop, 128)
  })
}

const scrollRight = (scrollTop) => {
  scrollSide('right', () => {
    $('.ui-layout-east').animate({ scrollTop: scrollTop }, 128)
  })
}

export default {
  sync: sync,
  syncPreviewByEditor: syncPreviewByEditor,
  syncEditorByPreview: syncEditorByPreview,
  getEditorScroll: getEditorScroll
}

