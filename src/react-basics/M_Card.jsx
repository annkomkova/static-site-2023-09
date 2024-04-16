import React from 'react'

import A_Title from './A_Title.jsx'

export default class M_Card extends React.Component {
  render() {
    return (
      <div className="M_Card">
        <A_Title title={this.props.title} />
        <p>{this.props.description}</p>
      </div>
    )
  }
}
