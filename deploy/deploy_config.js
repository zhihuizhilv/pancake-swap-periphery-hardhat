const hre = require("hardhat");
const ethers = hre.ethers;
const BigNumber = ethers.BigNumber;


module.exports = {
    ganache: {
        factory: "0xe732F4cf7B2615a479Ccaa8A4d603A1b2E0940aB",
        USDT: "0x174ECF5BDed116Aa1BB357Acb7840933F6B30B94",
        ETH: "0x123fDED6845Eea428Cc2E57F011EF89433DcfE27"
    },
    bsc_testnet: {
        factory: "0x19Eb1f583eEC6572dD9Bc0579523f6Ae16032E0A",
    },
    bsc: {

    }
}