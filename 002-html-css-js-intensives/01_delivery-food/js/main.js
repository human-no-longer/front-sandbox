const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector, closeOnOverlayClick = true) {
    const trigger = document.querySelectorAll(triggerSelector)
    const modal = document.querySelector(modalSelector)
    const close = document.querySelector(closeSelector)
    const modals = Array.from(document.querySelectorAll('[data-modal]'))

    trigger.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault()
        }

        modals.forEach((item) => {
          item.style.display = 'none'
        })

        modal.style.display = 'flex'
        document.body.style.overflow = 'hidden'
      })
    })

    close.addEventListener('click', () => {
      modals.forEach((item) => {
        item.style.display = 'none'
      })
      document.body.style.overflow = ''
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeOnOverlayClick) {
        modals.forEach((item) => {
          item.style.display = 'none'
        })
        document.body.style.overflow = ''
      }
    })
  }

  bindModal('.header__to-cart', '.modal', '.modal__close-btn')
}

modals()