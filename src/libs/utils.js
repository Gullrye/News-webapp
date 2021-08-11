function tplReplace(template, templateObject) {
  // node是{{ xxx }}，key是 xxx ，template文件执行后渲染完成后才能进行replace
  return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
    return templateObject[key.trim()]
  })
}

function scrollToTop() {
  // 页面渲染后执行
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 0)
}

function setPageData(data, count) {
  const len = data.length

  let pageData = []
  let index = 0

  while (index < len) {
    pageData.push(data.slice(index, index += count))
  }

  return pageData
}

function scrollToBottom (callback) {
  if (_getScrollTop() + _getWindowHeight() === _getScrollHeight()) {
    callback()
  }
}

export {
  tplReplace,
  scrollToTop,
  setPageData,
  scrollToBottom
}

/*********** 内部方法 ************/
function _getScrollTop() {
  var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0
  if (document.body) {
    bodyScrollTop = document.body.scrollTop
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
  return scrollTop
}

function _getScrollHeight() {
  var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
  return scrollHeight
}

function _getWindowHeight() {
  var windowHeight = 0
  if (document.compatMode == "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight
  } else {
    windowHeight = document.body.clientHeight
  }
  return windowHeight
}