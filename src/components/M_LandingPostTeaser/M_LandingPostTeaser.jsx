// import './M_PostTeaser.scss'
import React from 'react'

import A_Text from '../A_Text/A_Text.jsx'
import A_Image from '../A_Image/A_Image.jsx'

export default class M_LandingPostTeaser extends React.Component {
  render() {
    const { title, url, image } = this.props

    return (
      <a className="M_LandingPostTeaser" href={url}>
        <A_Image type="postTeaser" src={image} />
        <A_Text type="h3" text={title} />
      </a>
    )
  }
}
