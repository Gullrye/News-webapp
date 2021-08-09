function tplReplace(template, templateObject) {
  return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
    return templateObject[key.trim()]
  })
}

export {
  tplReplace
}