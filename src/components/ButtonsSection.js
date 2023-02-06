import React, { useState } from 'react'

const ButtonsSection = ({ menuButtons }) => {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <>
      <ul align="left">
        {menuButtons.map(mButton => (
          <li key={mButton.id}>
            <button type="button"
              className={mButton.id === selectedId ? 'selected' : ''}
              onClick={() => setSelectedId(mButton.id)}
            >{mButton.name}</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ButtonsSection
