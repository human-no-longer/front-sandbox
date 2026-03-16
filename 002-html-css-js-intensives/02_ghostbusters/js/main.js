const searchBtn = document.querySelector('.search__btn')
const burgerBtn = document.querySelector('.header__menu-btn')
const searchInput = document.querySelector('.search__input')
const menu = document.querySelector('.header__inner-right')

/* Burger menu */
burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('header__menu-btn_active')
  menu.classList.toggle('header__inner-right_active')
})

/* Toggle search input field */
searchBtn.addEventListener('click', ev => {
  ev.preventDefault()
  searchInput.classList.toggle('search__input_hidden')
  searchInput.focus()
})

/* Hide search input on small screens */
const width = window.innerWidth
if (width < 601) {
  searchInput.classList.add('search__input_hidden')
}

/* Show trailer in modal window */
// eslint-disable-next-line no-undef
Fancybox.bind("[data-fancybox]")

/* Tabs */
const tabby = document.querySelector('.staff')
const tabs = Array.from(tabby.querySelectorAll('.staff__tab'))
const tabsContents = Array.from(tabby.querySelectorAll('.staff__tab-content'))

tabby.addEventListener('click', ({ target }) => {
  const tab = target.closest('.staff__tab')
  if (tab) {
    tabs.forEach(t => t.classList.remove('staff__tab_active'))
    tabsContents.forEach(t => t.classList.remove('staff__tab-content_active'))
    tab.classList.add('staff__tab_active')

    const targetId = tab.dataset.staff
    const tabContent = tabby.querySelector(`.staff__tab-content[data-staff=${targetId}]`)
    tabContent.classList.add('staff__tab-content_active')
  }
})

/* TODO: News slider via Swiper 6 */