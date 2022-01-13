const hre = require("hardhat");
const ethers = hre.ethers;
const BigNumber = ethers.BigNumber;


module.exports = {
    ganache: {
        factory: "0xe732F4cf7B2615a479Ccaa8A4d603A1b2E0940aB",
        USDT: "0x174ECF5BDed116Aa1BB357Acb7840933F6B30B94",
        TToken: "0xAD480C37CA8821Ed752a588627DbB97486be6EdF"
    },
    bsc_testnet: {
        factory: "0x0B43eD7bFe24064C31A429F6E4081E9846516538",
        USDT: "0xFe57a912FcE2aE127CaCeDBBf8486A6891345eB9",
        TToken: "0xb9725546A70976CC2061cfBD2cc86Ef7A0e9Fa23"
    },
    bsc: {

    }
}