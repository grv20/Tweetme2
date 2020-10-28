import React from 'react';
import {apiTweetCreate} from './lookup';

export function TweetCreate(props){
  const textAreaRef = React.createRef()
  const {didTweet} = props

  const handleBackendUpdate = (response, status) =>{
    if (status === 201){
      didTweet(response) //when set is used it will discard previous state
      // and update this state.. If there were 2 tweets in newTweets and now set is called
      // with 3rd update, then newTweets will contain 3, discarding previous state
      //console.log(newTweets)
    }else{
      console.log(response)
      alert("An error occured please try again")
    }
  }
  
  const handleSubmit = (event) => {
    //handles submit(on tweeting)
    event.preventDefault()
    const newVal = textAreaRef.current.value
    //backend api request
    apiTweetCreate(newVal, handleBackendUpdate)//second arg is 'callback' when tweet created
    textAreaRef.current.value = ''
  }

  return <div className={props.className}>
            <form onSubmit={handleSubmit}>
              <textarea ref={textAreaRef}required={true} className='form-control' name='tweet'>

              </textarea>
              <button type='submit' className='btn btn-primary my-3'>Tweet</button>
            </form>
          </div>

}








