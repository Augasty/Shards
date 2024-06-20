import { doc, writeBatch } from "firebase/firestore";
import { db } from "../../../../firebase";
import { updateShardsRelatedShards } from "../../ShardSlice";
import store from '../../../../store/store.ts';

export const MassUpdateShards = async (
  relationship,
  ShardList,
  curuseremail,
  changedShardId,
  changedShardTitle
) => {

  const batch = writeBatch(db);

  //if the shardList is empty, the ref will return nothing, so, no further progression
  {
    Object.entries(ShardList || {}).map(async ([id]) => {
      const shardRef = doc(db, "users", curuseremail, "ShardList", id);

      // updating in the firestore using batch.update
      batch.update(shardRef, {
        [`${relationship}.${changedShardId}`]: changedShardTitle,
      });

      //update in redux
      // console.log(relationship)
      store.dispatch(
        updateShardsRelatedShards({
          id: id,
          relationship: relationship,
          updateShardsRelatedShards: {
            [changedShardId]: changedShardTitle,
          },
        })
      );
    });
  }

  await batch.commit();
};
