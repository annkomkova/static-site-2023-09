import './slider.css'

let currentSlide = 0

function toggleModal() {
  const body = document.body
  body.classList.toggle('modal')
}

function toggleAside() {
  const post = document.querySelector('.post')
  post.classList.toggle('aside')
}

function slide(direction) {
  const rail = document.querySelector('.rail')

  if (direction === 'next') {
    currentSlide++
  } else if (direction === 'prev') {
    currentSlide--
  }

  rail.style.transform = 'translateX(-' + currentSlide * 664 + 'px)'
}

document.addEventListener('DOMContentLoaded', (e) => {
  const postTeasers = document.getElementsByClassName('postTeaser')
  const modalFader = document.querySelector('.fader')
  const asideButton = document.querySelector('.asideButton')
  const sliderButtonLeft = document.querySelector('.sliderButton.left')
  const sliderButtonRight = document.querySelector('.sliderButton.right')

  for (var i = 0; i < postTeasers.length; i++) {
    postTeasers[i].addEventListener('click', toggleModal)
  }

  modalFader.addEventListener('click', toggleModal)
  asideButton.addEventListener('click', toggleAside)

  sliderButtonLeft.addEventListener('click', () => {
    slide('prev')
  })

  sliderButtonRight.addEventListener('click', () => {
    slide('next')
  })
})
