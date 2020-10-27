import {backendLookup} from '../lookup'

export function apiTweetCreate(newTweet, callback){
    //handles tweet-create request from front end and format it to send it to backend
    backendLookup("POST", "/tweets/create/", callback, {content:newTweet})
  }

export function apiTweetAction(tweetId, action, callback){
  //handles tweet-create request from front end and format it to send it to backend
  const data = {id: tweetId, action: action}
  backendLookup("POST", "/tweets/action/", callback, data)
}

export function apiTweetList(callback){
  //handles tweet-load request from front end and format it to send it to backend
  backendLookup("GET","/tweets/", callback)
  }