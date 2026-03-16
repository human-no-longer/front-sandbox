'use strict'
const modalButton = document.querySelector('.jsModalButton')
const modalCloseButton = document.querySelector('.jsModalClose')
const modalOverlay = document.querySelector('.jsModalOverlay')

modalButton.addEventListener('click', () => {
  document.body.classList.add('modal-is-open')
})

modalCloseButton.addEventListener('click', () => {
  document.body.classList.remove('modal-is-open')
})

modalOverlay.addEventListener('click', ({ target }) => {
  if (!target.closest('.modal')) {
    document.body.classList.remove('modal-is-open')
  }
})