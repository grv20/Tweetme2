import {backendLookup} from '../lookup'

export function apiTweetCreate(newTweet, callback){
    //handles tweet-create request from front end and format it to send it to backend
    backendLookup("POST", "/tweets/create/", callback, {content:newTweet})
  }

export function apiTweetAction(tweetId, action, callback){
  //handles tweet-create request from front end and format it to send it to backend
  const data = {id: tweetId, action: action}
  console.log(tweetId)
  backendLookup("POST", "/tweets/action/", callback, data)
}

export function apiTweetFeed(callback, nextUrl){
  //handles tweet-load request from front end and format it to send it to backend
  let endpoint = "/tweets/feed/"
  if(nextUrl !== null && nextUrl !== undefined){
    endpoint = nextUrl.replace("http://localhost:8000/api", "")
  }
  backendLookup("GET",endpoint, callback)
  }

export function apiTweetList(username, callback, nextUrl){
  //handles tweet-load request from front end and format it to send it to backend
  let endpoint = "/tweets/"
  if (username){
    endpoint = `/tweets/?username=${username}`
  }
  if(nextUrl !== null && nextUrl !== undefined){
    endpoint = nextUrl.replace("http://localhost:8000/api", "")
  }
  backendLookup("GET",endpoint, callback)
  }

export  function apiTweetDetail(tweetId, callback){
  backendLookup("GET",`/tweets/${tweetId}/`, callback)
}