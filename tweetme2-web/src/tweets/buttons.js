import React from 'react';
import {apiTweetAction} from './lookup';

export function ActionBtn(props) {
    const {tweet,action, didPerformAction} = props
    const likes = tweet.likes ? tweet.likes : 0
    //const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    //argument passed to useState sets initial state of first parameter i.e. likes
    //The setState function is used to update the state. 
    //It accepts a new state value and enqueues a re-render of the component.
    //Normally, variables “disappear” when the function exits but state variables are preserved by React.
    //likes is variable(initialized with tweet.likes or 0) and setLikes is function
    //const [userLike, setUserLike] = useState(tweet.userLike === true ? true : false)
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
  
