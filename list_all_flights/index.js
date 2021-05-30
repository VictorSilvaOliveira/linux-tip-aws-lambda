const AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-2" });
// Create the DynamoDB service object
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "flights",
  ProjectionExpression: "id, aircraft_prefix, pilot_name, max_load, route",
};

exports.handler = async (event) => {
  const queryAllDocuments = (params) =>
    new Promise((resolve, reject) =>
      docClient.scan(params, (err, data) =>
        err ? reject(err) : resolve(data.Items)
      )
    );

  let results = [];
  try {
    results = await queryAllDocuments(params);
  } catch (err) {
    console.error(
      "Unable to query items. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  }

  return results;
};
