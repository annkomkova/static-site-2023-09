import './S_SearchContent.scss'
import React from 'react'
import { getPostTeasers } from '../../search-vanilla-data.js'

import M_PostTeaser from '../M_PostTeaser/M_PostTeaser.jsx'

export default class S_SearchContent extends React.Component {
  constructor(props) {
    super(props)

    const { searchInputValue } = this.props

    this.state = {
      isSearchButtonDisabled: true,
      postTeasers: [],
      searchInputValue
    }
  }

  componentDidMount() {
    getPostTeasers().then((data) => {
      this.setState({
        postTeasers: data
      })
    })
  }

  renderPostTeasers = () => {
    const { postTeasers } = this.state
    let posts = []
    const searchInputValue = this.state.searchInputValue.toLowerCase()
    // postTeasers.forEach((teaser) => {
    //   posts.push(teaser.title)
    // })

    postTeasers.forEach((teaser) => {
      const nbspRegex = /[\u202F\u00A0]/gm
      const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/gm

      const title = teaser.title
        .replaceAll(nbspRegex, ' ')
        .replaceAll(punctuationRegex, '')
        .toLowerCase()

      const description = teaser.description
        .replaceAll(nbspRegex, ' ')
        .replaceAll(punctuationRegex, '')
        .toLowerCase()

      if (
        title.includes(searchInputValue) ||
        description.includes(searchInputValue)
      ) {
        posts.push(
          <M_PostTeaser
            title={title}
            description={description}
            key={teaser.id}
            url={teaser.url}
            image={teaser.image}
            tags={teaser.tags}
          />
        )
      }
    })

    return posts
  }

  render() {
    return <div className="S_SearchContent">{this.renderPostTeasers()}</div>
  }
}
