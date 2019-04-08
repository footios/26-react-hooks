import React, { useState } from 'react'

const todo = props => {
    /* useState('...') takes an initial state and it returns an array with 2 elements. 
    The 1st is the current state. 
    The 2nd is a function we can use to manipulate that state. */
const inputState =  useState('')

const inputStateHandler = (event) => {
    inputState[1](event.target.value)
}

    /* With React.Fragment we can have top level siblings */
    return <React.Fragment> 
<input type='text' placeholder='Todo' onChange={inputStateHandler} value={inputState[0]} />
<button type='button'>Add</button>
<ul>

</ul>
    </React.Fragment>
}

export default todo; 