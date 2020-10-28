import React, {useEffect, useState} from 'react';
import {apiTweetList, apiTweetCreate, apiTweetAction} from './lookup';

export function TweetsComponent(props){
  //it is main custom tag which is getting rendered into django
  const textAreaRef = React.createRef()
  const [newTweets, setNewTweets] = useState([])

  const canTweet = props.canTweet === "false" ? false : true
  const handleBackendUpdate = (response, status) =>{
    //backend api response handler
    //it will be called when new tweet submitted
    let tempNewTweets = [...newTweets] //taking any number of args
    // The rest parameter operator is used in function parameter lists 
    //with the format: ...variable and it will include within that variable 
    //the entire list of uncaptured arguments that the function was called with
    //console.log(newTweets.length)//counts tweet posted without refreshing
    if (status === 201){
      tempNewTweets.unshift(response)
      setNewTweets(tempNewTweets) //when set is used it will discard previous state
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
          {canTweet === true && 
          <div className='col-12 mb-3'>
            <form onSubmit={handleSubmit}>
              <textarea ref={textAreaRef}required={true} className='form-control' name='tweet'>

              </textarea>
              <button type='submit' className='btn btn-primary my-3'>Tweet</button>
            </form>
          </div>}
          <TweetsList newTweets={newTweets} {...props} />
    </div>
}



export function TweetsList(props){
  //it will be called at start to load tweets
  //and then every time a new tweet is submitted
    //console.log(props)
    const [tweetsInit, setTweetsInit] = useState([])//to make account of tweets when page refreshed
    const [tweets, setTweets] = useState([])//the final set of tweets to display 
    const [tweetsDidSet, setTweetsDidSet] = useState(false)//to check if this fun is called initially
    // or when new tweet submitted

    useEffect(() =>{
      //you tell React that your component needs to do something after render.
      // React will remember the function you passed
      //and call it later after performing the DOM updates.
      //Effects are declared inside the component so they have access to its props and state.
      // By default, React runs the effects after every render — including the first render
      //Every time we re-render, we schedule a different effect, replacing the previous one. 
      //In a way, this makes the effects behave more like a part of the render result
      const final = [...props.newTweets].concat(tweetsInit)
      if (final.length !== tweets.length) {
        setTweets(final)
      }

    }, [props.newTweets, tweets, tweetsInit])

    useEffect(() =>
    {
      //for getting tweet list initially when page is loaded.
      if (tweetsDidSet === false){
      const handleTweetListLookup = (response, status) => {
        //console.log(response,status)
        if(status === 200){
          setTweetsInit(response)
          setTweetsDidSet(true)//to know this was called when loading the page
          //on setting true when new tweets added, this callback wont run!
  
        }
        else{
          alert("There was an error")
        }
        
      }
      // do my lookup
      //we are passing a function as an argument to another function
      //It will be async callback since first request to load tweets willbe made
      //and depending on response myCallback will be called 
      apiTweetList(props.username,handleTweetListLookup);

      }
      //The Map object holds key-value pairs and remembers the original insertion order of the keys.
    }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username]) //[] it is dependency array, to denote what this useeffect is dependent on.
    //index in map function denotes position of item within array

    const handleDidRetweet = (newTweet) => {
      //update tweetlist when retweet action is performed 
      const updateTweetsInit  = [...tweetsInit]
      updateTweetsInit.unshift(newTweet)
      setTweetsInit(updateTweetsInit)
      const updateFinalTweets  = [...tweets]
      updateFinalTweets.unshift(tweets)
      setTweets(updateFinalTweets)
      //console.log(tweets)

    }

    return tweets.map((item,index)=>{
      return <Tweet
       didRetweet = {handleDidRetweet}  
       tweet={item} className='my-5 py-5 border bg-white text-dark'
        key={`${index}-item.id`} />
    }
    )
    //Keys help React identify which items have changed, are added, or are removed.
    // Keys should be given to the elements inside the array to give the elements a stable identity
  
  }

export function ParentTweet(props){
  const {tweet} = props
  return tweet.parent ? <div className='row'>
            <div className='col-11 mx-auto p-3 border rounded'>
              <p className='mb-0 text-muted small'>Retweet</p>
              <Tweet hideActions className={' '} tweet={tweet.parent} />
            </div>
          </div> : null

}

export function Tweet(props){
  //props are argument passed to react components
  //props are an object, do console.log to find it out
  //console.log(props)
  const {tweet, didRetweet, hideActions} = props
  const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
  //console.log(actionTweet)
  //console.log(tweet)
  const className = props.className ? props.className : 'col-10mx-auto cold-md-6'

  const handlePerformAction = (newActionTweet, status) => {
    //to perform some action when orignal tweet came to know its been retweeted, liked or unliked.
    if (status === 200){
      console.log(newActionTweet)
      setActionTweet(newActionTweet)
    } else if (status === 201){
      if (didRetweet){
        didRetweet(newActionTweet)
      }
      //let the tweet list know
    }
    
  }

  return  <div className={className}>
            <div>
              <p>{tweet.id} - {tweet.content}</p>
              <ParentTweet tweet={tweet} />
              </div>
            {(actionTweet && hideActions !== true) && <div className='btn btn-group'>
              <ActionBtn  tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"like", display:"Likes"}} />
              <ActionBtn  tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"unlike", display:"UnLike"}} />
              <ActionBtn  tweet={actionTweet} didPerformAction={handlePerformAction} action={{type:"retweet", display:"Retweet"}} />
            </div>
            }
          </div>
}

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
  
