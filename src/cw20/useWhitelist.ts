import { Dictionary } from 'ramda'
import { useCurrentChainName } from '../data/chain'
import tokens from '../tokens.json'
import { Whitelist } from '../types'

const useWhitelist = () => {
  const name = useCurrentChainName()
  // const response = useTerraAssets<Dictionary<Whitelist>>('cw20/tokens.json')
  // TODO: Correct type for this token list.
  return { isLoading: false, whitelist: (tokens as any)[name] as Whitelist }
}

export default useWhitelist
