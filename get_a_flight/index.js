const AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-2" });
// Create the DynamoDB service object
const docClient = new AWS.DynamoDB.DocumentClient();

const params = { TableName: "flights", Key: { "id": "AAAAA"} };

exports.handler = async (event) => {
  const getDocument = (params) =>
    new Promise((resolve, reject) =>
      docClient.get(params, (err, data) => (err ? reject(err) : resolve(data)))
    );
  params.Key.id = event.id;
  console.log("Adding a new flight...", params);
  let flight = null;
  try {
    flight = await getDocument(params);
    console.log("Item returned:", JSON.stringify(flight, null, 2));
  } catch (err) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  }

  return flight;
};
