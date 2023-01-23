const getTweetsCollection = (client) => {
  return client.db("main").collection("tweets");
}

const getRepliesCollection = (client) => {
  return client.db("main").collection("replies");
}

module.exports = {getTweetsCollection, getRepliesCollection};
