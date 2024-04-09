import './search-vanilla.css'
import { getPostTeasers } from './search-vanilla-data'

let content

function initSearch() {
  const O_Search = document.querySelector('.O_Search')
  const A_SearchInput = O_Search.querySelector('.A_SearchInput')
  const A_Button = O_Search.querySelector('.A_Button')

  let requestText = getSearchRequest() //посмотрели адрес поиска ???

  if (requestText != undefined) {
    A_SearchInput.value = requestText //закидываем, чтобы не стиралось значение

    if (content) {
      SearchContent(requestText) //если есть контент, запускаем рендер контента
    }
  } else {
    A_SearchInput.value = ''
  }

  A_SearchInput.addEventListener('input', (e) => {
    requestText = e.target.value

    if (requestText.length >= 3) {
      A_Button.classList.remove('disabled')
    } else {
      A_Button.classList.add('disabled')
    }

    console.log(content)
  })

  A_SearchInput.addEventListener('keydown', (e) => {
    requestText = e.target.value

    if (e.key === 'Enter') {
      setSearchRequest(requestText)
    }
  })

  A_Button.addEventListener('click', (e) => {
    if (!e.target.classList.contains('disabled')) {
      requestText = A_SearchInput.value
      setSearchRequest(requestText)
      SearchContent(requestText)
    }
  })
}

//извлекает текст поискового запроса из параметра URL страницы, если он есть
function getSearchRequest() {
  // Создаем новый объект URL, чтобы получить доступ к параметрам поиска в URL
  const url = new URL(window.location.href)
  // Создается объект URLSearchParams, который содержит параметры поискового запроса из URL.
  const searchParams = new URLSearchParams(url.search)

  // Проверяем, есть ли параметр request в URL.
  // Если есть, возвращаем значение этого параметра
  if (searchParams.has('request')) {
    return searchParams.get('request')
  }
}

// устанавливает поисковой запрос в URL страницы, добавляя его к текущему адресу
function setSearchRequest(requestText) {
  // Получаем путь URL без параметров.
  const url = window.location.href.split('?')[0]

  // Устанавливаем новый URL с добавлением параметра request.
  window.location.href = url + '?request=' + requestText
}

//фильтрует контент на основе поискового запроса и отображает
// только соответствующий контент или выводит сообщение "Ничего не найдено"

function SearchContent(requestText) {
  //запускаем рендер
  const contentItemsContainer = document.querySelector('.S_Content')
  contentItemsContainer.innerHTML = ''

  let contentItemIds = []

  content.forEach((contentItem) => {
    // обрабатываем контент. для каждой карточки нам нужно сотворить что-то страшное
    const nbspRegex = /[\u202F\u00A0]/gm //ищет неразрывные пробелы (`\u202F` и `\u00A0`) в глобальном контексте (`gm`).

    const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/gm //ищет знаки пунктуации в глобальном контексте.
    let { title, description } = contentItem

    title = title.replaceAll(nbspRegex, ' ') //замена всех найденных неразрывных пробелов (из `nbspRegex`) в строке `title` на обычные пробелы.
    title = title.replaceAll(punctuationRegex, '') //Здесь происходит удаление всех знаков пунктуации (из `punctuationRegex`) из строки `title`.

    description = description.replaceAll(nbspRegex, ' ') //замена всех найденных неразрывных пробелов (из `nbspRegex`) в строке `description` на обычные пробелы.
    description = description.replaceAll(punctuationRegex, '') //удаление всех знаков пунктуации (из `punctuationRegex`) из строки `description`.

    if (requestText.length >= 3) {
      if (title.includes(requestText) || description.includes(requestText)) {
        contentItemIds.push(contentItem.id)
      }
    } else {
      contentItemIds.push(contentItem.id)
    }
  })

  if (contentItemIds.length > 0) {
    renderCardsByIds(contentItemsContainer, contentItemIds)
    //если не пусто, запускаем создание карточек по идентификатору
  } else {
    renderNothingFound() //иначе выводим ошибку
  }
}

//ошибка при рендере
function renderNothingFound() {
  const contentItemsContainer = document.querySelector('.S_Content')
  contentItemsContainer.innerHTML = 'Ничего не найдено'
}

//отображает карточки контента по их идентификаторам в указанном контейнере
function renderCardsByIds(container, ids) {
  ids = [...new Set(ids)] // создаём множество уникальных значений из-за особенностей Set

  ids.forEach((id) => {
    //для каждого id
    content.forEach((item) => {
      //для каждого объекта со строкой с инфой из БД
      if (item.id === id) {
        //если идентификаторы совпадают
        container.appendChild(createContentCard(item)) //создаём карточку
      }
    })
  })
}

//создает карточку контента на основе переданных данных, таких как изображение, теги, название и описание
function createContentCard(contentItemData) {
  const contentItem = document.createElement('div')
  contentItem.classList.add('O_ContentItem')

  const contentItemCover = document.createElement('img')
  contentItemCover.classList.add('A_ContentItemCover')
  contentItemCover.src = contentItemData.image

  const contentItemTitle = document.createElement('h2')
  contentItemTitle.classList.add('A_ContentItemTitle')
  contentItemTitle.innerText = contentItemData.title

  const contentItemDescription = document.createElement('p')
  contentItemDescription.classList.add('A_ContentItemDescription')
  contentItemDescription.innerText = contentItemData.description

  const contentItemTags = document.createElement('div')
  contentItemTags.classList.add('C_ContentItemTags')

  contentItemData.tags.forEach((tag) => {
    const contentItemTag = document.createElement('div')
    contentItemTag.classList.add('A_ContentItemTag')
    contentItemTag.innerText = tag
    contentItemTags.appendChild(contentItemTag)
  })

  contentItem.appendChild(contentItemCover)
  contentItem.appendChild(contentItemTitle)
  contentItem.appendChild(contentItemDescription)
  contentItem.appendChild(contentItemTags)

  return contentItem
}

document.addEventListener('DOMContentLoaded', () => {
  getPostTeasers().then((data) => {
    content = data
    initSearch()
  })
})
