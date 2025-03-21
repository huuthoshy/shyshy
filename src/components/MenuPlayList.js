import React from 'react'
import { GrAdd } from "react-icons/gr";
import {PlayList} from './PlayList';

import { HiOutlineViewGridAdd } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";

function MenuPlayList() {
  return (
    <div className='playListContainer'>
      <div className="nameContainer">
        <p>PlayList</p>

        <i><GrAdd /></i>

      </div>

      <div className="playListScroll">

        {
            PlayList && PlayList.map((playList) => (

                <div className="playList" key={playList.id}>
      
                <i className="list"> <HiOutlineViewGridAdd  /> </i>
        
                <p>{playList.name}</p>
        
                <i className="trash"> <AiOutlineDelete /> </i>
        
                </div>
            ))
        }
      </div>
    </div>
  )
}

export  {MenuPlayList}
