<template>
  <div class="okoplayer">
    <video ref="video"></video>
    <div class="ui-okoplayer">

    </div>
  </div>
</template>

<script>
import Player from '../Player'

export default {
  data: () => ({
    player: null
  }),
  mounted () {
    const url = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'
    // const url = 'http://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_1920_18MG.mp4'
    const $el = this.$refs.video

    this.player = new Player($el, url)
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
</style>
