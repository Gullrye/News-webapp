import './imports'

import Header from '../components/Header'

;((doc) => {
  const oApp = document.querySelector('#app')

  const init = () => {
    render()
  }

  function render(){
    const headerTpl = Header.tpl({
      url: '/',
      title: '新闻头条',
      showLeftIcon: false,
      showRightIcon: true
    })

    oApp.innerHTML += headerTpl
  }

  init()
})(document)