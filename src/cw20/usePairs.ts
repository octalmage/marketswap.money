import pairs from '../pairs.json'

const usePairs = (name: string) => {
  return { isLoading: false, pairs: (pairs as any)[name] }
}

export default usePairs
