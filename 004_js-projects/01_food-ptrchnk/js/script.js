document.addEventListener('DOMContentLoaded', () => {
  /* Tabs */
  const tabsParent = document.querySelector('.tabheader__items')
  const tabs = Array.from(tabsParent.querySelectorAll('.tabheader__item'))
  const tabsContent = Array.from(document.querySelectorAll('.tabcontent'))

  const hideAllTabs = () => {
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active')
    })
    tabsContent.forEach(item => {
      item.classList.remove('show', 'fade')
      item.classList.add('hide')
    })
  }

  const showTabsContent = (index = 0) => {
    tabs[index].classList.add('tabheader__item_active')
    tabsContent[index].classList.remove('hide')
    tabsContent[index].classList.add('show', 'fade')
  }

  tabsParent.addEventListener('click', ({ target }) => {
    if (!target || !target.classList.contains('tabheader__item')) return
    tabs.forEach((item, i) => {
      if (item === target) {
        hideAllTabs()
        showTabsContent(i)
      }
    })
  })

  hideAllTabs()
  showTabsContent()

  /* Timer */
  const deadline = new Date('2024-10-30')

  const addZero = num => ('0' + num).slice(-2)

  const getRemainingTime = (endTime) => {
    const t = Date.parse(endTime) - Date.parse(new Date())
    let days, hours, minutes, seconds

    if (t <= 0) {
      days = 0
      hours = 0
      minutes = 0
      seconds = 0
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24))
      hours = Math.floor((t / (1000 * 60 * 60)) % 24)
      minutes = Math.floor((t / (1000 * 60)) % 60)
      seconds = Math.floor((t / 1000) % 60)
    }
    return {
      total: t,
      days, hours, minutes, seconds
    }
  }

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector)
    const days = timer.querySelector('#days')
    const hours = timer.querySelector('#hours')
    const minutes = timer.querySelector('#minutes')
    const seconds = timer.querySelector('#seconds')
    const timeInterval = setInterval(updateClock, 1000)

    function updateClock() {
      const time = getRemainingTime(endtime)

      days.innerHTML = addZero(time.days)
      hours.innerHTML = addZero(time.hours)
      minutes.innerHTML = addZero(time.minutes)
      seconds.innerHTML = addZero(time.seconds)

      if (time.total <= 0) {
        clearInterval(timeInterval)
      }
    }

    updateClock()
  }

  setClock('.timer', deadline)

  /* Modal */
  const modal = document.querySelector('.modal')
  const modaltriggers = [...document.querySelectorAll('[data-modal]')]

  const openModal = () => {
    modal.classList.remove('hide')
    modal.classList.add('show')
    document.body.style.overflow = 'hidden'
    clearInterval(modaltimeout)
  }

  const closeModal = () => {
    modal.classList.remove('show')
    modal.classList.add('hide')
    document.body.style.overflow = ''
  }

  const openModalOnScroll = () => {
    const scrollPosition = window.scrollY + document.documentElement.clientHeight
    const documentHeight = document.documentElement.scrollHeight
    if (scrollPosition >= documentHeight - 1) {
      openModal()
      document.removeEventListener('scroll', openModalOnScroll)
    }
  }

  modaltriggers.forEach((item) => {
    item.addEventListener('click', openModal)
  })
  const modaltimeout = setTimeout(openModal, 6000000)
  document.addEventListener('scroll', openModalOnScroll)

  modal.addEventListener('click', ({ target }) => {
    if (!(target === modal || target.hasAttribute('data-close'))) return
    closeModal()
  })
  document.addEventListener('keydown', (e) => {
    const code = e.code
    if (!(code === 'Escape' && modal.classList.contains('show'))) return
    closeModal()
  })

  /* Menu */
  const getResources = async (url) => {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }

  class MenuCard {
    constructor(data, parentSelector, ...classes) {
      this.img = data.img
      this.alt = data.altimg
      this.title = data.title
      this.descr = data.descr
      this.price = data.price
      this.classes = classes
      this.transfer = 27
      this.parent = document.querySelector(parentSelector)
      this.changeToUAH()
      this.render()
    }

    changeToUAH() {
      this.price = this.price * this.transfer
    }

    render() {
      const menuEl = document.createElement('div')
      if (this.classes.length === 0) {
        this.elementClass = 'menu__item'
        menuEl.classList.add(this.elementClass)
      } else {
        this.classes.forEach(item => menuEl.classList.add(item))
      }
      menuEl.innerHTML = `
      <img src="${this.img}" alt="${this.alt}">
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>`
      this.parent.append(menuEl)
    }
  }

  const createCards = (data) => {
    data.forEach((item) => {
      const { img, altimg, title, descr, price } = item
      const el = document.createElement('div')
      el.classList.add('menu__item')
      el.innerHTML = `
      <img src="${img}" alt="${altimg}">
      <h3 class="menu__item-subtitle">${title}</h3>
      <div class="menu__item-descr">${descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${price}</span> грн/день</div>
      </div>`
      document.querySelector('.menu__field .container').append(el)
    })
  }

  getResources('http://localhost:3000/menu')
    .then(data => {
      data.forEach((obj) => {
        new MenuCard(obj, '.menu__field .container', 'menu__item')
      })
    })

  /* Второй способ рендера (более простой) */
  getResources('http://localhost:3000/menu')
    .then(data => createCards(data))




  /* Forms */
  const forms = Array.from(document.querySelectorAll('form'))

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Thanks! We\'ll contact you soon',
    failure: 'Something doesn\'t work'
  }

  /* xhr */
  /* const postData = (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()

      const statusMessage = document.createElement('img')
      statusMessage.src = message.loading
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `
      form.insertAdjacentElement('afterend', statusMessage)

      const request = new XMLHttpRequest()
      request.open('POST', 'server.php')
      request.setRequestHeader('Content-type', 'application/json')
      const formData = new FormData(form)

      const obj = {}
      formData.forEach((value, key) => {
        obj[key] = value
      })
      const dataJson = JSON.stringify(obj)

      request.send(dataJson)

      request.addEventListener('load', () => {
        statusMessage.remove()
        if (request.status === 200) {
          showMessageModal(message.success)
          form.reset()
        } else {
          showMessageModal(message.failure)
        }
      })
    })
  } */
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
    return await res.json()
  }

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()

      let statusMessage = document.createElement('img')
      statusMessage.src = message.loading
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
      form.insertAdjacentElement('afterend', statusMessage)

      const formData = new FormData(form)

      const json = JSON.stringify(Object.fromEntries(formData.entries()))

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data)
          showMessageModal(message.success)
          statusMessage.remove()
        }).catch(() => {
          showMessageModal(message.failure)
        }).finally(() => {
          form.reset()
        })
    })
  }

  forms.forEach(item => bindPostData(item))

  const showMessageModal = (message) => {
    const prevModalDialog = document.querySelector('.modal__dialog')
    prevModalDialog.classList.add('hide')
    openModal()

    const thanksModal = document.createElement('div')
    thanksModal.classList.add('modal__dialog')
    thanksModal.innerHTML = `
    <div class="modal__content">
    <div class="modal__close" data-close>&times;</div>
    <div class="modal__title">${message}</div>
    </div>
    `
    document.querySelector('.modal').append(thanksModal)

    setTimeout(() => {
      thanksModal.remove()
      prevModalDialog.classList.remove('hide')
      prevModalDialog.classList.add('show')
      closeModal()
    }, 3000)
  }

  /* Slider */
  const slider = document.querySelector('.offer__slider')
  const slides = Array.from(document.querySelectorAll('.offer__slide'))
  const prevBtn = document.querySelector('.offer__slider-prev')
  const nextBtn = document.querySelector('.offer__slider-next')
  const current = document.getElementById('current')
  const total = document.getElementById('total')
  const sliderWrapper = document.querySelector('.offer__slider-wrapper')
  const sliderInner = document.querySelector('.offer__slider-inner')
  const wrapperWidth = getComputedStyle(sliderWrapper).width

  let slideIndex = 1
  let offset = 0
  const dots = []

  total.textContent = addZero(slides.length)
  current.textContent = addZero(slideIndex)
  sliderInner.style.width = slides.length * 100 + '%'
  sliderInner.style.display = 'flex'
  sliderInner.style.transition = 'all 0.3s ease'
  sliderWrapper.style.overflow = 'hidden'

  slides.forEach((slide) => {
    slide.style.width = wrapperWidth
  })

  slider.style.position = 'relative'
  const indicators = document.createElement('ol')
  indicators.classList.add('carousel-indicators')
  for (let index = 0; index < slides.length; index++) {
    const dot = document.createElement('li')
    dot.classList.add('dot')
    dot.setAttribute('data-slide-to', index + 1)
    indicators.append(dot)
    dots.push(dot)
  }
  dots[slideIndex - 1].style.opacity = '1'
  slider.append(indicators)

  nextBtn.addEventListener('click', () => {
    if (offset === parseInt(wrapperWidth.slice(0, -2)) * (slides.length - 1)) {
      offset = 0
    } else {
      offset += parseInt(wrapperWidth.slice(0, -2))
    }
    sliderInner.style.transform = `translateX(-${offset}px)`
    slideIndex = slideIndex === slides.length ? 1 : slideIndex + 1
    current.textContent = addZero(slideIndex)
    dots.forEach(dot => dot.style.opacity = '0.5')
    dots[slideIndex - 1].style.opacity = '1'
  })

  prevBtn.addEventListener('click', () => {
    if (offset === 0) {
      offset = parseInt(wrapperWidth.slice(0, -2)) * (slides.length - 1)
    } else {
      offset -= parseInt(wrapperWidth.slice(0, -2))
    }
    sliderInner.style.transform = `translateX(-${offset}px)`
    slideIndex = slideIndex === 1 ? slides.length : slideIndex - 1
    current.textContent = addZero(slideIndex)
    dots.forEach(dot => dot.style.opacity = '0.5')
    dots[slideIndex - 1].style.opacity = '1'
  })

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.dataset.slideTo
      slideIndex = parseInt(slideTo)
      offset = parseInt(wrapperWidth.slice(0, -2)) * (slideTo - 1)
      sliderInner.style.transform = `translateX(-${offset}px)`
      current.textContent = addZero(slideIndex)
      dots.forEach(dot => dot.style.opacity = '0.5')
      dots[slideIndex - 1].style.opacity = '1'
    })
  })

  /* Calculator */
  const result = document.querySelector('.calculating__result span')
  let sex, ratio, height, weight, age
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex')
  } else {
    sex = 'female'
    localStorage.setItem('sex', sex)
  }
  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio')
  } else {
    ratio = 1.375
    localStorage.setItem('ratio', ratio)
  }

  const initLocalSettings = (selector, activeClass) => {
    const els = Array.from(document.querySelectorAll(selector))
    els.forEach((elem) => {
      elem.classList.remove(activeClass)
      if (elem.id === localStorage.getItem('sex')) {
        elem.classList.add(activeClass)
      }
      if (elem.dataset.ratio === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass)
      }
    })


  }

  const calcTotal = () => {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '###'
      return
    }
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
    }
  }

  const getStaticData = (parentSelector, activeClass) => {
    const els = Array.from(document.querySelectorAll(`${parentSelector} div`))
    document.querySelector(parentSelector).addEventListener('click', ({ target }) => {
      if (!target.hasAttribute('data-static')) return
      if (target.hasAttribute('data-ratio')) {
        ratio = +target.dataset.ratio
        localStorage.setItem('ratio', +target.dataset.ratio)
      } else {
        sex = target.id
        localStorage.setItem('sex', target.id)
      }
      els.forEach(item => {
        item.classList.remove(activeClass)
      })
      target.classList.add(activeClass)
      calcTotal()
    })
  }

  const getDynamicData = (selector) => {
    const input = document.querySelector(selector)
    input.addEventListener('input', () => {

      if (input.value.match(/\D/g)) {
        input.style.outline = '1px solid red'
      } else {
        input.style.outline = 'none'
      }

      switch (input.id) {
        case 'height':
          height = +input.value
          break
        case 'age':
          age = +input.value
          break
        case 'weight':
          weight = +input.value
          break
      }
      calcTotal()
    })
  }

  initLocalSettings('[data-static]', 'calculating__choose-item_active')
  getStaticData('#gender', 'calculating__choose-item_active')
  getStaticData('.calculating__choose_big', 'calculating__choose-item_active')
  getDynamicData('#height')
  getDynamicData('#weight')
  getDynamicData('#age')
})