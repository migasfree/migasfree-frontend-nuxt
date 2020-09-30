export default function ({ $axios, store, redirect }) {
  console.log('AXIOS PLUGIN LOADED')

  $axios.onRequest((request) => {
    console.log('[ REQUEST ]' + request.url)
    console.log(localStorage.getItem('auth._token.local'))
    if (localStorage.getItem('auth._token.local')) {
      request.headers.common.Authorization = localStorage.getItem(
        'auth._token.local'
      )
      /* store.state.sessionStorage.authUser.token_type +
        ' ' +
        store.state.sessionStorage.authUser.access_token */
    }

    return request
  })

  /* $axios.onRequest((config) => {
    config.headers.common['access-token'] =
      store.state.user.headers.access_token
    config.headers.common['token-type'] = store.state.user.headers.token_type
    config.headers.common.client = store.state.user.headers.client
    config.headers.common.expiry = store.state.user.headers.expiry
    config.headers.common.uid = store.state.user.headers.uid
  }) */

  $axios.onResponse((response) => {
    console.log('[ RESPONSE ]' + response.request.responseURL, response)
    // TODO: If token expires, perform a silent refresh

    return response
  })

  $axios.onError((error) => {
    console.error('[ ERROR ]', error)
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      store.state.sessionStorage.authUser = null
      return redirect('/')
    }

    return error
  })
}
