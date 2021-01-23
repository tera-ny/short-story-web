import { SearchKeyAPIResponse } from '~/modules/entity'
import { firebaseApp } from '~/modules/firebase'

export const fetchSearchKey = async (): Promise<SearchKeyAPIResponse> => {
  const user = firebaseApp().auth().currentUser
  let headers: Headers
  if (user) {
    const token = await user.getIdToken();
    headers = new Headers({
      Authorization: `${user.uid} ` + token,
    })
  } else {
    headers = new Headers()
  }
  const result = await fetch("/api/algolia/searchkey", {
    headers: headers,
  })
    .then((result) => result.json());
  return result as SearchKeyAPIResponse;
};