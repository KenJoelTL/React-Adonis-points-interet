import React, { useState } from 'react'

const ButtonsSection = ({ menuButtons }) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <ul align="left">
        {menuButtons.map(mButton => (
          <li><button type="button"
            key={mButton.id}
            className={mButton.id === selectedId ? 'selected' : ''}
            onClick={() => setSelectedId(mButton.id)}
          >{mButton.name}</button></li>
        ))}
      </ul>
    </div>
  );
};

export default ButtonsSection
