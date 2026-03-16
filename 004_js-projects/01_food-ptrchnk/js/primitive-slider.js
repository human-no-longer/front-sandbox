/*Primitive Slider */
const slides = Array.from(document.querySelectorAll('.offer__slide'))
const prevBtn = document.querySelector('.offer__slider-prev')
const nextBtn = document.querySelector('.offer__slider-next')
const current = document.getElementById('current')
const total = document.getElementById('total')
total.textContent = addZero(slides.length)
let slideIndex = 1

const showSlides = (n) => {
  if (n < 1) {
    slideIndex = slides.length
  }
  if (n > slides.length) {
    slideIndex = 1
  }
  showCounter(slideIndex)
  slides.forEach((slide) => {
    slide.classList.remove('show')
    slide.classList.add('hide')
  })
  slides[slideIndex - 1].classList.remove('hide')
  slides[slideIndex - 1].classList.add('show')
}

const showCounter = (n) => {
  current.textContent = addZero(n)
}

const changeSlideIndex = (n) => {
  showSlides(slideIndex += n)
}

prevBtn.addEventListener('click', () => {
  changeSlideIndex(-1)
})

nextBtn.addEventListener('click', () => {
  changeSlideIndex(1)
})

showSlides(slideIndex)