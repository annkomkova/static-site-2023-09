import query from 'static-source-data/query'

let indexData = query('indexData')

const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

const React = require('react')
const ReactDOMServer = require('react-dom/server')

const S_LandingContent =
  require('./components/S_LandingContent/S_LandingContent.jsx').default

let categoryNames = []
const categories = []

indexData['records'].forEach((post) => {
  categoryNames.push(...post['fields']['Tags'])
})
categoryNames = [...new Set(categoryNames)]

categoryNames.forEach((tag) => {
  const category = {
    name: tag,
    posts: []
  }

  indexData['records'].forEach((post) => {
    if (post['fields']['Tags'].includes(tag)) {
      category.posts.push({
        title: post['fields']['Title'],
        image: post['fields']['Image'],
        url: post['fields']['Url']
      })
    }
  })

  categories.push(category)
})

const props = {
  categories
}

const content = ReactDOMServer.renderToString(
  React.createElement(S_LandingContent, props)
)

export { content }
