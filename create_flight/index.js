const AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-2" });
// Create the DynamoDB service object
const docClient = new AWS.DynamoDB.DocumentClient();

const params = { TableName: "flights", Item: {} };

exports.handler = async (event) => {
  const createDocument = (params) =>
    new Promise((resolve, reject) =>
      docClient.put(params, (err, data) => (err ? reject(err) : resolve(data)))
    );
  const itemBase = {
    id: "",
    aircraft_prefix: "",
    pilot_name: "",
    max_load: 0,
    route: "",
  };
  params.Item = Object.assign(itemBase, event);
  console.log("Adding a new flight...", params);
  try {
    let inserted = await createDocument(params);
    console.log("Added item:", JSON.stringify(inserted, null, 2));
  } catch (err) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  }
};