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
        factory: "0x0B43eD7bFe24064C31A429F6E4081E9846516538",
        USDT: "0x47C849D89908F50E7E7E471735c834CBCeA00202",
        ETH: "0xE191cF696B5BF19600aD9Bf7cca566A9448e1837"
    },
    bsc: {

    }
}