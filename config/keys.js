if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod.js");
  module.exports = require("./keys_dev.js");
} else {
  module.exports = require("./keys_dev.js");
}
