'use strict'
const tabby = document.querySelector('.tabby')
const tabs = Array.from(tabby.querySelectorAll('.tab'))
const tabsContents = Array.from(tabby.querySelectorAll('.tab-content'))

tabby.addEventListener('click', ({ target }) => {
  const tab = target.closest('.tab')
  if (tab) {
    tabs.forEach(t => t.classList.remove('is-selected'))
    tabsContents.forEach(t => t.classList.remove('is-selected'))

    tab.classList.add('is-selected')

    const targetId = tab.dataset.theme
    const tabContent = tabby.querySelector(`.tab-content[data-theme=${targetId}]`)
    tabContent.classList.add('is-selected')
  }
})
