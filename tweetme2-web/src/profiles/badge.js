import React, {useEffect, useState} from 'react'
import {apiProfileDetail, apiProfileFollowToggle} from './lookup'
import {UserDisplay, UserPicture} from './components'

function ProfileBadge(props){
    const {user, didFollowToggle, profileLoading} = props
    let currentVerb = (user && user.is_following) ? "Unfollow" : "Follow"
    currentVerb = profileLoading ? "Loading..." : currentVerb
    const handleFollowToggle = (event) => {
        event.preventDefault()
        if (didFollowToggle && !profileLoading){
            //if profile loading set to false, can toggle the action.
            //profile loading set to true when sending one request, so that you cant toggle it.
            didFollowToggle(currentVerb)
        }
    }
    return user ? <div>
        <UserPicture user={user} hideLink />
        <p><UserDisplay user={user} includeFullName hideLink></UserDisplay></p>
        <button className='btn btn-primary' onClick={handleFollowToggle}>{currentVerb}</button>
        </div> : null
}

export function ProfileBadgeComponent(props){
    const {username} = props
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)

    const handleBackendLookup = (response, status) => {
        if (status === 200){
            setProfile(response)
        } 
    }

    useEffect(() =>{
        if (didLookup === false){
            apiProfileDetail(username, handleBackendLookup)
            //to fetch profile data initially
            setDidLookup(true)
            //so as to know initial data fetched
        }
    },[username, didLookup, setDidLookup])

    const handleNewFollow = (actionVerb) => {
        apiProfileFollowToggle(username, actionVerb, (response, status)=>{
            console.log(response,status)
            if(status === 200){
                setProfile(response)
                //that is request was valid, action was completed and profile updated
            }
            setProfileLoading(false)
            //profileloading set to false, so that we can toggle again
        })
        setProfileLoading(true)
        //profile loading set to true when sending one request.
    }

    return didLookup === false ? "Loading..." : profile ? <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading} /> : null
}