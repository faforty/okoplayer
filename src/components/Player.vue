<template>
  <div class="okoplayer">
    <video ref="video"></video>
    <div class="ui-okoplayer" @click="togglePlay">
      volume: {{volume}}
    </div>
  </div>
</template>

<script>
import Player from '../Player'

export default {
  data: () => ({
    player: null,
    isPlay: false,
    volume: 1
  }),
  methods: {
    togglePlay () {
      return this.isPlay ? this.player.pause() : this.player.play()
    }
  },
  mounted () {
    const url = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'
    // const url = 'http://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_1920_18MG.mp4'
    const $el = this.$refs.video

    this.player = new Player($el, url)

    this.player.$on('isPlay', isPlay => {
      this.isPlay = isPlay
    })
    this.player.$on('volume', value => {
      this.volume = value
    })
    this.player.$on('currentTime', value => {
      console.log(value);
    })


    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 38) {
        event.preventDefault()
        if (this.volume < 1) {
          let value = (this.volume * 10 + 1) / 10

          this.player.$emit('volume', value)
        }
      }
      if (event.keyCode === 40) {
        event.preventDefault()
        if (this.volume > 0) {
          let value = (this.volume * 10 - 1) / 10

          this.player.$emit('volume', value)
        }
      }
      if (event.keyCode === 32) {
        event.preventDefault()
        this.togglePlay()
      }
    }, false);
  }
}
</script>

<style lang="stylus">
.okoplayer {
  position relative

  &
  & > video {
    width 100%
    height 100%
  }
}
.ui-okoplayer {
  position absolute
  left 0
  top 0
  right 0
  bottom 0
}
</style>
