only fetch data while logging in, and entering a card for which data is already not in redux.
for other cases (like, creating a shard, entering a shard which has data already in the redux), just fetch from redux.
while creating a shard, just push it to firestore, and push it to redux, no need to fetch.

while logging in, fetch the data that are in level 0
in every shard put the name and id of their parent shards and children shards in it's properties. 
when we click a child or parent shard, first check if it is stored in redux, if not, then fetch it from firestore.

while opening a doc in changedoc (either by clicking it, or by refreshing), if it is not in redux, immediately fetch it.


Need to implement a trigger for logging in an account from multiple place and updating same data from there concurrently.


while changing a doc, update all it's parents and children.