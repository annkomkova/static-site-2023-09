// import './S_MenuBar.scss'
import React from 'react'

import { getPostTeasers } from '../../search-vanilla-data.js'
import O_SearchBar from '../O_SearchBar/O_Searchbar.jsx'
import A_MainMenu from '../A_MainMenu/A_MainMenu.jsx'

export default class S_MenuBar extends React.Component {
  constructor(props) {
    super(props)

    const searchInputValue = props.prerender ? '' : props.searchInputValue

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
    const { prerender } = this.props

    if (prerender == undefined) {
      if (searchInputValue.length >= 3) {
        window.location.href =
          homeURL + 'search.html?request=' + searchInputValue
      }
    }
  }

  render() {
    const { searchInputValue, isSearchButtonDisabled, postTeasers } = this.state
    const menuElements = []
    const { menu, homeURL, prerender } = this.props
    const currentURL = prerender == undefined ? window.location.href : ''

    menu.forEach((menuItem, i) => {
      const { text, url } = menuItem
      const linkURL = homeURL + url

      menuElements.push(
        <A_MainMenu
          current={linkURL == currentURL}
          text={text}
          url={linkURL}
          type="mainMenuItem"
          key={i}
        />
      )
    })

    return (
      <>
        <A_MainMenu
          current={false}
          text="Главная"
          url={homeURL}
          type="mainMenuLogo"
        />

        <div className="C_MainMenu">{menuElements}</div>

        <O_SearchBar
          searchInputValue={searchInputValue}
          isSearchButtonDisabled={isSearchButtonDisabled}
          postTeasers={postTeasers}
          handleSearchInput={this.handleSearchInput}
          handleSearchSubmit={this.handleSearchSubmit}
        />
      </>
    )
  }
}
