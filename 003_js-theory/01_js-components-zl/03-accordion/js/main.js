'use strict'
const accordionsContainer = document.querySelector('.accordion-container')

const getAccordionHeight = (accordion) => {
  const accordionInner = accordion.querySelector('.accordion__inner')
  if (accordion.classList.contains('is-open')) return 0
  return accordionInner.getBoundingClientRect().height
}

const updateAccordion = (accordion, height) => {
  const accordionContent = accordion.querySelector('.accordion__content')
  accordion.classList.toggle('is-open')
  accordionContent.style.height = `${height}px`
}

accordionsContainer.addEventListener('click', ({ target }) => {
  const accordionHeader = target.closest('.accordion__header')
  if (!accordionHeader) return

  const accordion = accordionHeader.parentElement
  const height = getAccordionHeight(accordion)

  updateAccordion(accordion, height)
})
