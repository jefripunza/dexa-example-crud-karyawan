const typeorm = require("typeorm"); // More : https://orkhan.gitbook.io/typeorm/docs/connection-options#connection-options-example

const { db_config, synchronize, logging } = require("../config");

// Test Connection
(async (entities) => {
  await typeorm
    .createConnection({
      name: "default",
      type: "mysql",
      port: 3306,
      ...db_config,
      synchronize,
      logging, // debug query
      entities,
    })
    .then(() => {
      console.log(`Database is connected! (${db_config.database}) (mysql)`);
    })
    .catch((error) => {
      console.error(`Error connection: ${error.message}`);
      process.exit(1);
    });
})([
  // Import Manual
  require("../models/entities/KaryawanEntity"),
]);
