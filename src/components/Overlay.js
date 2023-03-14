function Overlay(props) {
    return (
        <div className="overlay">
          <div className="overlay-content">
            <div className="overlay-close" onClick={props.onClose}>
              X
            </div>
            {props.children}
          </div>
        </div>
    );
}
  
export default Overlay;