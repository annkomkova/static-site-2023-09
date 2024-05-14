import './A_Input.scss'
import React from 'react'

export default class A_Input extends React.Component {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  handleInput = () => {
    const { value } = this.input.current
    const { handleInput } = this.props
    handleInput(value)
  }

  render() {
    const { value } = this.props
    return (
      <input
        className="A_Input"
        ref={this.input}
        value={value}
        onInput={this.handleInput}
      />
    )
  }
}
