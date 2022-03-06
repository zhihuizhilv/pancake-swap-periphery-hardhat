// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// import {ethers} from "hardhat";
// import {ZERO_ADDRESS} from "../test/utils/helpers";

const hre = require("hardhat");
const ethers = hre.ethers;
const BigNumber = ethers.BigNumber;
const deployResult = require('./deploy_result');
const deployConfig = require("./deploy_config")[hre.network.name];

// Factories
let PancakeRouterFactory;
let WETH9Factory;


// contract object
let pancakeRouter;
let weth;


async function getContractFactories() {
    WETH9Factory = await ethers.getContractFactory("WETH9");
    PancakeRouterFactory = await ethers.getContractFactory("PancakeRouter");
}

async function deployContract() {
    weth = await WETH9Factory.deploy();
    await weth.deployed();
    deployResult.writeDeployedContract(
        "weth",
        weth.address,
        "WETH9"
    );

    deployResult.save();

    console.log("~~~~~~~~~~~~~~~");
    console.log(deployConfig.factory);
    console.log(weth.address);
    pancakeRouter = await PancakeRouterFactory.deploy(deployConfig.factory, weth.address);
    console.log("~~~~~~~~~~~~~~~");
    await pancakeRouter.deployed();
    console.log("~~~~~~~~~~~~~~~");
    deployResult.writeDeployedContract(
      "pancakeRouter",
      pancakeRouter.address,
      "PancakeRouter",
      {
          factory: deployConfig.factory,
          WETH: deployConfig.WETH
      }
    );

    deployResult.save();
}


async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("network:", hre.network.name);
  console.log("deployer:", deployer.address);
  console.log("deployer.balance:", ethers.utils.formatEther((await deployer.getBalance())));

  //
  await deployResult.load();

  // contract factories
  console.log("begin getContractFactories");
  await getContractFactories();

  /// contract
  console.log("begin deployContract");
  await deployContract();

  console.log("deploy done.");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
