import React from 'react'

const ButtonsSection = ({ menuButtons, selectedId, onClick }) => {
  const handleOnClick = (buttonId) => {
    onClick(buttonId)
  }

  return (
    <>
      <ul>
        {menuButtons.map(mButton => (
          <li key={mButton.id}>
            <button type="button"
              className={mButton.id === selectedId ? 'selected' : ''}
              onClick={() => handleOnClick(mButton.id)}
            >{mButton.name}</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ButtonsSection
