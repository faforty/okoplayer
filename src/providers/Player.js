import Dispatcher from '../Dispatcher'

const dispatcher = new Dispatcher()

export default ({
  state: ({
    isPlay: false
  }),

  _super (elementPlayer, url) {
    this._elementPlayer = elementPlayer
    this._linkVideo = url

    dispatcher.on('volume', value => this.setVolume(value))
  },

  play () {
    this._elementPlayer.play()

    this.state.isPlay = true
    dispatcher.dispatch('isPlay', this.state.isPlay)
  },

  pause () {
    this._elementPlayer.pause()

    this.state.isPlay = false
    dispatcher.dispatch('isPlay', this.state.isPlay)
  },

  setVolume (value) {
    if (value >= 0 && value <= 1) {
      this._elementPlayer.volume = value
    }
  },

  $on (event, callback) {
    dispatcher.on(event, value => callback(value))
  },

  $emit (event, value) {
    dispatcher.dispatch(event, value)
  }
})
