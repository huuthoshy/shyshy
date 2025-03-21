import React from 'react'

import Check from '../img/check.png'
import Artist from '../img/Artist.png'
import { FaHeadphonesAlt } from "react-icons/fa";
import { TbArrowBack } from "react-icons/tb";

function Banner() {
  return (
    <div className="banner">
      <img src={Artist} alt="" className="bannerImg" />
        <div className="content">

            <div className="breadCrump">
                <p> Home/
                    <span> #</span>
                </p>
                <i>
                    <TbArrowBack />
                </i>
            </div>

            <div className="artist">

                <div className="left">
                    <div className="name">
                        <h2>Sơn Tùng M-TP</h2>
                        <img src={Check} alt=""></img>
                    </div>
                    
                    <p> <i><FaHeadphonesAlt /></i> {" "} 11,111,111 <span>Follower</span> </p>
                </div>

                <div className="right">
                    <button> Play </button>

                    <button> ✓ Follow </button>
                </div>

            </div>

        </div>
        <div className="bottomLayer"></div>
    </div>
  )
}

export {Banner}
