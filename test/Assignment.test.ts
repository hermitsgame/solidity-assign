import _ from 'lodash'
import { solidity } from "ethereum-waffle"
import chai from "chai"
import { BigNumber, Signer, utils } from "ethers"
import { ethers, deployments } from "hardhat"
import {
  Assignment
} from '../build/typechain'

chai.use(solidity)
const { expect } = chai
const { get } = deployments

describe("Assignment", () => {
  let deployer: Signer
  let assignment: Assignment

  const setupTest = deployments.createFixture(
    async ({ deployments, ethers }) => {
      await deployments.fixture()

      const signers = await ethers.getSigners();
      [ deployer ] = signers

      assignment = (await ethers.getContractAt(
        "Assignment",
        (await get("Assignment")).address
      )) as Assignment
    }
  )

  beforeEach(async () => {
    await setupTest()
  })

  describe("M", () => {
    it('should be able to call M successfully', async () => {
      const alice = '0x1904BFcb93EdC9BF961Eead2e5c0de81dCc1D37D'
      const params = utils.solidityPack([
        'uint16',
        'uint16',
        'uint16',
        'address',
        'uint16',
        'uint16'
      ], [
        100,
        200,
        300,
        alice,
        500,
        600
      ])

      const ret = await assignment.M(params)
      expect(ret[0]).to.equals('10000000000000000')
      expect(ret[1]).to.equals('20000000000000000')
      expect(ret[2]).to.equals('1030000000000000000')
      expect(ret[3]).to.equals(alice)
      expect(ret[4]).to.equals('50000000000000000')
      expect(ret[5]).to.equals('1060000000000000000')
    })

    it('should be able to call M with default params successfully', async () => {
      const ret = await assignment.M([])
      expect(ret[0]).to.equals('900000000000000')
      expect(ret[1]).to.equals('800000000000000')
      expect(ret[2]).to.equals('1000700000000000000')
      expect(ret[3]).to.equals('0x000000000000000000000000000000000000dEaD')
      expect(ret[4]).to.equals('600000000000000')
      expect(ret[5]).to.equals('1000500000000000000')
    })
  })
})
