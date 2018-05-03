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

  const answer = req.body
  var coach = []

  // Coach Stamp
  if (answer.genre === 'Jazz/Soul/Blues'){
    if (answer.language === 'English') {
      coach.push('Stamp')
    }else {
      if (Math.floor((Math.random() * 10) + 1) <= 8) {
        coach.push('Stamp')
      }
    }
  }else if (answer.genre === 'Hip-Hop/Alternative') {
    if (Math.floor((Math.random() * 10) + 1) <= 7) {
      coach.push('Stamp')
    }
  }else {
    if (Math.floor((Math.random() * 10) + 1) <= 4) {
      coach.push('Stamp')
    }
  }

  // Coach Joey
  if (answer.genre === 'Hip-Hop/Alternative' || answer.genre === 'Acoustic') {
    if (answer.sexuality === 'Female') {
      coach.push('Joey')
    }else {
      if (Math.floor((Math.random() * 10) + 1) <= 8) {
        coach.push('Joey')
      }
    }
  }else {
    if (Math.floor((Math.random() * 10) + 1) <= 8) {
      coach.push('Joey')
    }
  }

  // Coach Kong
  if (answer.genre === 'Rock') {
    if (answer.sexuality === 'Male') {
      coach.push('Kong')
    }else {
      if (Math.floor((Math.random() * 10) + 1) <= 8) {
        coach.push('Kong')
      }
    }
  }else if (answer.language === 'Others') {
    coach.push('Kong')
  }else {
    if (Math.floor((Math.random() * 10) + 1) <= 5) {
      coach.push('Kong')
    }
  }

  // Coach Kim
  if (answer.genre === 'Hip-Hop/Alternative' || answer.genre === 'Acoustic') {
    if (answer.sexuality === 'Male') {
      coach.push('Kim')
    }else {
      if (Math.floor((Math.random() * 10) + 1) <= 9) {
        coach.push('Kim')
      }
    }
  }else if (answer.language === 'Others') {
    if (Math.floor((Math.random() * 10) + 1) <= 9) {
      coach.push('Kim')
    }
  }else {
    if (Math.floor((Math.random() * 10) + 1) <= 2) {
      coach.push('Kim')
    }
  }

  // Coach Singto
  if (answer.genre === 'Rock') {
    if (answer.language === 'English') {
      coach.push('Singto')
    }else {
      if (Math.floor((Math.random() * 10) + 1) <= 9) {
        coach.push('Singto')
      }
    }
  }else if (answer.genre === 'Pop'){
    if (answer.language === 'English') {
      coach.push('Singto')
    }else {
      if (Math.floor((Math.random() * 10) + 1) <= 8) {
        coach.push('Singto')
      }
    }
  }else {
    if (Math.floor((Math.random() * 10) + 1) <= 3) {
      coach.push('Singto')
    }
  }

  // Coach Da
  if (answer.genre === 'Acoustic') {
    if (answer.sexuality === 'Female') {
      coach.push('Da')
    }else {
      if (Math.floor((Math.random() * 10) + 1) <= 9) {
        coach.push('Da')
      }
    }
  }else if (answer.language === 'Others') {
    if (Math.floor((Math.random() * 10) + 1) <= 7) {
      coach.push('Da')
    }
  }else {
    if (Math.floor((Math.random() * 10) + 1) <= 2) {
      coach.push('Da')
    }
  }

  // Empty Coach
  if (answer.sexuality === 'More than one person'){
    if (answer.language === 'Thai') {
      coach = []
    }else {
      if (Math.floor((Math.random() * 10) + 1) <= 6) {
        coach = []
      }
    }
  }

  const results = {
    result: coach.length !== 0,
    coach: coach
  }
  res.send(results)

})

module.exports = router
