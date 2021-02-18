import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy, catchUnknownSigner} = deployments;

  const {deployer, proxyOwner} = await getNamedAccounts();

  await catchUnknownSigner(
    deploy('Test', {
      contract: 'Test1',
      from: deployer,
      log: true,
      proxy: {
        owner: proxyOwner,
      },
    })
  );
};
export default func;
func.tags = ['Test', 'Test_deploy'];
