'use strict'

let habbits = []
const HABBITS_KEY = 'HABBITS_KEY'
let globalHabbitId
const page = {
  menu: document.querySelector('.menu__list'),
  header: {
    heading: document.querySelector('.header__title'),
    percent: document.querySelector('.progress__text-percent'),
    scale: document.querySelector('.progress__bar-cover')
  },
  content: {
    list: document.querySelector('.habbits__list'),
    newDayNumber: document.querySelector('.habbits__new-day-number'),
  },
  popup: {
    body: document.querySelector('.cover'),
    iconInput: document.querySelector('.popup__form input[name="icon"]')
  }
}

/* Data */
function loadData() {
  const habbitsString = localStorage.getItem(HABBITS_KEY)
  const habbitsArray = JSON.parse(habbitsString)
  if (Array.isArray(habbitsArray)) {
    habbits = habbitsArray
  }
}

function saveData() {
  localStorage.setItem(HABBITS_KEY, JSON.stringify(habbits))
}

/* Popup */
function togglePopup() {
  page.popup.body.classList.toggle('cover_hidden')
}

/* Forms */
function validateAndGetFormData(form, fields) {
  const formData = new FormData(form)
  const res = {}
  for (const field of fields) {
    const fieldText = formData.get(field)
    form[field].classList.remove('error')
    if (!fieldText) {
      form[field].classList.add('error')
    }
    res[field] = fieldText
  }
  let isValid = true
  for (const field of fields) {
    if (!res[field]) {
      isValid = false
    }
  }
  if (!isValid) {
    return
  }
  return res
}

function resetForm(form, fields) {
  for (const field of fields) {
    form[field].value = ''
  }
}

/* Days */
function addNewDay(e) {
  e.preventDefault()
  const form = e.target

  const data = validateAndGetFormData(form, ['comment'])
  if (!data) {
    return
  }

  habbits = habbits.map((habbit) => {
    if (habbit.id === globalHabbitId) {
      return {
        ...habbit,
        days: habbit.days.concat([{ comment: data.comment }])
      }
    }
    return habbit
  })

  resetForm(form, ['comment'])
  reRender(globalHabbitId)
  saveData()
}

function removeDay(index) {
  habbits = habbits.map((habbit) => {
    if (habbit.id === globalHabbitId) {
      habbit.days.splice(index, 1)
    }
    return habbit
  })
  reRender(globalHabbitId)
  saveData()
}

/* Habbits */
function setIcon(self, icon) {
  page.popup.iconInput.setAttribute('value', icon)
  document.querySelector('.icon_active').classList.remove('icon_active')
  self.classList.add('icon_active')
}

function addNewHabbit(e) {
  e.preventDefault()
  const form = e.target

  const data = validateAndGetFormData(form, ['name', 'icon', 'target'])
  if (!data) {
    return
  }
  const maxId = habbits.reduce((acc, habbit) => acc > habbit.id ? acc : habbit.id, 0)
  habbits.push({
    id: maxId + 1,
    icon: data.icon,
    name: data.name,
    target: data.target,
    days: []
  })
  resetForm(form, ['name', 'icon', 'target'])
  togglePopup()
  reRender(maxId + 1)
  saveData()
}

/* Render Habbit Part */
function reRenderMenu(activeHabbit) {
  for (const habbit of habbits) {
    const existed = document.querySelector(`[data-menu-habbit-id="${habbit.id}"]`)
    if (!existed) {
      const element = document.createElement('button')
      element.setAttribute('data-menu-habbit-id', habbit.id)
      element.classList.add('menu__button', 'btn-reset')
      element.addEventListener('click', () => reRender(habbit.id))
      element.innerHTML = `<img src="images/${habbit.icon}.svg" alt="${habbit.name}">`
      if (habbit.id === activeHabbit.id) {
        element.classList.add('menu__button_active')
      }
      const parent = document.createElement('li')
      parent.classList.add('menu__item')
      parent.appendChild(element)

      page.menu.appendChild(parent)
      continue
    }
    if (habbit.id === activeHabbit.id) {
      existed.classList.add('menu__button_active')
    } else {
      existed.classList.remove('menu__button_active')
    }
  }
}

function reRenderHeader(activeHabbit) {
  page.header.heading.textContent = activeHabbit.name
  const progress = activeHabbit.days.length / activeHabbit.target > 1 ? 100 : activeHabbit.days.length / activeHabbit.target * 100
  page.header.percent.textContent = progress.toFixed() + '%'
  page.header.scale.style.width = progress + '%'
}

function reRenderContent(activeHabbit) {
  page.content.list.innerHTML = ''
  activeHabbit.days.forEach((day, index) => {
    const element = document.createElement('li')
    element.classList.add('habbits__item')
    element.innerHTML = `
            <div class="habbits__item-day">День ${index + 1}</div>
            <div class="habbits__item-desc">
              <p class="habbits__item-text">${day.comment}</p>
              <button class="habbits__item-delete btn-reset" onclick="removeDay(${index})">
                <img src="images/bucket.svg" alt="Delete item">
              </button>
            </div>
          `
    page.content.list.appendChild(element)
  })
  page.content.newDayNumber.textContent = activeHabbit.days.length + 1
}

/* Render all habbit parts */
function reRender(activeHabbitId) {
  globalHabbitId = activeHabbitId
  const activeHabbit = habbits.find(habbit => habbit.id === activeHabbitId)
  if (!activeHabbit) {
    return
  }
  document.location.replace(document.location.pathname + '#' + activeHabbitId)
  reRenderMenu(activeHabbit)
  reRenderHeader(activeHabbit)
  reRenderContent(activeHabbit)
}

/* Init */
; (function () {
  loadData()

  const hashId = Number(document.location.hash.replace('#', ''))
  const urlHabbitId = habbits.find(habbit => habbit.id === hashId).id
  if (urlHabbitId) {
    reRender(urlHabbitId)
  } else {
    reRender(habbits[0].id)
  }
})()
