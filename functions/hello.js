//this file is for test
const items = [
  { id: 1, name: "John" },
  { id: 2, name: "susan" },
];
exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
