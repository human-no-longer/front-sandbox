; (function () {
  const productEls = Array.from(document.querySelectorAll('.product'))

  if (productEls) {
    productEls.forEach((el) => {
      const currentProduct = el
      const imgSwitchItemEls = Array.from(currentProduct.querySelectorAll('.img-switch__item'))
      const imgPaginationEl = currentProduct.querySelector('.img-pagination')

      if (imgSwitchItemEls.length <= 1) return
      imgSwitchItemEls.forEach((item, index) => {
        item.setAttribute('data-index', index)
        const activeClass = index === 0 ? 'img-pagination__item_active' : ''
        imgPaginationEl.innerHTML += `<li class="img-pagination__item ${activeClass}" data-index="${index}"></li>`

        item.addEventListener('mouseenter', (e) => {
          currentProduct.querySelectorAll('.img-pagination__item').forEach(el => { el.classList.remove('img-pagination__item_active') })
          currentProduct.querySelector(`.img-pagination__item[data-index="${e.currentTarget.dataset.index}"]`).classList.add('img-pagination__item_active')
        })

        item.addEventListener('mouseleave', () => {
          currentProduct.querySelectorAll('.img-pagination__item').forEach(el => { el.classList.remove('img-pagination__item_active') })
          currentProduct.querySelector(`.img-pagination__item[data-index="0"]`).classList.add('img-pagination__item_active')
        })
      })
    })
  }
})()

const fixedEl = document.querySelector('.filter-price')
const filtersEl = document.querySelector('.filters')
const containerEl = document.querySelector('.container')
const filtersTopOffset = filtersEl.offsetTop
const filtersWidth = filtersEl.offsetWidth
const gutter = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gutter'))
const smallOffset = gutter
const leftOffset = containerEl.offsetLeft + gutter

const calcFixedElPosition = () => {
  let scrollValue = window.scrollY
  const productGridEnd = filtersEl.offsetHeight + filtersTopOffset
  const filtersElStart = filtersTopOffset - smallOffset
  if (scrollValue > filtersElStart && scrollValue <= productGridEnd) {
    fixedEl.style.left = leftOffset + 'px'
    fixedEl.style.width = filtersWidth + 'px'
    fixedEl.classList.remove('absolute')
    fixedEl.classList.add('fixed')
  } else {
    fixedEl.style.width = ''
    fixedEl.style.left = ''
    fixedEl.classList.remove('fixed')
  }
  if (scrollValue >= filtersElStart + filtersEl.offsetHeight - fixedEl.offsetHeight) {
    fixedEl.style.left = ''
    fixedEl.style.width = ''
    fixedEl.classList.remove('fixed')
    fixedEl.classList.add('absolute')
  }
}

window.addEventListener('scroll', calcFixedElPosition)
