import './A_Text.scss'
import React from 'react'
import classNames from 'classnames'

export default class A_Text extends React.Component {
  render() {
    const { text, type } = this.props

    const classes = classNames({
      A_Text: true,
      [`${type}`]: true
    })

    return <div className={classes}>{text}</div>
  }
}
