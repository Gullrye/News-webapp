import './imports'

import Header from '../components/Header'
import NavBar from '../components/NavBar'
import { NEWS_TYPE } from '../data'

import services from '../services'

import NewsList from '../components/NewsList'

;((doc) => {
  const oApp = doc.querySelector('#app')
  let oListWrapper = null

  const config = {
    type: 'top',
    count: 10,
    pageNum: 0
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
    const listWrapperTpl = NewsList.wrapperTpl(82)
    oApp.innerHTML += (headerTpl + navBarTpl + listWrapperTpl)
    oListWrapper = oApp.querySelector('.news-list')
  }

  function renderList(data) {
    const {pageNum} = config
    const NewsListTpl = NewsList.tpl({
      data,
      pageNum
    })
    oListWrapper.innerHTML += NewsListTpl
    NewsList.imgShow()
  }

  async function setNewsList() {
    const { type, count, pageNum } = config

    if (newsData[type]) {
      return
    }

    newsData[type] = await services.getNewsList(type, count)
    renderList(newsData[type][pageNum])
  }

  // NavBar.bindEvent的回调函数
  function setType(type) {
    config.type = type
    console.log(config.type)
  }

  init()
})(document)