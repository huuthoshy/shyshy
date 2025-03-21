import React, { useState } from 'react';
import '../Style/RightMenu.css';
import rightMenuBg from '../img/RightMenu Background.jpg';
import { FiLogOut } from 'react-icons/fi'; // Import icon đăng xuất

function RightMenu({ menuColor, setMenuColor }) {
  const [showColorMenu, setShowColorMenu] = useState(false);

  const toggleColorMenu = () => {
    setShowColorMenu(!showColorMenu);
  };

  const handleColorChange = (color) => {
    setMenuColor(color);
    setShowColorMenu(false);
  };

  const handleLogout = () => {
    console.log('Đã đăng xuất');
    alert('Bạn đã đăng xuất!');
  };

  return (
    <div className="rightMenu" style={{ background: menuColor }}>
      <div className="imgPRO">
        <img src={rightMenuBg} alt="Menu Background" />
      </div>

      <div className="colorPickerContainer">
        <button className="colorToggleBtn" onClick={toggleColorMenu}>
          Color Here
        </button>

        {showColorMenu && (
          <div className="colorMenu">
            
            <div
              className="colorCircle"
              style={{ background: 'rgba(67, 73, 187, 0.6)' }}
              onClick={() => handleColorChange('rgba(67, 73, 187, 0.6)')}
            ></div>
       
            
            <div
              className="colorCircle"
              style={{
                background: 'linear-gradient(135deg, #ff4e50, #f9d423)'
              }}
              onClick={() =>
                handleColorChange('linear-gradient(135deg, #ff4e50, #f9d423)')
              }
            ></div>

            <div
               className="colorCircle"
               style={{
                 background: 'linear-gradient(135deg, #00c853, #b2ff59)'
               }}
               onClick={() =>
                 handleColorChange('linear-gradient(135deg, #00c853, #b2ff59)')
                }
            ></div>

            <div
              className="colorCircle"
              style={{
                background: 'linear-gradient(135deg, #FFB6B9, #8E2DE2)',
              }}
              onClick={() =>
                handleColorChange('linear-gradient(135deg, #FFB6B9, #8E2DE2)')
              }
            ></div>

            <div
              className="colorCircle"
              style={{
                background: 'linear-gradient(135deg, #89F7FE, #66A6FF)',
              }}
              onClick={() =>
                handleColorChange('linear-gradient(135deg, #89F7FE, #66A6FF)')
              }
            ></div>
          </div>
        )}
      </div>

      <div className="profileSection">
        <div className="profileImg"></div>
        <button className="logoutBtn" onClick={handleLogout}>
          <FiLogOut className="logoutIcon" />
        </button>
      </div>
    </div>
  );
}

export { RightMenu };
