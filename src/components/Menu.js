import React, { useState } from "react";

function Menu({ title, menuOject }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="MenuContainer">
      <p className="title">{title}</p>

      <ul>
        {menuOject &&
          menuOject.map((menu, index) => (
            <li
              key={menu.id}
              className={selected === index ? "active" : ""}
              onClick={() => setSelected(index)}
            >
              <a href="#">
                <i>{menu.icon}</i>
                <span>{menu.name}</span>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export { Menu };
