import React from 'react'

import A_Title from './A_Title.jsx'
import M_Card from './M_Card.jsx'

const workshops = [
  {
    date: '16 APR 2024',
    title: 'React basics workshop 08'
  },
  {
    date: '17 APR 2024',
    title: 'React basics workshop 09'
  }
]

export default class O_Container extends React.Component {
  render() {
    const cards = workshops.map((workshop, i) => {
      return (
        <M_Card key={i} title={workshop.title} description={workshop.date} />
      )
    })

    return (
      <div className="O_Container">
        <A_Title title="Title" />
        {cards}
      </div>
    )
  }
}
