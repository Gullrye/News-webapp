import './imports'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import NewsList from '../components/NewsList'
import PageLoading from '../components/PageLoading'
import MoreLoading from '../components/MoreLoading'

import { NEWS_TYPE } from '../data'
import services from '../services'
import { scrollToBottom } from '../libs/utils'

;((doc) => {
  const oApp = doc.querySelector('#app')
  let oListWrapper = null

  const config = {
    type: 'top',
    count: 10,
    pageNum: 0,
    isLoading: false
  }
  let t= null
  const newsData = {}

  const init = async () => {
    render()
    // 渲染完执行bindEvent()才不会出错
    await setNewsList()
    bindEvent()
  }

  function bindEvent() {
    NavBar.bindEvent(setType)
    window.addEventListener('scroll', scrollToBottom.bind(null, getMoreList), false)
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
    MoreLoading.remove(oListWrapper)
    oListWrapper.innerHTML += NewsListTpl
    config.isLoading = false
    NewsList.imgShow()
  }

  async function setNewsList() {
    const { type, count, pageNum } = config

    if (newsData[type]) {
      renderList(newsData[type][pageNum])
      return
    }
    oListWrapper.innerHTML = PageLoading.tpl()
    newsData[type] = await services.getNewsList(type, count)
    renderList(newsData[type][pageNum])
    setTimeout(() => {
      oListWrapper.innerHTML = ''
      renderList(newsData[type][pageNum])
    }, 1500)
  }

  // NavBar.bindEvent的回调函数
  function setType(type) {
    config.type = type
    config.pageNum = 0
    config.isLoading = false
    oListWrapper.innerHTML = ''
    setNewsList()
  }

  function getMoreList () {
    if(!config.isLoading) {
      config.pageNum++
      clearTimeout(t)
      const {pageNum, type} = config
      if(pageNum >= newsData[type].length) {
        MoreLoading.add(oListWrapper, false)
      } else {
        config.isLoading = true
        MoreLoading.add(oListWrapper, true)
        t = setTimeout(() => {
          setNewsList()
        }, 1000);
      }
    }
  }

  init()
})(document)