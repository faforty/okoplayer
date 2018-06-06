import Player from './Player'
import HLS from 'hls.js'

export default () => ({
  ...Player,

  constructor (elementPlayer, url) {
    this._super(...arguments)
  },

  load () {
    this.hls = new HLS()
    this.hls.loadSource(this._linkVideo)
    this.hls.attachMedia(this._elementPlayer)
    this.hls.on(HLS.Events.MANIFEST_PARSED, () => {
      this.play()
    })
    this.hls.on(HLS.Events.MANIFEST_PARSED, (event, data) => {
      //resolve()
    })
    this.hls.on(HLS.Events.LEVEL_LOADED, (event, data) => {
      this.isLive_ = data.details.live
      // resolve()
    })
  }
})
