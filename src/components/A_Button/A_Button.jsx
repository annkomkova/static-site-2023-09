// import './A_Button.scss'
import React from 'react'
import classNames from 'classnames'

export default class A_Button extends React.Component {
  render() {
    const { text, handleClick, disabled, type } = this.props

    const classes = classNames({
      A_Button: true,
      disabled: disabled,
      [`${type}`]: true
    })

    return (
      <div className={classes} onClick={handleClick}>
        {text}
      </div>
    )
  }
}
