/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { auth, db } from "../../../../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import styles from "./ShardChange.module.css";
import { updateShardProperties } from "../../ShardSlice";
import { useDispatch } from "react-redux";
import { TextEditor } from "../../InputForm/TextEditor";
import { extractHeader } from "../../InputForm/ExtractHeader";
import RelatedShards from "./RelatedShards";
import { MassUpdateShards } from "./MassUpdateShards";
import { updateSingleShardIdTitle } from "../../ShardIdTitleSlice";
import { handlePrint } from "./handlePrint";
import CollapsableButtons from "./CollapsableButtons"


const ShardChange = ({ currentShard }) => {

  const [initialShard, setInitialShard] = useState({
    ...currentShard,
  });
  const initialTitle = extractHeader(initialShard);
  const curuser = auth.currentUser;

  const dispatch = useDispatch();

  const currentShardRef = doc(
    db,
    "users",
    curuser?.email,
    "ShardList",
    currentShard?.id
  );
  const [updatedCurrentShard, setupdatedCurrentShard] = useState({
    ...currentShard,
  });

  const handleChange = (value) => {
    setupdatedCurrentShard((prevData) => ({
      ...prevData,
      content: value,
    }));
    console.log(updatedCurrentShard)
  };

  // Function to handle form submission
  const handleSubmit = async (e = null) => {
    if (e) {
      e.preventDefault();
    }
    const ChangedShard = {
      ...updatedCurrentShard,
      title: extractHeader(updatedCurrentShard),
      updatedAt: new Date().toISOString(),
    };
    await updateDoc(currentShardRef, ChangedShard);

    // update in redux
    dispatch(
      updateShardProperties({
        id: currentShard.id,
        updatedProperties: { ...ChangedShard },
      })
    );

    // if title is not changed, further calculation is not needed.
    const updatedHeader = extractHeader(updatedCurrentShard);
    if (initialTitle == updatedHeader) {
      return;
    }

    // update data for the dropdown's map
    const userDocRef = doc(db, "users", curuser?.email);
    try {
      await setDoc(
        userDocRef,
        {
          ShardIdTitle: {
            [currentShard.id]: updatedHeader,
          },
        },
        { merge: true }
      );

      dispatch(
        updateSingleShardIdTitle({
          id: [currentShard.id],
          title: updatedHeader,
        })
      );
    } catch (error) {
      console.error("Error storing map:", error);
    }

    // if initial title and final title are different:
    MassUpdateShards(
      "parentShards",
      updatedCurrentShard.childrenShards,
      curuser.email,
      currentShard.id,
      updatedHeader,
      dispatch
    );
    MassUpdateShards(
      "childrenShards",
      updatedCurrentShard.parentShards,
      curuser.email,
      currentShard.id,
      updatedHeader,
      dispatch
    );
    // 1. update the heading in the relatedshard of all it's parent and children shards in firestore
    // 2. do the same in redux
  };



  const handleKeyDown = (event) => { //to enable ctrl + s
    if (event.ctrlKey && event.key === 's') {
      handleSubmit(event);
    }
  };


  function checkStringsEquality() {
    console.log("check",initialShard.content, updatedCurrentShard.content);

    if (initialShard.content !== updatedCurrentShard.content) {
      handleSubmit(event)
      setInitialShard({...updatedCurrentShard})
    } else {
      console.log("The strings are same.",initialShard.content, updatedCurrentShard.content);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkStringsEquality();
    }, 3000);

    return () => clearInterval(intervalId);
  },[initialShard.content, updatedCurrentShard.content]);

  return (
    <div className={styles.container} onKeyDown={handleKeyDown}>
      <div className={styles.textContainers}>
        <TextEditor
          content={updatedCurrentShard.content}
          handleChange={handleChange}
        />

        <CollapsableButtons currentShardId={currentShard.id} 
        handleSubmit={handleSubmit}  handlePrint={()=>handlePrint(updatedCurrentShard.content)}
        />
      </div>
      <div>
        <div className={styles.relatedShardsContainer}>
          <RelatedShards
            ShardsMapObject={currentShard.parentShards}
            shardRelationship={"parents"}
          />
          <RelatedShards
            ShardsMapObject={currentShard.childrenShards}
            shardRelationship={"children"}
          />
        </div>
      </div>
    </div>
  );
};

export default ShardChange;
