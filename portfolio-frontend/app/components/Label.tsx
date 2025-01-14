import React from 'react'
import { labelProps } from 'utils/label'


export default function Label(props: labelProps) {
  return (
    <React.Fragment>
        <label htmlFor={props.htmlFor} className={props.className}>{props.name}</label>
    </React.Fragment>
  )
}
