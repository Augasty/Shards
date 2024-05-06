/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../../firebase";
import ShardChange from "./ShardChange/ShardChange";
import { doc, getDoc } from "firebase/firestore";
import { addSingleShard } from "../ShardSlice";

// eslint-disable-next-line react-refresh/only-export-components
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

const ShardDetails = () => {
  const curShardId = useParams();

  const dispatch = useDispatch();
  const reduxShards = useSelector((state) => state.Shards);

  const [currentShard, setcurrentShard] = useState({});

  const curuser = auth.currentUser;

  useEffect(() => {
    if (curuser?.email) {
      // fetch the current shard from redux
      const foundCurrentObj =
        Object.values(reduxShards).find((obj) => obj.id === curShardId.id) ||
        {};

      console.log(foundCurrentObj);

      // if it's not in redux, (nested shard), fetch it from firestore and also store it in redux
      if (isEmptyObject(foundCurrentObj)) {
        const currentShardRef = doc(
          db,
          "users",
          curuser?.email,
          "ShardList",
          curShardId.id
        );
        let currentShard;
        const fetchCurrentShard = async () => {
          currentShard = await getDoc(currentShardRef);
          console.log(currentShard.data());
          setcurrentShard({
            ...currentShard.data(),
            id: curShardId.id,
          });

          // console.log(currentShard.data(), currentShard.id);
          // adding in redux
          dispatch(
            addSingleShard({
              id: currentShard.id,
              ...currentShard.data(),
            })
          );
          // console.log('single data fetched from firestore',currentShard.data(),currentShard.id)
        };
        fetchCurrentShard();
      } else {
        setcurrentShard(foundCurrentObj);
        // console.log('fetched from redux')
      }
    }

    // DON'T REMOVE REDUXSHARDS FROM HERE. THEN THE RELATED SHARDS AUTO UPDATE WILL NOT RERENDER WHEN REQUIRED
  }, [curShardId, setcurrentShard, curuser?.email, dispatch, reduxShards]);

  // to make sure that we don't pass {} in the shardchange

  if (isEmptyObject(currentShard)) {
    return <></>;
  }

  return <ShardChange currentShard={currentShard} key={currentShard.id} />;
};

export default ShardDetails;
