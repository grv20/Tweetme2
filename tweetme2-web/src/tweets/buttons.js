import React from 'react';
import {apiTweetAction} from './lookup';

export function ActionBtn(props) {
    const {tweet,action, didPerformAction} = props
    const likes = tweet.likes ? tweet.likes : 0
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    
    const handleActionBackendEvent = (response, status) => {
      console.log(status, response)
      if ((status === 200 || status === 201) && didPerformAction){
        //when some action is performed on tweet, handlePerform action is calld from here.
        //basically its way of letting parent tweet know, some action is performed on them.
        didPerformAction(response, status)
        
      }
  

    }
    const handleClick = (event) => {
      event.preventDefault()
      apiTweetAction(tweet.id, action.type, handleActionBackendEvent)
      
    }
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : `${actionDisplay}` 
    return <button className={className} onClick={handleClick}> {display} </button>
  }
  
