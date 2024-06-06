import { Link } from "react-router-dom";

import btn from "../../../../../sharedStyles/MultipleButtonStyle.module.css";

import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import React, { useState, useRef } from "react";

const index = ({ currentShardId, handleSubmit, handlePrint }) => {
  // const [currentRotate, setCurrentRotate] = useState(0);
  // const isDraggingRef = useRef(false);
  // const onDrag = () => {
  //   isDraggingRef.current = true;
  // };

  // const onStop = () => {

  //   isDraggingRef.current = false;
  // };

  const [collapse, setcollapse] = useState(true);
  return (
    // <Draggable onStop={onStop} onDrag={onDrag}>
    <div className={btn.MultipleButtonStyle}>
      {collapse ? (
        <span>
          <button onClick={() => setcollapse(false)}>Options</button>
        </span>
      ) : (
        <>
          <span>
            <button onClick={() => setcollapse(true)}>Collapse</button>
          </span>
          <span>
            <Link
              to={`/Shard/${currentShardId}/create-shard`}
              style={{ textDecoration: "none" }}
            >
              <button>New Shard</button>
            </Link>
          </span>

          <span>
            <button onClick={handleSubmit}>Update</button>
          </span>

          <span>
            <button onClick={handlePrint}>Print</button>
          </span>
        </>
      )}
    </div>
    // </Draggable>
  );
};

export default index;
