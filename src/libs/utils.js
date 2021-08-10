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

export {
  tplReplace,
  scrollToTop,
  setPageData
}