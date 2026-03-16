document.addEventListener('DOMContentLoaded', () => {
  //open first accordion element on loading
  firstAccordion = document.getElementById('first')
  firstAccordion.style.maxHeight = firstAccordion.scrollHeight + 100 + 'px'

  const faqItems = Array.from(document.querySelectorAll('.faq__item'))

  faqItems.forEach((el) => {
    el.addEventListener('click', (e) => {
      const faqItem = e.currentTarget
      const question = faqItem.querySelector('.faq__question')
      const openIcon = question.querySelector('.faq__question-img--minus')
      const closeIcon = question.querySelector('.faq__question-img--plus')
      const answer = faqItem.querySelector('.faq__answer')

      faqItem.classList.toggle('faq__item--open')

      if (faqItem.classList.contains('faq__item--open')) {
        answer.style.maxHeight = answer.scrollHeight + 100 + 'px'
        question.setAttribute('aria-expanded', true)
        answer.setAttribute('aria-hidden', false)
        closeIcon.hidden = true
        openIcon.hidden = false
      } else {
        answer.style.maxHeight = null
        question.setAttribute('aria-expanded', false)
        answer.setAttribute('aria-hidden', true)
        closeIcon.hidden = false
        openIcon.hidden = true
      }
    })
  })
})
