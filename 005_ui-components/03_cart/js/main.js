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


  ; (function () {
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
  })()

const productBtnEls = Array.from(document.querySelectorAll('.product__btn'))
const cartProductsListEl = document.querySelector('.cart-content__list')
const cartEl = document.querySelector('.cart')
const cartQuantityEl = document.querySelector('.cart__quantity')
const fullPriceEl = document.querySelector('.fullprice')
let price = 0

const getRandomId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const getPriceWithoutSpaces = (str) => {
  return str.replace(/\s/g, '')
}

const getNormalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

const plusFullPrice = (currentPrice) => {
  return price += currentPrice
}

const minusFullPrice = (currentPrice) => {
  return price -= currentPrice
}

const printQuantity = () => {
  const productsListLength = cartProductsListEl.querySelector('.simplebar-content').children.length
  cartQuantityEl.textContent = productsListLength
  productsListLength > 0 ? cartEl.classList.add('active') : cartEl.classList.remove('active')
}

const printFullPrice = () => {
  fullPriceEl.textContent = `${getNormalPrice(price)} ₽`
}

const generateCartProduct = (img, title, price, id) => {
  return `
    <li class="cart-content__item">
      <article class="cart-content__product cart-product" data-id=${id}>
        <img src="${img}" alt="Macbook" class="cart-product__img">
        <div class="cart-product__text">
          <h3 class="cart-product__title">${title}</h3>
          <span class="cart-product__price">${getNormalPrice(price)} ₽</span>
        </div>
        <button class="cart-product__delete" aria-label="Удалить товар из корзины">
        </button>
      </article>
    </li>
  `
}

const deleteProducts = (productParentEl) => {
  const id = productParentEl.querySelector('.cart-product').dataset.id
  const currentPrice = parseInt(getPriceWithoutSpaces(productParentEl.querySelector('.cart-product__price').textContent))

  document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false
  minusFullPrice(currentPrice)
  productParentEl.remove()
  printFullPrice()
  printQuantity()
}

productBtnEls.forEach((el) => {
  el.closest('.product').setAttribute('data-id', getRandomId())
  el.addEventListener('click', (e) => {
    const self = e.target
    const parent = self.closest('.product')
    const id = parent.dataset.id
    const img = parent.querySelector('.img-switch__img img').getAttribute('src')
    const title = parent.querySelector('.product__title').textContent
    const priceNummber = parseInt(getPriceWithoutSpaces(parent.querySelector('.product-price__current').textContent))
    const listEl = cartProductsListEl.querySelector('.simplebar-content')

    self.disabled = true
    plusFullPrice(priceNummber)
    listEl.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNummber, id))
    printFullPrice()
    printQuantity()
  })
})

cartProductsListEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-product__delete')) {
    deleteProducts(e.target.closest('.cart-content__item'))
  }
})