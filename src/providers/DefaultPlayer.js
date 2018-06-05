import Player from './Player'

export default class DefaultPlayer extends Player {
  constructor (elementPlayer, url) {
    super(elementPlayer, url)

    this.load()
  }

  load () {
    this.addSourceToVideo(this._elementPlayer, this._linkVideo, 'video/mp4')
    this.play()
  }

  addSourceToVideo (element, src, type) {
    let source = document.createElement('source')
    source.src = src
    source.type = type
    element.appendChild(source)
  }
}
