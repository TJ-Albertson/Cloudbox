import React from "react"

import "../SCSS/List.scss"

export default function List(props) {

    let message = "blank"

    if(props.recent) {
        message = "recent"
    }
    if(props.starred) {
        message = "starred"
    }
    if(props.trash) {
        message = "trash"
    }

    return <div id="list" >{message}</div>
} 