/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./styles.module.css";

import btn from "../../../sharedStyles/MultipleButtonStyle.module.css";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSingleShard, updateShardsRelatedShards } from "../ShardSlice";
import { TextEditor } from "../InputForm/TextEditor";
import { extractHeader } from "../InputForm/ExtractHeader";
import { isEmptyObject } from "../ShardDetails/ShardDetails";
import { updateSingleShardIdTitle } from "../ShardIdTitleSlice";

const CreateShard = () => {
  const [Shard, setShard] = useState({});

  const dispatch = useDispatch();
  const curuser = auth.currentUser;

  const history = useNavigate();

  // To fetch parentshards from the params
  const parentId = useParams().id;

  let parentShardRef;

  if (parentId) {
    parentShardRef = doc(db, "users", curuser?.email, "ShardList", parentId);
  }

  let parentShards = {}; // Declare parentShards outside the function
  let parentData;
  let parentDataPromise; // Store the promise to avoid re-calling fetchParentData

  const fetchParentData = async () => {
    if (!parentId) {
      return;
    }
    if (!parentDataPromise) {
      parentDataPromise = getDoc(parentShardRef).then((doc) => {
        parentData = doc.data();
        // console.log(parentData);
        if (parentId) {
          parentShards[parentId] = parentData.title;
        }
        return parentData;
      });
    }
    return parentDataPromise;
  };

  fetchParentData();

  const handleChange = (value) => {
    setShard((prevShard) => ({
      ...prevShard,
      content: value, // Use 'id' as a dynamic property key
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shardTitle = extractHeader(Shard);

    const ShardData = {
      ...Shard,

      title: shardTitle,
      updatedAt: new Date().toISOString(),
      parentShards: parentShards, //adding the parent's data in the current shard
      childrenShards: {},
      // showInHome: parentShards.length == 0
      showInHome: isEmptyObject(parentShards),
      isPublished: false,
    };

    // adding the created doc in firestore
    let createdShardRef;
    try {
      // console.log(ShardData)
      createdShardRef = await addDoc(
        collection(db, "users", curuser.email, "ShardList"),
        ShardData
      );
    } catch (e) {
      console.warn("error while uploading", db, curuser.email, ShardData);
    }
    // adding it in redux
    dispatch(
      addSingleShard({
        id: createdShardRef.id,
        ...ShardData,
      })
    );

    // add data for the dropdown's map
    const userDocRef = doc(db, "users", curuser?.email);
    try {
      await setDoc(
        userDocRef,
        {
          ShardIdTitle: {
            [createdShardRef.id]: shardTitle,
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error storing map:", error);
    }
    try {
      // update the ShardIdTitle wala redux
      dispatch(
        updateSingleShardIdTitle({
          id: createdShardRef.id,
          title: shardTitle,
        })
      );
    } catch (e) {
      console.log("error while uploading shardIdTitle in redux", e);
    }

    // if there is no parents data, just return to the home page
    if (!parentData || isEmptyObject(parentData)) {
      history(`/Shard/${createdShardRef.id}`);
      return;
    }
    // updating the parent docs childrenShard property in firestore
    try {
      const ParentDocRef = doc(
        db,
        "users",
        curuser.email,
        "ShardList",
        parentId
      );

      // get the parents childrenshards array, and then adding the current shard in it
      await setDoc(
        ParentDocRef,
        {
          childrenShards: { [createdShardRef.id]: ShardData.title },
        },
        { merge: true }
      );

      dispatch(
        updateShardsRelatedShards({
          id: parentId,
          relationship: "childrenShards",
          updateShardsRelatedShards: {
            [createdShardRef.id]: ShardData.title,
          },
        })
      );
    } catch (error) {
      console.error(
        "Error updating parent document's children property: ",
        error
      );
    }
    history(`/Shard/${createdShardRef.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainers}>
        <TextEditor handleChange={handleChange} />

        <div className={btn.MultipleButtonStyle}>
          <span>
            <button onClick={() => history(-1)}>Back</button>
          </span>
          <span>
            <button onClick={handleSubmit}>Create</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateShard;
