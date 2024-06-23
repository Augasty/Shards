a separate /blog/id: route, which will show a published blog/document, it won't require logging in.

Tables.



--done--
only fetch data while logging in, and entering a card for which data is already not in redux.
for other cases (like, creating a shard, entering a shard which has data already in the redux), just fetch from redux.
while creating a shard, just push it to firestore, and push it to redux, no need to fetch.

while logging in, fetch the data that are in level 0
in every shard put the name and id of their parent shards and children shards in it's properties. 
when we click a child or parent shard, first check if it is stored in redux, if not, then fetch it from firestore.

while opening a doc in changedoc (either by clicking it, or by refreshing), if it is not in redux, immediately fetch it.


Need to implement a trigger for logging in an account from multiple place and updating same data from there concurrently.

Whenever a doc is changed, its id,title,updatedAt is added in the the separate list.

only let extra parents add while in ShardChange, not in CreateShard


In the RelatedShards pass the ShardIdName, and render thr dropdown with the keys that are in the ShardIdName but not in the ShardsMapObject.

Let a shard get deleted only if it doesn't have any childrenShard. (Having parent won't be an issue, because parentShards will always be linked to some other shards)

A button to extract the texts as pdf, or doc file. Add h1

A screen to display all the shards (using the ShardIdName), a button in navbar. 