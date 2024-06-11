const homeURL = 'http://localhost:8080/'
const menu = [
  {
    text: 'Планеты',
    url: 'spaceobjects.html'
  },
  {
    text: 'Луна',
    url: 'spaceobjects/moon.html'
  },
  {
    text: 'Корабли',
    url: 'spaceships.html'
  },
  {
    text: 'Буран',
    url: 'spaceships/buran.html'
  }
]

const props = {
  prerender: true,
  homeURL,
  menu
}

export { props }
