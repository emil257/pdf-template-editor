import React from 'react'
import './index.css'

export default function index(props) {
  return (
    <div style={{height: props.height + 'px'}} className={`section ${props.selected ? "selected" : ""}`} onClick={() => props.handleSelected(props.id)}>
      {props.title}
    </div>
  )
}
