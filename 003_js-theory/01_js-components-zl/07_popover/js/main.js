'use strict'
const popoverTriggers = Array.from(document.querySelectorAll('.popover-trigger'))

const getPopover = (popoverTrigger) => document.querySelector(`#${popoverTrigger.dataset.target}`)

const createPopover = (popoverTrigger) => {
  const popover = document.createElement('div')
  const innerContent = document.createElement('p')
  const { content, popoverPosition } = popoverTrigger.dataset
  const id = generateUniqueString(6)

  popover.classList.add('popover')
  popover.id = id
  popover.dataset.position = popoverPosition
  popoverTrigger.dataset.target = id
  innerContent.textContent = content
  popover.appendChild(innerContent)

  document.body.appendChild(popover)

  return popover
}

const generateUniqueString = (length) => {
  return `a${Math.random().toString(36).substring(2, 2 + length)}` //"a" is used to prevent the id from starting with a digit
}

const calculatePopoverPosition = (popover, popoverTrigger) => {
  const popoverRect = popover.getBoundingClientRect()
  const popoverTriggerRect = popoverTrigger.getBoundingClientRect()
  const space = 20
  const { position } = popover.dataset

  if (position === 'top') {
    return {
      top: popoverTriggerRect.top - popoverRect.height - space,
      left: (popoverTriggerRect.left + popoverTriggerRect.right) / 2 - popoverRect.width / 2
    }
  }
  if (position === 'left') {
    return {
      left: popoverTriggerRect.left - popoverRect.width - space,
      top: (popoverTriggerRect.top + popoverTriggerRect.bottom) / 2 - popoverRect.height / 2
    }
  }
  if (position === 'right') {
    return {
      left: popoverTriggerRect.left + popoverTriggerRect.width + space,
      top: (popoverTriggerRect.top + popoverTriggerRect.bottom) / 2 - popoverRect.height / 2
    }
  }
  if (position === 'bottom') {
    return {
      top: popoverTriggerRect.top + popoverRect.height + space,
      left: (popoverTriggerRect.left + popoverTriggerRect.right) / 2 - popoverRect.width / 2
    }
  }
}

popoverTriggers.forEach((popoverTrigger) => {
  const popover = getPopover(popoverTrigger) || createPopover(popoverTrigger)
  const popoverPosition = calculatePopoverPosition(popover, popoverTrigger)

  popover.style.left = `${popoverPosition.left}px`
  popover.style.top = `${popoverPosition.top}px`
  popover.setAttribute('hidden', true)
})


document.addEventListener('click', ({ target }) => {
  const popoverTrigger = target.closest('.popover-trigger')
  if (!popoverTrigger) return

  const popover = getPopover(popoverTrigger)

  if (popover.hasAttribute('hidden')) {
    popover.removeAttribute('hidden')
  } else {
    popover.setAttribute('hidden', true)
  }
})

document.addEventListener('click', ({ target }) => {
  if (!target.closest('.popover') && !target.closest('.popover-trigger')) {
    const popovers = Array.from(document.querySelectorAll('.popover'))
    popovers.forEach(popover => popover.setAttribute('hidden', true))
  }
})



