import HlsPlayer from './providers/HlsPlayer'
import DefaultPlayer from './providers/DefaultPlayer'

export default ({
  load (elementPlayer, url, type) {
    let player

    if (type === 'hls') {
      player = HlsPlayer()
    } else if (type === 'mp4') {
      player = DefaultPlayer()
    }

    player.constructor(elementPlayer, url)
    player.load()

    return player
  }
})
