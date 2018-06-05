import Player from './Player'
import Hls from 'hls.js'

export default class HlsPlayer extends Player {
  constructor (elementPlayer, url) {
    super(elementPlayer, url)

    this.load()
  }

  load () {
    this.hls = new Hls()
    this.hls.loadSource(this._linkVideo)
    this.hls.attachMedia(this._elementPlayer)
    this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this.play()
    })
  }
}
