const date = new Date(2019, 1, 13)
const form = document.querySelector('form')
const input = document.querySelector('input')

const datetimeToDate = (datetime) => {
  const [year, month, day = 1] = datetime.split('-')
    .map(num => parseInt(num))

  return new Date(year, month - 1, day)
}

const toTwoDigitString = (number) => {
  return number.toString().padStart(2, '0')
}

const getCoords = (elem) => {
  let box = elem.getBoundingClientRect()

  return {
    top: box.top + window.scrollY,
    right: box.right + window.scrollX,
    bottom: box.bottom + window.scrollY,
    left: box.left + window.scrollX
  }
}

const createDateGridHTML = (date) => {
  const dategrid = document.createElement('div')
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDayOfMonth = new Date(date.setDate(1)).getDay()
  const lastDayInMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayInMonth.getDate()
  const datetimeMonth = toTwoDigitString(month + 1)

  for (let day = 1; day <= daysInMonth; day++) {
    const button = document.createElement('button')
    button.setAttribute('type', 'button')
    if (day === 1) button.style.setProperty('--firstDayOfMonth', firstDayOfMonth + 1)

    const datetimeDay = toTwoDigitString(day)
    button.innerHTML = `
      <time datetime="${year}-${datetimeMonth}-${datetimeDay}">${day}</time>
    `

    dategrid.appendChild(button)
  }

  return dategrid.innerHTML
}

const createYearMonthIndicatorTimeElement = (date) => {
  const monthsInAYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const year = date.getFullYear()
  const targetMonth = date.getMonth()
  const monthName = monthsInAYear[targetMonth]
  const datetimeMonth = toTwoDigitString(targetMonth + 1)

  return `
      <time datetime="${year}-${datetimeMonth}">${monthName} ${year}</time>
    `
}

const createDatepicker = (input, date) => {
  const datepicker = document.createElement('div')
  datepicker.classList.add('datepicker')

  const previousNextMonthButtons = `
    <div class="datepicker__buttons">
      <button class="datepicker__previous" type="button">
        <svg viewBox="0 0 20 20">
          <path fill="currentColor" d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" /></svg>
        </svg>
      </button>

      <button class="datepicker__next" type="button">
        <svg viewBox="0 0 20 20">
          <path fill="currentColor" d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
        </svg>
      </button>
    </div>
  `

  const calendar = `
    <div class="datepicker__calendar">
      <div class="datepicker__year-month">
        ${createYearMonthIndicatorTimeElement(date)}
      </div>
      <div class="datepicker__day-of-week">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      <div class="datepicker__date-grid">
        ${createDateGridHTML(date)}
      </div>
    </div>
  `

  datepicker.innerHTML = `
    ${previousNextMonthButtons}
    ${calendar}
  `
  datepicker.setAttribute('hidden', true)
  input.addEventListener('click', () => {
    datepicker.removeAttribute('hidden')
  })
  document.addEventListener('click', event => {
    if (event.target.closest('.datepicker')) return
    if (event.target.closest('input') === input) return
    datepicker.setAttribute('hidden', true)
  })

  const previousNextButtons = datepicker.querySelector('.datepicker__buttons')

  const getDateFromYearMonthIndicator = () => {
    const time = datepicker.querySelector('.datepicker__year-month').firstElementChild
    const datetime = time.getAttribute('datetime')
    return datetimeToDate(datetime)
  }

  previousNextButtons.addEventListener('click', ev => {
    if (!ev.target.matches('button')) return
    const currentDate = getDateFromYearMonthIndicator()

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const targetDate = ev.target.matches('.datepicker__previous')
      ? new Date(year, month - 1)
      : new Date(year, month + 1)

    const dategrid = datepicker.querySelector('.datepicker__date-grid')
    const yearMonthIndicator = datepicker.querySelector('.datepicker__year-month')
    yearMonthIndicator.innerHTML = createYearMonthIndicatorTimeElement(targetDate)
    dategrid.innerHTML = createDateGridHTML(targetDate)
  })

  const dategrid = datepicker.querySelector('.datepicker__date-grid')
  dategrid.addEventListener('click', ({ target }) => {
    if (!target.matches('button')) return

    const buttons = [...target.parentElement.children]
    buttons.forEach(button => button.classList.remove('is-selected'))
    target.classList.add('is-selected')

    const time = target.firstElementChild
    const datetime = time.getAttribute('datetime')
    const selectedDate = datetimeToDate(datetime)
    const year = selectedDate.getFullYear()
    const month = toTwoDigitString(selectedDate.getMonth() + 1)
    const day = toTwoDigitString(selectedDate.getDate())
    const formatted = `${day}/${month}/${year}`
    input.value = formatted
  })

  const inputCoords = getCoords(input)
  const oneRem = parseFloat(getComputedStyle(document.body)['font-size'])

  datepicker.style.left = `${inputCoords.left}px`
  datepicker.style.top = `${inputCoords.bottom + oneRem}px`

  return datepicker
}

form.appendChild(createDatepicker(input, date))
