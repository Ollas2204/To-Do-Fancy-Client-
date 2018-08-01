window.fbAsyncInit = function () {
  FB.init({
    appId: '254975278627837', // localhost : 1239370809540745 225274774708793
    cookie: true, // enable cookies to allow the server to access
    // the session
    xfbml: true, // parse social plugins on this page
    version: 'v2.8' // use graph api version 2.8
  })
  FB.getLoginStatus(function (response) {
    console.log(response)
  })
};
// Load the SDK asynchronously
(function (d, s, id) {
  let js = null
  let fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) return
  js = d.createElement(s)
  js.id = id
  js.src = 'https://connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')
