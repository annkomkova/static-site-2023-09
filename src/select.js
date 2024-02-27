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

const multiSelectOptions = [
  {
    text: '#веловоскресенье',
    active: false
  },
  { text: '#цветыпопонедельникам', active: false },
  { text: '#архитектураповторникам', active: false },
  { text: '#природнаясреда', active: false },
  { text: '#жизненнаясреда', active: false },
  { text: '#танцыпосредам', active: false },
  { text: '#птицыпочетвергам', active: false },
  { text: '#рыбныйчетверг', active: false },
  { text: '#четвероногийчетверг', active: false },
  { text: '#пятничныекотики', active: false },
  { text: '#ачётаковапопятницам', active: false },
  { text: '#субботниепёсики', active: false },
  { text: '#субботнеефотодлядуши', active: false }
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
      select.classList.remove('focus')
    })

    optionList.appendChild(listItem)
  })

  dropdownButton.addEventListener('click', () => {
    select.classList.toggle('focus')
  })
  selectInput.addEventListener('click', () => {
    select.classList.toggle('focus')
  })
}

// _____________________________________________________________________

function initMultiSelect() {
  const select = document.querySelector('.O_multiSelect')
  const selectInput = document.querySelector('.C_multiSelectInput')
  const dropdownButton = document.querySelector('.A_multiSelectDropdownButton')

  updateSelectOptionList()

  dropdownButton.addEventListener('click', () => {
    select.classList.toggle('focus')
  })
  selectInput.addEventListener('click', () => {
    select.classList.toggle('focus')
  })
}

function createChip(option) {
  //старый способ вытащить ключи из объекта
  // const text = option.text
  // const active = option.active

  //мы вытаскиваем любое колич-во ключей из объекта option
  const { text } = option

  const chipElement = document.createElement('div')
  const chipElementText = document.createElement('span')
  const chipElementButton = document.createElement('span')

  chipElement.classList.add('A_multiSelectChip')
  chipElementText.classList.add('Q_multiSelectChipText')
  chipElementButton.classList.add('Q_multiSelectChipButton')

  chipElementText.innerText = text

  chipElementButton.addEventListener('click', () => {
    updateSelectData(option) // вызываем функцию, которая сменит active на false при удалении чипсов
    updateSelectOptionList()
    chipElement.remove()
  })

  chipElement.appendChild(chipElementText)
  chipElement.appendChild(chipElementButton)

  return chipElement
}

function updateSelectData(option) {
  multiSelectOptions.forEach((o) => {
    if (o.text === option.text) {
      o.active = !option.active
    }
  })
}

function updateSelectOptionList() {
  const optionList = document.querySelector('.C_multiSelectOptionList')
  const chips = document.querySelector('.C_multiSelectInput')
  const select = document.querySelector('.O_multiSelect')

  optionList.innerHTML = ''

  multiSelectOptions.forEach((option) => {
    const { text, active } = option

    if (!active) {
      const listItem = document.createElement('div')
      listItem.classList.add('A_multiSelectOptionListItem')
      listItem.innerText = text

      listItem.addEventListener('click', () => {
        updateSelectData(option)
        updateSelectOptionList()

        const chipElement = createChip(option)
        chips.appendChild(chipElement)

        select.classList.remove('focus')
      })

      optionList.appendChild(listItem)
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  switchTheme()
  initModal()
  initSwitch()
  initSelect()
  initMultiSelect()
})
