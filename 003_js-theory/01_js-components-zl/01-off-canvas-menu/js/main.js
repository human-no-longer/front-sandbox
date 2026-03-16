// Start writing JavaScript here!
'use strict'
const button = document.querySelector('button')
const body = document.body

button.addEventListener('click', ev => {
  body.classList.toggle('offsite-is-open')
})