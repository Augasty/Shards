import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  DocumentData,
  DocumentReference,
  doc,
  getDoc,
} from "firebase/firestore";
import { useParams } from "react-router";
import { TextEditor } from "../Shards/InputForm/TextEditor";

interface Shard {
  id: string;
  content: string | undefined;
  // Add other shard properties here
}

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}
const Blogpost = () => {
  const { id: curShardId } = useParams<RouteParams>(); // Use the RouteParams interface

  const [currentShard, setCurrentShard] = useState<Shard | null>(null);

  useEffect(() => {
    const fetchCurrentShard = async () => {
      if (curShardId) {
        // Fetch the current shard from Redux

        const currentShardRef: DocumentReference<DocumentData> = doc(
          db,
          "blogs",
          curShardId
        );

        const currentShardSnapshot = await getDoc(currentShardRef);
        if (currentShardSnapshot.exists()) {
          const shardData = {
            ...currentShardSnapshot.data(),
            id: curShardId,
          } as Shard;

          setCurrentShard(shardData);
        }
      }
    };

    fetchCurrentShard();
    // console.log(curShardId, currentShard);
  }, [curShardId, setCurrentShard]);

  if (!currentShard) {
    return <></>;
  }
  return (
    <div>
      <TextEditor content={currentShard?.content} handleChange={() => {}} 
        isEditable={false}/>
    </div>
  );
};

export default Blogpost;
