export default class Player {
  constructor (elementPlayer, url) {
    this._elementPlayer = elementPlayer
    this._linkVideo = url
  }

  play () {
    this._elementPlayer.play()
  }

  pause () {
    this._elementPlayer.pause()
  }
}
