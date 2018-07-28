var projectAdmin = artifacts.require("./projectAdmin.sol");

module.exports = function(deployer) {
  deployer.deploy(projectAdmin);
};
