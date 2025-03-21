import React from 'react';
import '../Style/LeftMenu.css';
import { Menu } from './Menu';
import { MenuList } from './MenuList';
import { MenuPlayList } from './MenuPlayList';

// import icon logo vào
import { FcFlashOn } from "react-icons/fc";
import { CgMore } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { TrackList } from './TrackList';

// ✅ Nhận prop menuColor
function LeftMenu({ menuColor }) {
  return (
    <div className='leftMenu' style={{ background: menuColor }}>
      {/* Logo */}
      <div className="logoContainer">
        <i>
          <FcFlashOn />
        </i>
        <h2>Jet Music</h2>
        <i>
          <CgMore />
        </i>
      </div>

      {/* Tìm kiếm */}
      <div className="searchBox">
        <input type="text" placeholder='   Tìm kiếm...' />
        <i className="searchIcon">
          <FiSearch />
        </i>
      </div>

      <Menu title={'Menu'} menuOject={MenuList} />
      <MenuPlayList />
      <hr />
      <TrackList />
    </div>
  );
}

export { LeftMenu };
