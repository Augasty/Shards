only fetch data while logging in, and entering a card for which data is already not in redux.
for other cases (like, creating a shard, entering a shard which has data already in the redux), just fetch from redux.
while creating a shard, just push it to firestore, and push it to redux, no need to fetch.