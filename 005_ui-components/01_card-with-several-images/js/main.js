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