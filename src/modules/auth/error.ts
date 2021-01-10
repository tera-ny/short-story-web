import firebase from 'firebase/app'
import 'firebase/auth'

export const generateMessage = (error: firebase.auth.Error) => {
  if (error.code === 'auth/email-already-in-use') {
    return 'すでにこのメールアドレスは使用されています'
  } else if (error.code === 'auth/invalid-email') {
    return '使用できないメールアドレスです'
  } else if (error.code === 'auth/weak-password') {
    return 'パスワードが脆弱です'
  } else if (error.code === 'auth/user-disabled') {
    return 'ユーザーが無効化されています'
  } else if (error.code === 'auth/user-not-found') {
    return 'ユーザーが見つかりませんでした'
  } else if (error.code === 'auth/wrong-password') {
    return 'パスワードが異なります'
  } else {
    return '予期せぬエラーが発生しました'
  }
}