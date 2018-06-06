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
  },

  load () {
    return new Promise((resolve, reject) => {
      reject('Missing implementation of load() in player tech.')
    })
  },
  requestFullScreen (elem) {
    if (elem.requestFullScreen) {
      elem.requestFullScreen()
    } else if (elem.webkitRequestFullScreen ) {
      elem.webkitRequestFullScreen()
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen()
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen()
    }
  },
  cancelFullScreen () {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  },
  fullscreenEnabled () {
    return !(!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement)
  }
})
