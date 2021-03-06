import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ProfileBadgeComponent} from './profiles'
import {FeedComponent, TweetsComponent, TweetDetailComponent} from './tweets'
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
const appEl = document.getElementById('root')
if (appEl){
  ReactDOM.render(<App />, appEl);
}

const e = React.createElement
const tweetsEl = document.getElementById("tweetme-2")
if (tweetsEl){
  ReactDOM.render(
    e(TweetsComponent, tweetsEl.dataset),tweetsEl);
}

const tweetFeedEl = document.getElementById("tweetme-2-feed")
if (tweetFeedEl){
  ReactDOM.render(
    e(FeedComponent, tweetFeedEl.dataset),tweetFeedEl);
}

const tweetDetailElements = document.querySelectorAll(".tweetme-2-detail")

tweetDetailElements.forEach(container => {
  ReactDOM.render
  (e(TweetDetailComponent, container.dataset),
  container);
})

const userProfileBadgeElements = document.querySelectorAll(".tweetme-2-profile-badge")

userProfileBadgeElements.forEach(container => {
  ReactDOM.render
  (e(ProfileBadgeComponent, container.dataset),
  container);
})
//inside e first argument is which component to render
//second is what data to put       
//second arg inside render is where to put 
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
