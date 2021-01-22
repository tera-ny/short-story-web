import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch(process.env.ALGOLIA_APPID_FOR_CLIENT, process.env.ALGOLIA_SEARCH_KEY_FOR_CLIENT)

const index = client.initIndex(process.env.ALGOLIA_INDEX_FOR_CLIENT)

export const search = async (text: string) => {
  const result = await index.search(text)
  return result.hits.map(hit => hit.objectID)
}