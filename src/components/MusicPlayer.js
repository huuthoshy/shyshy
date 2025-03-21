import React, { useState } from 'react'
import '../Style/MusicPlayer.css'
import { TfiControlSkipBackward } from "react-icons/tfi";
import { TfiControlBackward } from "react-icons/tfi";
import { TfiControlPlay } from "react-icons/tfi";
import { TfiControlPause } from "react-icons/tfi";
import { TfiControlForward } from "react-icons/tfi";
import { TfiControlSkipForward } from "react-icons/tfi";
import { TfiControlShuffle } from "react-icons/tfi";
import { TfiLoop } from "react-icons/tfi";

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Nếu có audio, có thể thêm logic play/pause ở đây luôn
    const audio = document.querySelector('audio');
    if (audio) {
      if (!isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }

  return (
    <div className="musicPlayer">
      <div className="songAttributes">

        <audio src="" preload="metadata" />

        <div className="top">
          <div className="left">
            {/* Nút phát ngẫu nhiên */}
            <i><TfiControlShuffle /></i>
          </div>
          <div className="middle">
            {/* Nút lùi trở lại */}
            <div className="back">
              <i><TfiControlSkipBackward /></i>
              <i><TfiControlBackward /></i>
            </div>
            {/* Nút phát tiếp hoặc dừng */}
            <div className="pPlayPause" onClick={handlePlayPause}>
              {isPlaying ? (
                <i><TfiControlPause /></i>
              ) : (
                <i><TfiControlPlay /></i>
              )}
            </div>
            <div className="forward">
              <i><TfiControlForward /></i>
              <i><TfiControlSkipForward /></i>
            </div>
          </div>
          <div className="right">
            <i><TfiLoop /></i>
          </div>
        </div>
        <div className="bottom">
            <div className="currentTime">00:00</div>
            <input type="range" min="0" max="100" step="1" />
            <div className="duration">00:00</div>
        </div>
      </div>
    </div>
  )
}

export { MusicPlayer }
