/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { updateShardsRelatedShards } from "../ShardSlice";

const AddRelationshipModal = ({
  ShardsMapObject,
  shardRelationship,
  setIsOpen,
}) => {
  // Access the shardIdTitleMap from Redux state
  const reduxShardIdTitle = useSelector((state) => state.ShardIdTitle) || {};

  const dispatch = useDispatch();
  const curuser = auth.currentUser;
  const curShardId = useParams().id;
  const curShardTitle = reduxShardIdTitle[curShardId];

  const IdsToFilter = [curShardId];

  Object.entries(ShardsMapObject).map(([id]) => {
    IdsToFilter.push(id);
  });
  // console.log(IdsToFilter)

  // filter reduxShardIdTitle such that all the objects who's id is in the array IdsToFilter

  const filteredShardIdTitle = Object.fromEntries(
    Object.entries(reduxShardIdTitle).filter(
      ([id]) => !IdsToFilter.includes(id)
    )
  );

  const addRelationship = async (idToAdd, titleToAdd) => {
    let parent;
    let child;

    if (shardRelationship == "parents") {
      parent = [idToAdd, titleToAdd];
      child = [curShardId, curShardTitle];
    } else if (shardRelationship == "children") {
      child = [idToAdd, titleToAdd];
      parent = [curShardId, curShardTitle];
    }

    if (parent.length === 0 || child.length === 0) {
      alert("Relationship could not be established");
    }

    const ParentDocRef = doc(
      db,
      "users",
      curuser.email,
      "ShardList",
      parent[0]
    );
    await setDoc(
      ParentDocRef,
      {
        childrenShards: { [child[0]]: child[1] },
      },
      { merge: true }
    );

    dispatch(
      updateShardsRelatedShards({
        id: parent[0],
        relationship: "childrenShards",
        updateShardsRelatedShards: {
          [child[0]]: child[1],
        },
      })
    );

    const ChildDocRef = doc(db, "users", curuser.email, "ShardList", child[0]);
    await setDoc(
      ChildDocRef,
      {
        parentShards: { [parent[0]]: parent[1] },
      },
      { merge: true }
    );

    dispatch(
      updateShardsRelatedShards({
        id: child[0],
        relationship: "parentShards",
        updateShardsRelatedShards: {
          [parent[0]]: parent[1],
        },
      })
    );

    setIsOpen(false);
  };
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <h2>Add {shardRelationship}</h2>
        {/* Render a scrollable list of items */}
        <ul className={styles.modalList}>
          {Object.entries(filteredShardIdTitle).map(([id, shardTitle]) => (
            <li
              key={id}
              className={styles.listItem}
              onClick={() => addRelationship(id, shardTitle)}
            >
              <div className={styles.title}>{shardTitle}</div>{" "}
            </li>
          ))}
        </ul>
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AddRelationshipModal;
