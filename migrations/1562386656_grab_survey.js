const GrabSurvey = artifacts.require("GrabSurvey");

module.exports = function(deployer) {
  deployer.deploy(GrabSurvey);
};
