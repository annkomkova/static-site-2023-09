import './M_PostTeaser.scss'
import React from 'react'

import A_Text from '../A_Text/A_Text.jsx'

export default class M_PostTeaser extends React.Component {
  render() {
    const { title, description, url } = this.props

    return (
      <a className="M_PostTeaser" href={url}>
        <A_Text type="h3" text={title} />
        <A_Text type="p" text={description} />
      </a>
    )
  }
}
