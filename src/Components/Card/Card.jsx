import React, { useCallback, useState } from "react";
import "./Card.css"

export const Card = ({ personaje, onStar }) => {
  const [isShowing, setIsShowing] = useState(false); 

  return (
    <div className="card" style={{ width: "18rem", height: "18rem" }}>
      <button onClick={() => onStar(personaje.id)} >☆</button>
      {isShowing && (
        <div className="modal">
          <pre className="pre">{JSON.stringify(personaje, null, 2)}</pre>
          <button onClick={() => setIsShowing(false)}> close </button>
        </div>
      )}
      <img
        src={`${personaje.thumbnail.path}.${personaje.thumbnail.extension}`} 
        className="card-img-top"
        style={{ width: "80%", height: "80%" }}
        alt="personajes de Marvel"
      />
      <div className="card-body" onClick={() => setIsShowing(!isShowing)}>
        <p className="card-text">{personaje.name}</p>
      </div>
    </div>
  );
};
