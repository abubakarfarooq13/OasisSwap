import { ChainId } from '@kyberswap/ks-sdk-core'

import BnbLogo from 'assets/images/bnb-logo.png'
import { NetworkInfo } from 'constants/networks/type'

const EMPTY = ''
const EMPTY_ARRAY: any[] = []
const NOT_SUPPORT = null

const bnbTestnetInfo: NetworkInfo = {
  chainId: ChainId.BSCTESTNET,
  route: 'bnb-testnet',
  ksSettingRoute: 'bsc',
  priceRoute: 'bsc',
  poolFarmRoute: EMPTY,
  aggregatorRoute: 'bsc',
  name: 'BNB Testnet',
  icon: 'https://storage.googleapis.com/ks-setting-1d682dca/14c1b7c4-b66e-4169-b82e-ea6237f15b461699420601184.png',

  iconSelected: NOT_SUPPORT,

  defaultBlockSubgraph: 'https://api.thegraph.com/subgraphs/name/ducquangkstn/ethereum-blocks-bsctestnet',
  etherscanUrl: 'https://testnet.bscscan.com',
  etherscanName: 'BscScan',
  bridgeURL: EMPTY,
  nativeToken: {
    symbol: 'BNB',
    name: 'BNB',
    logo: BnbLogo,
    decimal: 18,
    minForGas: 10 ** 16,
  },
  defaultRpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  multicall: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576',
  classic: {
    defaultSubgraph: 'https://api.thegraph.com/subgraphs/name/ducquangkstn/dynamic-amm-bsc-staging',
    static: {
      zap: '0xaaCc03dc91785297Ece818C584b92f010efF650c',
      router: '0xfff0e64033De88f9241b22ccC0cc1f35B3326A3E',
      factory: '0x646C84B07C267d47BA0072797df1E9497fc283BE',
    },
    oldStatic: NOT_SUPPORT,
    dynamic: {
      zap: '0xEC89f4767Cf5E9eEEDF5FcF87A3422971a290aE5',
      router: '0x52F068B03108a79dFfb522DE0E160ce6351b58f6',
      factory: '0x1800F2fb50e57eF517568fE091AaC234D95892aE',
    },
    claimReward: NOT_SUPPORT,
    fairlaunch: [
      '0xf0fb5bD9EB287A902Bd45b57AE4CF5F9DcEBe550',
      '0xC4ad1e43c755F3437b890eeCE2E55cA7b14D1F15',
      '0x7B731e53B16694cF5dEb87d4C84bA2b4F4EcB4eB',
      '0x35D1b10fA26cd0FbC52Fd22dd58E2d9d22FC631F',
    ],
    fairlaunchV2: EMPTY_ARRAY,
  },
  elastic: {
    defaultSubgraph: 'https://api.thegraph.com/subgraphs/name/kybernetwork/kyberswap-elastic-bsc',
    startBlock: 18532980,
    coreFactory: '0x4E9EbBbBb4d886D75bC113c247133A2D93736cF0',
    nonfungiblePositionManager: '0x0d12ef18dbAcFe33EE0F03Fb541B19015397f542',
    tickReader: '0xB9FDfF69c66c1FeA92273e861960044ac59b893f',
    initCodeHash: '0xc597aba1bb02db42ba24a8878837965718c032f8b46be94a6e46452a9f89ca01',
    quoter: '0x200d7dC5999516B77224e9470FBa6Cb411561370',
    routers: '0xe25c2b6a92e74f38179A3128d44Aa547eCe48A11',
    farms: [],
  },
  limitOrder: '*',
  averageBlockTimeInSeconds: 3,
  coingeckoNetworkId: 'binance-smart-chain',
  coingeckoNativeTokenId: 'binancecoin',
  deBankSlug: EMPTY,
  dexToCompare: NOT_SUPPORT,
  geckoTermialId: NOT_SUPPORT,
}

export default bnbTestnetInfo
