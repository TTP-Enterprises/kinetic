import { SdkConfig } from './interfaces/sdk-config'
import { Sdk } from './sdk'

const SOLANA_RPC_NAME = 'mainnet-beta'
const SOLANA_RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com/'

function expectConfiguredSdk(sdk: Sdk) {
  expect(sdk.solana.endpoint).toEqual(SOLANA_RPC_ENDPOINT)
  expect(sdk.solana.connection).toBeDefined()
  expect(sdk.solanaRpcEndpoint).toEqual(SOLANA_RPC_NAME)
}

describe('sdk', () => {
  let sdk: Sdk

  beforeEach(async () => {
    sdk = await Sdk.setup({})
  })

  describe('initializing', () => {
    describe('expected behavior', () => {
      it('should connect to a server endpoint', async () => {
        expectConfiguredSdk(sdk)
        expect(sdk.sdkConfig.logger).not.toBeDefined()
      })

      it('should connect with a logger configured', async () => {
        const config: SdkConfig = { logger: console }
        sdk = await Sdk.setup(config)

        expectConfiguredSdk(sdk)
        expect(sdk.sdkConfig.logger).toBeDefined()
      })
    })
  })
})