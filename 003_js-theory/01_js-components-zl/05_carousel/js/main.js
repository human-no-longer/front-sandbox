'use strict'
const carousel = document.querySelector('.carousel')
const contents = document.querySelector('.carousel__contents')
const slides = Array.from(document.querySelectorAll('.carousel__slide'))
const prevButton = Array.from(carousel.querySelectorAll('.carousel__button'))[0]
const nextButton = Array.from(carousel.querySelectorAll('.carousel__button'))[1]
const dotsContainer = createDots(slides)
const dots = [...dotsContainer.children]

function createDots(slides) {
  const dotsContainer = document.createElement('div')
  dotsContainer.classList.add('carousel__dots')

  slides.forEach((slide) => {
    const dot = document.createElement('button')

    dot.classList.add('carousel__dot')
    dotsContainer.appendChild(dot)

    if (slide.classList.contains('is-selected')) {
      dot.classList.add('is-selected')
    }
  })
  return dotsContainer
}

const setSlidesPosition = () => {
  const slideWidth = slides[0].getBoundingClientRect().width
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px'
  })
}

const switchSlide = (currentSlideIndex, targetSlideIndex) => {
  const currentSlide = slides[currentSlideIndex]
  const targetSlide = slides[targetSlideIndex]
  const destination = getComputedStyle(targetSlide).left

  contents.style.transform = `translateX(-${destination})`
  currentSlide.classList.remove('is-selected')
  targetSlide.classList.add('is-selected')
}

const highlightDot = (currentSlideIndex, targetSlideIndex) => {
  const currentDot = dots[currentSlideIndex]
  const targetDot = dots[targetSlideIndex]

  currentDot.classList.remove('is-selected')
  targetDot.classList.add('is-selected')
}

const getCurrentSlideIndex = () => {
  const currentSlide = contents.querySelector('.is-selected')
  return slides.findIndex(slide => slide === currentSlide)
}

const showHideArrowButtons = (targetDotIndex) => {
  if (targetDotIndex === 0) {
    prevButton.setAttribute('hidden', true)
    nextButton.removeAttribute('hidden')
  } else if (targetDotIndex === dots.length - 1) {
    prevButton.removeAttribute('hidden')
    nextButton.setAttribute('hidden', true)
  } else {
    prevButton.removeAttribute('hidden')
    nextButton.removeAttribute('hidden')
  }
}

nextButton.addEventListener('click', () => {
  const currentSlideIndex = getCurrentSlideIndex()
  const nextSlideIndex = currentSlideIndex + 1

  switchSlide(currentSlideIndex, nextSlideIndex)
  showHideArrowButtons(nextSlideIndex)
  highlightDot(currentSlideIndex, nextSlideIndex)
})

prevButton.addEventListener('click', () => {
  const currentSlideIndex = getCurrentSlideIndex()
  const prevSlideIndex = currentSlideIndex - 1

  switchSlide(currentSlideIndex, prevSlideIndex)
  showHideArrowButtons(prevSlideIndex)
  highlightDot(currentSlideIndex, prevSlideIndex)
})

dotsContainer.addEventListener('click', ({ target }) => {
  const dot = target.closest('.carousel__dot')
  if (!dot) return

  const currentSlideIndex = getCurrentSlideIndex()
  const targetSlideIndex = dots.findIndex((item) => item === dot)

  switchSlide(currentSlideIndex, targetSlideIndex)
  highlightDot(currentSlideIndex, targetSlideIndex)
  showHideArrowButtons(targetSlideIndex)
})

setSlidesPosition()
carousel.appendChild(dotsContainer)
