document.addEventListener('DOMContentLoaded', () => {
  const categories = Array.from(
    document.getElementsByClassName('table__item-category')
  )
  const scores = Array.from(
    document.getElementsByClassName('table__item-score')
  )
  const icons = Array.from(document.getElementsByClassName('table__item-icon'))
  const average = document.querySelector('.result__average')
  const scoresArr = []

  fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      categories.forEach((category, i) => {
        category.innerHTML = data[i].category
      })

      scores.forEach((score, i) => {
        const dataScore = data[i].score
        score.innerHTML = dataScore
        scoresArr.push(dataScore)
      })

      icons.forEach((icon, i) => {
        icon.src = data[i].icon
      })

      average.innerHTML = (
        scoresArr.reduce((acc, number) => acc + number, 0) / scoresArr.length
      ).toFixed()
    })
})
