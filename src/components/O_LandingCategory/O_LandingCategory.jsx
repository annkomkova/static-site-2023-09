// import './A_Input.scss'
import React from 'react'

import M_LandingPostTeaser from '../M_LandingPostTeaser/M_LandingPostTeaser.jsx'

export default class O_LandingCategory extends React.Component {
  render() {
    const { name, posts } = this.props

    const postElements = []
    posts.forEach((post, i) => {
      postElements.push(<M_LandingPostTeaser {...post} key={i} />)
    })
    return (
      <div className="O_LandingCategory">
        <h2>{name}</h2>

        <div className="W_LandingPostTeasers">{postElements}</div>
      </div>
    )
  }
}
