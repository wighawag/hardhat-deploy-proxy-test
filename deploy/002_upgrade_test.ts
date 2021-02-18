import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {Wallet} from 'ethers';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy, catchUnknownSigner} = deployments;

  const {deployer, proxyOwner} = await getNamedAccounts();

  const txData = await catchUnknownSigner(
    deploy('Test', {
      contract: 'Test2',
      from: deployer,
      log: true,
      proxy: {
        owner: proxyOwner,
      },
    }),
    {log: false}
  );

  const proxyOwnerWallet = new Wallet(
    '0x460434467767a72796f450111bd5bef031b1baaa8e127d5b71d60ca70dae4ee3',
    ethers.provider
  );

  if (txData) {
    const tx = await proxyOwnerWallet.sendTransaction(txData);
    await tx.wait();
  }

  deploy('Test', {
    contract: 'Test2',
    from: deployer,
    log: true,
    proxy: {
      owner: proxyOwner,
    },
  });

  const test = await deployments.read('Test', 'sayHello');
  console.log({test});
};
export default func;
func.tags = ['Test', 'Test_upgrade'];
