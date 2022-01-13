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

const ETHER1 = ethers.utils.parseEther("1");

async function getPancakeRouter() {
  return await ethers.getContractAt(deployResult.getData().deployedContract.pancakeRouter.contractName, deployResult.getData().deployedContract.pancakeRouter.address);
}

async function addLiquidity(deployer) {
    let router = await getPancakeRouter();
    let usdt = await ethers.getContractAt("IERC20", deployConfig.USDT);
    let ttoken = await ethers.getContractAt("IERC20", deployConfig.TToken);

    console.log("router:", router.address);
    console.log("factory:", await router.factory());

    await usdt.approve(router.address, ETHER1.mul(10000));
    await ttoken.approve(router.address, ETHER1.mul(10000));

    console.log("before USDT balance:", ethers.utils.formatEther(await usdt.balanceOf(await deployer.getAddress())));
    console.log("before TToken balance:", ethers.utils.formatEther(await ttoken.balanceOf(await deployer.getAddress())));
    await(await router.addLiquidity(usdt.address, ttoken.address, ETHER1.mul(4000), ETHER1, 0, 0, await deployer.getAddress(), Math.floor(Date.now()/1000)+100)).wait();
    console.log("end USDT balance:", ethers.utils.formatEther(await usdt.balanceOf(await deployer.getAddress())));
    console.log("end TToken balance:", ethers.utils.formatEther(await ttoken.balanceOf(await deployer.getAddress())));
}


async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("network:", hre.network.name);
  console.log("deployer:", deployer.address);
  console.log("deployer.balance:", ethers.utils.formatEther((await deployer.getBalance())));

  //
  await deployResult.load();

  console.log("begin addLiquidity");
  await addLiquidity(deployer);

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
























