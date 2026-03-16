document.addEventListener('DOMContentLoaded', () => {
  /* Top Notice */
  const notice = document.querySelector('.notice')

  if (notice) {
    const noticeClose = notice.querySelector('.notice__close')
    noticeClose.addEventListener('click', ({ target }) => {
      target.parentElement.classList.add('notice_hidden')
    })
  }

  /* Stepper */
  const steppers = Array.from(document.querySelectorAll('.stepper'))

  if (steppers) {

    steppers.forEach((stepper) => {
      const stepperInput = stepper.querySelector('.stepper__input')
      const stepperButtons = Array.from(stepper.querySelectorAll('.stepper__btn'))
      const stepperBtnMinus = stepper.querySelector('.stepper__btn_minus')
      const stepperBtnPlus = stepper.querySelector('.stepper__btn_plus')

      let count = Number(stepperInput.value)
      const stepperMin = Number(stepperInput.getAttribute('min'))
      const stepperMax = Number(stepperInput.getAttribute('max'))

      const disableButtons = (value) => {
        stepperButtons.forEach((btn) => {
          btn.disabled = false
        })
        if (value === stepperMin) {
          stepperBtnMinus.disabled = true
        }
        if (value === stepperMax) {
          stepperBtnPlus.disabled = true
        }
      }

      stepperBtnPlus.addEventListener('click', () => {
        stepperInput.value = ++count
        disableButtons(count)
      })

      stepperBtnMinus.addEventListener('click', () => {
        stepperInput.value = --count
        disableButtons(count)
      })

      stepperInput.addEventListener('change', ({ target }) => {
        const inputValue = Number(target.value)
        if (inputValue < stepperMin) {
          target.value = count = stepperMin
        } else if (target.value > stepperMax) {
          target.value = count = stepperMax
        } else {
          count = inputValue
        }
        disableButtons(count)
      })

      disableButtons(count)
    })
  }
})
