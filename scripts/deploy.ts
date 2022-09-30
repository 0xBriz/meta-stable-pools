import { ethers } from "hardhat";

const VAULT = {
  5: "0x1795Dd984eA50ca5Dc251A1fC38191ae76E8Acd6",
  56: "0xEE1c8DbfBf958484c6a4571F5FB7b99B74A54AA7",
};

const QUERY_PROCESSOR = {
  5: "0xb56007902B92054Ee5DFf34666aE8e0a0C1bD4D6",
  56: "0x2CFb1ca2087883f5562240F1db9b39a1f86db01a",
};

async function deployQuery() {
  const QueryProcessor = await ethers.getContractFactory("QueryProcessor");
  const factory = await QueryProcessor.deploy();
  await factory.deployed();
  console.log("QueryProcessor deployed to: ", factory.address);
}

async function deployFactory(vault: string, QueryProcessor: string) {
  const MetaStablePoolFactory = await ethers.getContractFactory("MetaStablePoolFactory", {
    libraries: {
      QueryProcessor,
    },
  });
  const factory = await MetaStablePoolFactory.deploy(vault);
  await factory.deployed();
  console.log("MetaStablePoolFactory deployed to: ", factory.address);
}

async function deployMetaPool() {}

async function main() {
  const chain = 56;
  // await deployQuery();
  await deployFactory(VAULT[chain], QUERY_PROCESSOR[chain]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
