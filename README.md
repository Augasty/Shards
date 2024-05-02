only fetch data while logging in, and entering a card for which data is already not in redux.
for other cases (like, creating a shard, entering a shard which has data already in the redux), just fetch from redux.
while creating a shard, just push it to firestore, and push it to redux, no need to fetch.

while logging in, fetch the data that are in level 0
in every shard put the name and id of their parent shards and children shards in it's properties. 
when we click a child or parent shard, first check if it is stored in redux, if not, then fetch it from firestore.

while opening a doc in changedoc (either by clicking it, or by refreshing), if it is not in redux, immediately fetch it.


Need to implement a trigger for logging in an account from multiple place and updating same data from there concurrently.


while changing a doc, update all it's parents and children. (use writebatch)

1. When we log in, we only fetch the shards which are required to be displayed in the home screen.
SignedOutHomePage ==> Navbar ==> fetchHeadShards ==> Display them in `ShardList`

    a. Inside `fetchShards` we fetch the list of shards that are required to be displayed in home, and the ShardIdTitle list.
    b. Inside `ShardList` each Shard is displayed using `ShardSummary`.

2. To create a new shard : Navbar - New Shard ==> CreateShard [
    onSubmit,
    we check if it needs any parent, and add it in the parentShards if required 
    we upload the new shard in firestore, and also push it in redux.
    If it had any parent, we update the parents childrenShards list in firestore, and then we also update the same list for the parent in redux
    We also add the new shard in ShardIdTitle
]  

3. When we enter a shard: ShardDetails (if the shard is in redux, it fetches from there. If it is not, it fetches from firestore) ==> ShardChange ==> The text is displayed using TextEditor , the parent and children shards are displayed using RelatedShards
    a. On submit, redux is updated and firestore is updated.
    b. if the title is changed, ShardIdTitle is updated in firestore, and in redux. 
    c. if the title is changed, all of its parents childrenShard is updated using `MassUpdateShards` in both firestore and redux. Same is done with all of its childrens parentShards.




