import * as admin from 'firebase-admin'

const account: admin.ServiceAccount = {
  privateKey: process.env.ADMIN_PRIVATE_KEY,
  projectId: process.env.ADMIN_PROJECT_ID,
  clientEmail: process.env.ADMIN_CLIENT_EMAIL
}

admin.apps.length > 0 ? admin.app() : admin.initializeApp({ credential: admin.credential.cert(account) })

export default admin.app()