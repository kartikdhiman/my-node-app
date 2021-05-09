// CRUD create read update delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    const db = client.db(databaseName);

    db.collection('tasks')
      .insertMany([
        { description: 'task1', completed: true },
        { description: 'task2', completed: true },
        { description: 'task3', completed: true },
      ])
      .then((result) => {
        console.log(result.ops);
      })
      .catch((error) => {
        console.log('Unable to insert tasks');
      });

    db.collection('tasks')
      .updateMany({
        completed: true
      }, {
        $set: {
          completed: false
        }
      })
      .then((result) => {
        console.log('updated all documents');
      })
      .catch((error) => {
        console.log('error in updating docs');
      })
  })
  .catch((error) => {
    console.log('Unable to connect to database');
  });
