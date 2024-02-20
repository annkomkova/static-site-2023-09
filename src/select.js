import './select.css'
import Cookies from 'js-cookie'

const selectOptions = [
  '#веловоскресенье',
  '#цветыпопонедельникам',
  '#архитектураповторникам',
  '#природнаясреда',
  '#жизненнаясреда',
  '#танцыпосредам',
  '#птицыпочетвергам',
  '#рыбныйчетверг',
  '#четвероногийчетверг',
  '#пятничныекотики',
  '#ачётаковапопятницам',
  '#субботниепёсики',
  '#субботнеефотодлядуши'
]

function initModal() {
  const openModal = document.querySelector('.openModal')
  const closeModal = document.querySelector('.closeModal')
  const modal = document.querySelector('.modal')

  openModal.addEventListener('click', () => {
    modal.classList.add('visible')
  })
  closeModal.addEventListener('click', () => {
    modal.classList.remove('visible')
  })
}

function initSwitch() {
  const checkbox = document.querySelector('input[type=checkbox]')

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      Cookies.set('theme', 'dark')
      switchTheme()
    } else {
      Cookies.remove('theme')
      switchTheme()
    }
  })
}

function switchTheme() {
  const body = document.querySelector('body')
  if (Cookies.get('theme') === 'dark') {
    body.classList.add('dark')
  } else {
    body.classList.remove('dark')
  }
}

function initSelect() {
  const select = document.querySelector('.O_Select')
  const optionList = document.querySelector('.C_selectOptionList')
  const selectInput = document.querySelector('.A_selectInput')
  const dropdownButton = document.querySelector('.A_selectDropdownButton')

  selectOptions.forEach((option) => {
    const listItem = document.createElement('div')
    listItem.classList.add('A_selectOptionListItem')
    listItem.innerText = option

    listItem.addEventListener('click', () => {
      const listItems = document.getElementsByClassName(
        'A_selectOptionListItem'
      )

      for (let index = 0; index < listItems.length; index++) {
        const element = listItems[index]
        element.classList.remove('active')
      }

      listItem.classList.add('active')
      selectInput.value = option
      select.classList.remove('visible')
    })

    optionList.appendChild(listItem)
  })

  select.addEventListener('click', () => {
    select.classList.add('visible')
  })
  dropdownButton.addEventListener('click', () => {
    select.classList.add('visible')
  })
}

document.addEventListener('DOMContentLoaded', () => {
  switchTheme()
  initModal()
  initSwitch()
  initSelect()
})
