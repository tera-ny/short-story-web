import { NextApiHandler } from 'next'
import admin from '~/modules/server/firebaseAdmin'
import algoliasearch from 'algoliasearch'
import { SearchKeyAPIResponse } from '~/modules/entity'

const client = algoliasearch(process.env.ALGOLIA_APPID, process.env.ALGOLIA_ADMIN_KEY)

const generatePublicSearchKey = () => {
  return client.generateSecuredApiKey(process.env.ALGOLIA_SEARCH_KEY, {
    filters: `isPublished:true`
  })
}

const generateSecureSearchKey = (uid: string) => {
  return client.generateSecuredApiKey(process.env.ALGOLIA_SEARCH_KEY, {
    filters: `userID:${uid} OR isPublished:true`,
    userToken: uid,
  })
}

const handler: NextApiHandler<SearchKeyAPIResponse> = async (req, res) => {
  const auth = req.headers.authorization
  if (!auth) {
    res.status(200).json({
      searchKey: generatePublicSearchKey(),
      acceptIndices: [process.env.ALGOLIA_INDEX]
    })
    return
  }
  const [uid, token] = auth.split(' ', 2)
  if (!uid || !token) {
    res.statusCode = 401
    res.statusMessage = 'not support format'
    res.end()
    return
  } else {
    const decodedToken = await admin.auth().verifyIdToken(token)
    if (uid === decodedToken.uid) {
      res.status(200).json({
        searchKey: generateSecureSearchKey(uid),
        acceptIndices: [process.env.ALGOLIA_INDEX]
      })
    } else {
      res.statusCode = 401
      res.statusMessage = 'Mismatch between id and token'
      res.end()
      return
    }
  }
}

export default handler