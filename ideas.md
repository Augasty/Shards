a separate list for adding : 
[
    id:[title,updatedAt]
] of all the shards, it will be used in a dropdown to add parents separately.


Whenever a doc is changed, its id,title,updatedAt is added in the the separate list.

only let extra parents add while in ShardChange, not in CreateShard


In the RelatedShards pass the ShardIdName, and render thr dropdown with the keys that are in the ShardIdName but not in the ShardsMapObject.

Let a shard get deleted only if it doesn't have any childrenShard. (Having parent won't be an issue, because parentShards will always be linked to some other shards)

A screen to display all the shards (using the ShardIdName), a button in navbar. 