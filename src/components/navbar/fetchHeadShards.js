import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { setShardsFromFireBase } from "../Shards/ShardSlice";
import { setAllShardIdTitles } from "../Shards/ShardIdTitleSlice";

export const fetchHeadShards = async (curuser, dispatch) => {
  try {
    const ShardSnapShot = await getDocs(
      query(
        collection(db, "users", curuser.email, "ShardList"),
        where("showInHome", "==", true)
      )
    );

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
        console.warn("error uploading Shards in redux", e);
      }
    }
  } catch (error) {
    console.error("Error fetching Shards from Firebase:", curuser, error);
  }

  // fetch shardIdTitle
  try {
    const userDocSnapshot = (
      await getDoc(doc(db, "users", curuser?.email))
    ).data();
    try {
      dispatch(setAllShardIdTitles(userDocSnapshot.ShardIdTitle));
    } catch (e) {
      console.log("error while uploading shardIdTitle in redux", e);
    }
  } catch (e) {
    console.error("error fetching shardIdTitle", e);
  }
};
