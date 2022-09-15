const express = require('express');
const db = require('./config/connection');
const mongodb = require('mongodb').MongoClient;
const routes = require('./routes');

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Creates a connection to a MongoDB instance and returns the reference to the database
// mongodb.connect(
//   // Defines connection between app and MongoDB instance
//   connectionStringURI,
//   // Sets connection string parser and Server Discover and Monitoring engine to true and avoids warning
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err, client) => {
//     // Use client.db() constructor to add new db instance
//     db = client.db();
//     app.listen(port, () => {
//       console.log(`Example app listening at http://localhost:${port}`);
//     });
//   }
// );

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server for ${activity} running on port ${PORT}!`);
//   });
// });
app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });