// import './O_SearchBar.scss'
import React from 'react'

import M_SearchForm from '../M_SearchForm/M_SearchForm.jsx'
import M_PostSuggestion from '../M_PostSuggestion/M_PostSuggestion.jsx'

export default class O_SearchBar extends React.Component {
  renderPostSuggestions = () => {
    const { postTeasers } = this.props
    let posts = []
    const searchInputValue = this.props.searchInputValue.toLowerCase()
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
    const {
      isSearchButtonDisabled,
      searchInputValue,
      handleSearchInput,
      handleSearchSubmit
    } = this.props

    return (
      <div className="O_SearchBar">
        <M_SearchForm
          isSearchButtonDisabled={isSearchButtonDisabled}
          searchInputValue={searchInputValue}
          handleSearchInput={handleSearchInput}
          handleSearchSubmit={handleSearchSubmit}
        />

        {searchInputValue.length >= 3 &&
          !isSearchButtonDisabled &&
          this.renderPostSuggestions()}
      </div>
    )
  }
}
