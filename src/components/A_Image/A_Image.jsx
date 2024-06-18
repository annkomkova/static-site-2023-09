// import './A_Image.scss'
import React from 'react'
import classNames from 'classnames'

export default class A_Image extends React.Component {
  render() {
    const { src, type } = this.props

    const classes = classNames({
      A_Image: true,
      [`${type}`]: true
    })

    return <img className={classes} src={src} />
  }
}
