export default function ({ $axios, store, redirect }) {
  console.log('AXIOS PLUGIN LOADED')

  $axios.onRequest((request) => {
    console.log('[ REQUEST ]' + request.url)
    if (localStorage.getItem('auth._token.local')) {
      request.headers.common.Authorization = localStorage.getItem(
        'auth._token.local'
      )
    }

    return request
  })

  $axios.onResponse((response) => {
    console.log('[ RESPONSE ]' + response.request.responseURL, response)
    // TODO: If token expires, perform a silent refresh

    return response
  })

  /* $axios.onError((error) => {
    console.error('[ ERROR ]', error)
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      store.state.sessionStorage.authUser = null
      return redirect('/')
    }

    return error
  }) */
}
