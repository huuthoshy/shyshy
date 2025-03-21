import React, { useState, useEffect } from 'react';
import { HiOutlineClock } from "react-icons/hi2";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import '../Style/AudioList.css';
import {MusicPlayer} from './MusicPlayer';

function AudioList() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch('http://localhost:5000/songs');
        const data = await res.json();
        setSongs(data);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi lấy danh sách bài hát:', error);
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const toggleFavorite = async (songId, currentFavorite) => {
    setSongs(prevSongs =>
      prevSongs.map(song =>
        song._id === songId ? { ...song, favorite: !currentFavorite } : song
      )
    );
  
    try {
      const res = await fetch(`http://localhost:5000/songs/${songId}/favorite`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorite: !currentFavorite })
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.error('Lỗi cập nhật:', data.message);
  
        const fetchSongs = async () => {
          try {
            const res = await fetch('http://localhost:5000/songs');
            const data = await res.json();
            setSongs(data);
          } catch (error) {
            console.error('Lỗi lấy danh sách bài hát:', error);
          }
        };
        fetchSongs();
      }
    } catch (error) {
      console.error('Lỗi kết nối server:', error);
    }
  };

  return (
    <div className="audioList">
      <h2 className="title">
        Danh Sách Bài Hát : <span>{songs.length} Bài</span>
      </h2>

      <div className="songsContainer">
        {loading ? (
          <p>Đang tải bài hát...</p>
        ) : songs.length === 0 ? (
          <p>Không có bài hát nào!</p>
        ) : (
          songs.map((song, index) => (
            <div key={song._id}>
              <div className="songs">
                <div className="count">#{index + 1}</div>
                <div className="song">
                  <div className="imgBox">
                    <img src={song.imgUrl} alt={song.title} />
                  </div>

                  <div className="section">
                    <p className="songName">
                      {song.title}
                      <span className="spanArtist"> {song.artist}</span>
                    </p>

                    <div className="hits">
                      <p className="duration">
                        <i><HiOutlineClock /></i> {song.duration}
                      </p>

                      {/* Tim bấm thích/không thích */}
                      <div
                        className="favorite"
                        onClick={() => toggleFavorite(song._id, song.favorite)}
                        style={{ cursor: "pointer" }}
                      >
                        {song.favorite ? (
                          <i><GoHeartFill color="red" size={20} /></i>
                        ) : (
                          <i><GoHeart size={20} /></i>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="song-divider" />
            </div>
          ))
        )}
      </div>
      <MusicPlayer />
    </div>
  );
}

export { AudioList };
