import PlayerFactory from './PlayerFactory'

export default class Player {
  constructor (elementPlayer, url) {
    let type = this.getType(url)
    return PlayerFactory.load(elementPlayer, url, type)
  }

  getType (url) {
    if (url.match(/\.m3u8$/)) {
      return 'hls'
    } else if (url.match(/\.mp4$/)) {
      return 'mp4'
    }
  }
}
