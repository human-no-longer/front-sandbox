const burger = document.querySelector('.burger')
const menu = document.querySelector('.header__nav')
const links = Array.from(document.querySelectorAll('.header__nav .nav__link'))
const moreBtn = document.querySelector('.articles__more')
const articles = Array.from(document.querySelectorAll('.articles__item'))

burger.addEventListener('click', () => {
  burger.classList.toggle('burger_active')
  menu.classList.toggle('header__nav_active')
  document.body.classList.toggle('stop-scroll')
})

links.forEach((link) => {
  link.addEventListener('click', () => {
    burger.classList.remove('burger_active')
    menu.classList.remove('header__nav_active')
    document.body.classList.remove('stop-scroll')
  })
})

moreBtn.addEventListener('click', ({ target }) => {
  articles.forEach(article => article.classList.add('articles__item_visible'))
  const btnWrapper = target.closest('.articles__btn-wrapper')
  if (btnWrapper) {
    btnWrapper.classList.add('articles__btn-wrapper_hidden')
  }
})