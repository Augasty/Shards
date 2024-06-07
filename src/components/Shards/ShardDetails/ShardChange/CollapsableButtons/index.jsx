import { Link } from "react-router-dom";

import btn from "../../../../../sharedStyles/MultipleButtonStyle.module.css";

import React, { useState,  } from "react";

const index = ({ currentShardId, handleSubmit, handlePrint }) => {


  const [collapse, setcollapse] = useState(true);



  return (
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
  );
};

export default index;
