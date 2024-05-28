import './O_SearchBar.scss'
import React from 'react'
import { getPostTeasers } from '../../search-vanilla-data.js'

import M_SearchForm from '../M_SearchForm/M_SearchForm.jsx'
import M_PostSuggestion from '../M_PostSuggestion/M_PostSuggestion.jsx'

export default class O_SearchBar extends React.Component {
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

  handleSearchInput = (searchInputValue) => {
    let isSearchButtonDisabled = true

    if (searchInputValue.length >= 3) {
      isSearchButtonDisabled = false
    }

    this.setState({
      isSearchButtonDisabled,
      searchInputValue
    })
  }

  handleSearchSubmit = () => {
    const { searchInputValue } = this.state

    if (searchInputValue.length >= 3) {
      console.log('Submit')

      const separator = ':8080/'
      // const separator = '.adc.ac/'
      const url = window.location.href.split(separator)[0]
      window.location.href =
        url + separator + 'search.html?request=' + searchInputValue
    }
  }

  renderPostSuggestions = () => {
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
          <M_PostSuggestion
            title={title}
            description={description}
            key={teaser.id}
            url={teaser.url}
          />
        )
      }
    })

    return <div className="C_PostSuggestions">{posts}</div>
  }

  render() {
    const { isSearchButtonDisabled, searchInputValue } = this.state

    return (
      <div className="O_SearchBar">
        <M_SearchForm
          isSearchButtonDisabled={isSearchButtonDisabled}
          searchInputValue={searchInputValue}
          handleSearchInput={this.handleSearchInput}
          handleSearchSubmit={this.handleSearchSubmit}
        />

        {searchInputValue.length >= 3 &&
          !isSearchButtonDisabled &&
          this.renderPostSuggestions()}
      </div>
    )
  }
}
