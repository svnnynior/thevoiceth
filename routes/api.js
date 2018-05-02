var express = require('express')
var router = express.Router()
var SpotifyWebApi = require('spotify-web-api-node')

var clientId = 'af5d14aad9bf424a90761df81f49f3f1',
  clientSecret = '13469529f0404c82ab8ed07c96d40944'

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
})

spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token is ' + data.body['access_token'])
    spotifyApi.setAccessToken(data.body['access_token'])
  },
  function(err) {
    console.log('Something went wrong!', err)
  }
)

router.post('/songFeatures', function(req, res, next) {

  spotifyApi.searchTracks('track:' + req.body.track_name + ' artist:' + req.body.track_artist, { limit : 1})
  .then(function(data) {
    return data.body.tracks.items.map(function(t) {
      return t.id
    })
  })
  .then(function(trackId) {
    return spotifyApi.getAudioFeaturesForTrack(trackId)
  })
  .then(function(trackData) {
    res.send(trackData)
  })

})

router.post('/songArtist', function(req, res, next) {

  spotifyApi.searchTracks('track:BNK48', { limit : 1})
  .then(function(data) {
    return data.body.tracks.items.map(function(t) {
      return t.artists[0].name
    })
  })
  .then(function(artist) {
    res.send(artist)
  })

})

router.post('/audition', function(req, res, next) {

  const result = {
    result: 'Yes',
    coach: ['Kong', 'Joey']
  }
  res.send(result)

})

module.exports = router
