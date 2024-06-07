import { Link } from "react-router-dom";

import btn from "../../../../../sharedStyles/MultipleButtonStyle.module.css";

import React, { useState } from "react";
import { auth, db } from "../../../../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteSingleShard } from "../../../ShardSlice";
import { useDispatch } from "react-redux";

const index = ({ currentShardId, handlePrint, curshardChildren }) => {
  const [collapse, setcollapse] = useState(true);

  const curuser = auth.currentUser;

  const dispatch = useDispatch();

  const removeShard = () => {
    const ShardDocRef = doc(
      db,
      "users",
      curuser?.email,
      "ShardList",
      currentShardId
    );
    deleteDoc(ShardDocRef);

    // update in redux

    dispatch(deleteSingleShard({ id: currentShardId }));

  // update the parents childlist (remove the currentshard from parents childrenlist) in firestore
  // and in redux also
  };


  // make the button disabled if the children is not empty
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
            <button onClick={handlePrint}>Print</button>
          </span>

          <span>
            <Link to={`/`} style={{ textDecoration: "none" }}>
              <button onClick={() => removeShard()}>Delete</button>
            </Link>
          </span>
        </>
      )}
    </div>
  );
};

export default index;
