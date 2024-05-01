import { doc, writeBatch } from "firebase/firestore";
import { db } from "../../../../firebase";
import { updateShardsRelatedShards } from "../../ShardSlice";


export const MassUpdateShards = async (relationship,ShardList,curuseremail,changedShardId, changedShardTitle,dispatch) => {
    const batch = writeBatch(db);
 
    //if the shardList is empty, the ref will return nothing, so, no further progression
    {Object.entries(ShardList || {}).map(async([id]) => {
    
        const shardRef = doc(db, 'users', curuseremail, 'ShardList', id);


      // updating in the firestore using batch.update 
        batch.update(shardRef, {
          [`${relationship}.${changedShardId}`]: changedShardTitle
      });
    
      //update in redux
      console.log(relationship)
      dispatch(updateShardsRelatedShards({
        id:id,
        relationship:relationship,
        updateShardsRelatedShards:{
          [changedShardId]: changedShardTitle
        }
      }))
    
    })}

    await batch.commit();
  };