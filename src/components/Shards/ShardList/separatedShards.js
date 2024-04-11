export const separateShardsByPriority = (ShardsArray,filterType,filterParameters,createdAtShown) => {

    
    let separatedShards = []

    for (let param of filterParameters){
        const filterShards =  ShardsArray.filter(Shard => Shard[filterType] === param);

        if (createdAtShown) {
            filterShards.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else {
            filterShards.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        }

        separatedShards.push(filterShards)
    }
  return separatedShards
      };