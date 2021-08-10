import './imports'

import Header from '../components/Header'
import NavBar from '../components/NavBar'
import { NEWS_TYPE } from '../data'

import services from '../services'

;((doc) => {
  const oApp = doc.querySelector('#app')

  const config = {
    type: 'top',
    count: 10
  }

  const newsData = {}

  const init = async () => {
    render()
    // 渲染完执行bindEvent()才不会出错
    await setNewsList()
    bindEvent()
  }

  function bindEvent() {
    NavBar.bindEvent(setType)
  }

  function render() {
    const headerTpl = Header.tpl({
      url: '/',
      title: '新闻头条',
      showLeftIcon: false,
      showRightIcon: true
    })

    const navBarTpl = NavBar.tpl(NEWS_TYPE)

    oApp.innerHTML += (headerTpl + navBarTpl)
  }

  async function setNewsList() {
    const { type, count } = config

    if (newsData[type]) {
      return
    }

    newsData[type] = await services.getNewsList(type, count)
    console.log(newsData)
  }

  // NavBar.bindEvent的回调函数
  function setType(type) {
    config.type = type
    console.log(config.type)
  }

  init()
})(document)