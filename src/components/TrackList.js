import React from 'react'
import dvdImg from '../img/dvd.png'; // Import ảnh
import { IoVolumeMediumOutline } from "react-icons/io5";


function TrackList() {
  return (
    <div className="trackList">
      <div className="top">
      <img src={dvdImg} alt="DVD" />
        <p>Sample Name
            <span>
                Artist
            </span>     
        </p>
      </div>
      <hr/>
      <div className="bottom">
        <i> <IoVolumeMediumOutline /> </i>
        <input type="range" />
      </div>
    </div>
  )
}

export {TrackList}
