import { deleteField, doc, writeBatch } from "firebase/firestore";
import { removeShardRelatedShard, updateShardsRelatedShards } from "../../../ShardSlice";
import { db } from "../../../../../firebase";

import store from '../../../../../store/store.ts';

export const MassDeleteShardRelationship = async (
  relationship,
  ShardList,
  curuseremail,
  deletedShardId
) => {
  const batch = writeBatch(db);

  {
    Object.entries(ShardList || {}).map(async ([id]) => {
      const shardRef = doc(db, "users", curuseremail, "ShardList", id);

      // updating in the firestore using batch.update
      batch.update(shardRef, {
        [`${relationship}.${deletedShardId}`]: deleteField(),
      });

      //update in redux
      // console.log(relationship)
      store.dispatch(
        removeShardRelatedShard({
          id: id,
          relationship: relationship,
          deletedShardId:deletedShardId,

        })
      );
    });
  }

  await batch.commit();
};