import './M_SearchForm.scss'
import React from 'react'

import A_Input from '../A_Input/A_Input.jsx'

export default class M_SearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
  }

  handleInput = (value) => {
    this.setState({
      value
    })
  }

  render() {
    const { value } = this.state
    return (
      <div className="M_SearchForm">
        <A_Input value={value} handleInput={this.handleInput} />
      </div>
    )
  }
}
