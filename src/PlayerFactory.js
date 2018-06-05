import HlsPlayer from './providers/HlsPlayer'
import DefaultPlayer from './providers/DefaultPlayer'

export default ({
  load (elementPlayer, url, type) {
    let player

    if (type === 'hls') {
      player = new HlsPlayer(elementPlayer, url)
    } else if (type === 'mp4') {
      player = new DefaultPlayer(elementPlayer, url)
    }
    // return new Promise(function(resolve, reject) {
      // player.init(resolve)
    // });

    return player
  }
})
