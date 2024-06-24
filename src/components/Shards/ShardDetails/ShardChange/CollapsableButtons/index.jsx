import { Link, useNavigate } from "react-router-dom";

import btn from "../../../../../sharedStyles/MultipleButtonStyle.module.css";

import React, { useState } from "react";
import { auth, db } from "../../../../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteSingleShard } from "../../../ShardSlice";
import { useDispatch } from "react-redux";
import { isEmptyObject } from "../../ShardDetails";
import { MassDeleteShardRelationship } from "./MassDeleteShardRelationship";

const index = ({
  currentShardId,
  handlePrint,
  curshard,
  publishInBlog,
  isPublished,
}) => {
  let curshardChildren = curshard.childrenShards;

  const [collapse, setcollapse] = useState(true);

  const curuser = auth.currentUser;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeShard = () => {
    if (!isEmptyObject(curshardChildren)) {
      console.log("not empty");
    } else {
      deleteDoc(doc(db, "users", curuser?.email, "ShardList", currentShardId));

      dispatch(deleteSingleShard({ id: currentShardId }));
      MassDeleteShardRelationship(
        "childrenShards",
        curshard.parentShards,
        curuser.email,
        curshard.id
      );

      navigate(-1);
    }
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
            <button
              onClick={() => removeShard()}
              disabled={!isEmptyObject(curshardChildren)}
            >
              Delete
            </button>
          </span>

          <span>
            <button onClick={() => publishInBlog()}>
              {isPublished ? "Update Blog" : "Publish"}
            </button>
          </span>

          <span>
            <Link
              to={`/Blog/${currentShardId}`}
              style={{ textDecoration: "none" }}
            >
              <button disabled={!isPublished}>Goto Blog</button>
            </Link>
          </span>
        </>
      )}
    </div>
  );
};

export default index;
