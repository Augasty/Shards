/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../../firebase";
import ShardChange from "./ShardChange/ShardChange";
import { doc, getDoc, DocumentData, DocumentReference } from "firebase/firestore";
import { addSingleShard } from "../ShardSlice";
import { RootState } from "../../../store/store"; // Assuming you have a RootState type for your Redux store
import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0;
};

interface Shard {
  id: string;
  // Add other shard properties here
}

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}

const ShardDetails: React.FC = () => {
  const { id: curShardId } = useParams<RouteParams>(); // Use the RouteParams interface

  const dispatch = useDispatch();
  const reduxShards = useSelector((state: RootState) => state.Shards);

  const [currentShard, setCurrentShard] = useState<Shard | null>(null);

  const curuser = auth.currentUser;

  useEffect(() => {
    const fetchCurrentShard = async () => {
      if (curuser?.email && curShardId) {
        // Fetch the current shard from Redux
        const foundCurrentObj = 
          Object.values(reduxShards).find((obj) => obj.id === curShardId) || null;

        // If it's not in Redux, fetch it from Firestore and also store it in Redux
        if (!foundCurrentObj) {
          const currentShardRef: DocumentReference<DocumentData> = doc(
            db,
            "users",
            curuser.email,
            "ShardList",
            curShardId
          );

          const currentShardSnapshot = await getDoc(currentShardRef);
          if (currentShardSnapshot.exists()) {
            const shardData = {
              ...currentShardSnapshot.data(),
              id: curShardId,
            } as Shard;

            setCurrentShard(shardData);

            // Adding in Redux
            dispatch(addSingleShard(shardData));
          }
        } else {
          setCurrentShard(foundCurrentObj);
        }
      }
    };

    fetchCurrentShard();

    // DON'T REMOVE REDUXSHARDS FROM HERE. THEN THE RELATED SHARDS AUTO UPDATE WILL NOT RERENDER WHEN REQUIRED
  }, [curShardId, setCurrentShard, curuser?.email, dispatch, reduxShards]);

  // To make sure that we don't pass {} in the ShardChange
  if (!currentShard) {
    return <></>;
  }

  return <ShardChange currentShard={currentShard} key={currentShard.id} />;
};

export default ShardDetails;
