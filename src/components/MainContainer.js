import React, { useState } from 'react';
import '../Style/MainContainer.css';
import { Banner } from './Banner';
import {AudioList} from './AudioList';

function MainContainer() {
  const [activeTab, setActiveTab] = useState(null);

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mainContainer">
      <Banner />
      <div className="menuList">
        <ul>
          <li>
            <a 
              href="#" 
              className={activeTab === 'noibat' ? 'active' : ''} 
              onClick={() => handleClick('noibat')}
            >
              Nổi bật
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeTab === 'tatca' ? 'active' : ''} 
              onClick={() => handleClick('tatca')}
            >
              Tất cả
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeTab === 'yeuthich' ? 'active' : ''} 
              onClick={() => handleClick('yeuthich')}
            >
              Yêu thích
            </a>
          </li>
        </ul>
      </div>
      <AudioList/>
    </div>
  );
}

export { MainContainer };
