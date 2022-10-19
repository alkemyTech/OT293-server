const { Buffer } = require("node:buffer");
const base64 = require("base-64");

const decodeImage = (data) => {
  let mime, b64;
  [mime, b64] = data.split(";");
  let extension = mime.split("/")[1];
  let datos = Buffer.from(base64.decode(b64.substring(7)));
  return {
    extension,
    datos,
  };
};

module.exports = {
  decodeImage
}