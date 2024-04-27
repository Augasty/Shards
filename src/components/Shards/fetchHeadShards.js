import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { setShardsFromFireBase } from "./ShardSlice";
import { setAllShardIdNames } from "./ShardIdNameSlice";


export const fetchHeadShards = async (curuser, dispatch) => {
  try {
    const ShardSnapShot = await getDocs(
      query(
        collection(db, 'users', curuser.email, 'ShardList'),
        where('showInHome', '==', true)
      ));

    if (!ShardSnapShot.empty) {
      const ShardsData = ShardSnapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });


      try {
        // console.log(ShardsData)
        dispatch(setShardsFromFireBase([...ShardsData]));
      } catch (e) {
        console.warn('error uploading Shards in redux', e);
      }
    }
  } catch (error) {
    console.error('Error fetching Shards from Firebase:', curuser, error);
  }


  // fetch shardidname
  try{
    const userDocSnapshot = (await getDoc(doc(db, 'users', curuser?.email))).data()
    try{
      dispatch(setAllShardIdNames(userDocSnapshot.ShardIdName))
    }catch(e){
      console.log('error while uploading shardidname in redux',e)
    }
  }catch(e){
    console.error("error fetching shardidname",e)
  }
}
