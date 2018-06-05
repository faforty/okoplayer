import Player from './Player'
import Hls from 'hls.js'

export default () => ({
  ...Player,

  constructor (elementPlayer, url) {
    this._super(...arguments)
    this.load()
  },

  load () {
    this.hls = new Hls()
    this.hls.loadSource(this._linkVideo)
    this.hls.attachMedia(this._elementPlayer)
    this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this.play()
    })
  }
})
