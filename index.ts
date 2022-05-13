import { BigNumber, BigNumberish, utils, constants, providers, Contract } from 'ethers'

interface Params {
  p1: BigNumberish
  p2: BigNumberish
  p3: BigNumberish
  p4: string
  p5: BigNumberish
  p6: BigNumberish
}

const ONE = utils.parseUnits('1.0', 'ether')
const TWO = utils.parseUnits('2.0', 'ether')
const MIN = utils.parseUnits('1.0', 14)

const provider = new providers.JsonRpcProvider('https://data-seed-prebsc-1-s3.binance.org:8545/')

const abis = [
  'function M(bytes memory params) external pure returns (uint256,uint256,uint256,address,uint256,uint256)'
]

export async function M(address: string, params?: Params) {
  let args
  if (!params) {
    args = []
  } else {
    const { p1, p2, p3, p4, p5, p6 } = params
    if (!utils.isAddress(p4)) throw Error('p4 invalid address')

    const pb1 = BigNumber.from(p1)
    const pb2 = BigNumber.from(p2)
    const pb3 = BigNumber.from(p3)
    const pb4 = utils.getAddress(p4)
    const pb5 = BigNumber.from(p5)
    const pb6 = BigNumber.from(p6)

    if (pb1.gte(ONE) || pb1.lt(MIN)) throw Error('p1 out of range')
    if (pb2.gte(ONE) || pb2.lt(MIN)) throw Error('p2 out of range')
    if (pb3.gte(TWO) || pb3.lt(ONE.add(MIN))) throw Error('p3 out of range')
    if (pb4 == constants.AddressZero) throw Error('p4 zero')
    if (pb5.gte(ONE) || pb5.lt(MIN)) throw Error('p5 out of range')
    if (pb6.gte(TWO) || pb6.lt(BigNumber.from(ONE).add(MIN))) throw Error('p6 out of range')

    args = utils.solidityPack([
      'uint16',
      'uint16',
      'uint16',
      'address',
      'uint16',
      'uint16'
    ], [
      pb1.div(MIN).toNumber(),
      pb2.div(MIN).toNumber(),
      pb3.sub(ONE).div(MIN).toNumber(),
      pb4,
      pb5.div(MIN).toNumber(),
      pb6.sub(ONE).div(MIN).toNumber()
    ])
  }

  const contract = new Contract(address, abis, provider)
  const ret = await contract.M(args)
  return ret
}

if (require.main == module) {
  M('0x9A383738Adb81486c43A6ab38F551AC679c98404', {
    p1: '10000000000000000',
    p2: '20000000000000000',
    p3: '1030000000000000000',
    p4: '0x1904BFcb93EdC9BF961Eead2e5c0de81dCc1D37D',
    p5: '50000000000000000',
    p6: '1060000000000000000'
  })
  .then(ret => {
    console.log(ret.map((v: any) => v.toString()))
  })
  .catch(e => {
    console.error(e)
  })
}