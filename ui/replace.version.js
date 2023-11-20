var replace = require("replace-in-file");
var package = require("./package.json");
var moment = require("moment");

var buildVersion = `${package.version}.${moment().format("YYYYMMDD")}`;

const options = {
  files: "src/environments/environment.ts", //please make sure that this path is correct
  from: /version: '(.*)'/g,
  to: "version: '" + buildVersion + "'",
  allowEmptyPaths: false,
};

try {
  let changedFiles = replace.sync(options); // console.log(changedFiles);
  if (changedFiles.length && !changedFiles[0].hasChanged) {
    throw (
      "Please make sure that file '" + options.files + "' has \"version: ''\""
    );
  }
  console.log("Build version set: " + buildVersion);
} catch (error) {
  console.error("Error occurred:", error);
}
