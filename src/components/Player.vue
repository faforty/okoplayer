<template>
  <div ref="player" class="okoplayer" @click="togglePlay">
    <video ref="video"></video>
    <div ref="uiPlayer" :class="['player-ui', { 'player-ui_full': isFullScreen }]">
      <div class="player-ui-frame">
        <div class="player-ui-frame__state">
          <!-- <div class="player-ui-frame__state__play"></div> -->
          <div :class="['player-ui-frame__state__pause', { 'player-ui-frame__state__show': isPause }]">
            <icon name="ios-pause" width="128px" height="55px"></icon>
          </div>
        </div>
        <div class="player-ui-volume">
          {{volumePercent}}%
        </div>
      </div>
      <div class="player-ui-panel">
        <div class="player-ui-progress">
          <div class="player-ui-progress__time">23:31</div>
          <div class="player-ui-progress__bar">
            <div class="player-ui-progress-bar">
              <div class="player-ui-progress-bar__buffer"></div>
              <div class="player-ui-progress-bar__now"></div>
            </div>
          </div>
          <div class="player-ui-progress__time">23:31</div>
        </div>
        <div class="player-ui-control">
          <div class="player-ui-control__logo">okoplayer</div>
          <div class="player-ui-control__btn">
            <icon name="ios-volume-high" heigth="18px" width="22px"></icon>
          </div>
          <div class="player-ui-control__separator"></div>
          <div class="player-ui-control__btn">
            <icon name="ios-settings" heigth="18px" width="18px"></icon>
          </div>
          <div class="player-ui-control__btn" @click="toggleScreen">
            <icon name="ios-expand" heigth="18px" width="18px"></icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSVGIcon from 'vue-svgicon'
import Player from '../Player'

Vue.use(VueSVGIcon, {
  tagName: 'icon'
})

import '../icons/ios-expand'
import '../icons/ios-pause'
import '../icons/ios-settings'
import '../icons/ios-volume-high'

export default {
  data: () => ({
    player: null,
    isPlay: false,
    isFullScreen: false,
    volume: 1
  }),
  computed: {
    isPause () {
      return this.isPlay === false
    },
    volumePercent () {
      return this.volume * 100 / 1
    }
  },
  methods: {
    togglePlay () {
      return this.isPlay ? this.player.pause() : this.player.play()
    },
    toggleScreen () {
      if (this.player.fullscreenEnabled()) {
        this.player.cancelFullScreen()
      } else {
        this.player.requestFullScreen(this.$refs.player)
      }
      this.isFullScreen = !this.isFullScreen
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

    this.$refs.player.addEventListener('dblclick', this.toggleScreen)

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
@font-face {
  font-family 'Corsica'
  src url('../../static/fonts/CorsicaRamblerLX-Medium.woff2') format('woff2'),
      url('../../static/fonts/CorsicaRamblerLX-Medium.woff') format('woff'),
      url('../../static/fonts/CorsicaRamblerLX-Medium.svg#CorsicaRamblerLX-Medium') format('svg')
  font-weight 500
  font-style normal
}

.okoplayer {
  position relative
  overflow hidden
  font-weight 500
  font-family 'Corsica', sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  -webkit-text-size-adjust 100%

  &
  & > video {
    background-color #000000
    width 100%
    height 100%
  }
}
.player-ui {
  display flex
  position absolute
  overflow hidden
  left 0
  right 0
  top 0
  bottom 0
  // opacity 0
  user-select none
  transition all ease 0.3s

  &:hover {
    opacity 1
    background-image linear-gradient(-180deg, rgba(245,225,225,0) 80%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0.3) 100%)
  }
}
.player-ui-frame {
  flex 1 0 auto

  &__state {
    display flex
    align-items center
    justify-content center
    fill #ffffff
    width 100%
    height 100%

    &__play
    &__pause {
      opacity 0
      visibility hidden
      transform scale(.7)
      transition all ease .2s
    }
    &__show {
      opacity 1
      visibility visible
      transform scale(1)
    }
  }
}
.player-ui-panel {
  flex 1 0 auto
  position absolute
  bottom 0
  opacity 0
  width 100%
  transform translateY(10px)
  transition all ease 0.2s

  .player-ui:hover & {
    opacity 1
    transform translateY(0)
  }
}
.player-ui-progress {
  position relative
  display flex
  align-items center

  &__time {
    margin 0 20px
    font-weight bold
    font-size 11px
    color #fff
  }
  &__bar {
    padding 5px 0
    flex 1 0 auto
    cursor pointer
  }
}
.player-ui-progress-bar {
  opacity 0.35
  height 4px
  background #fff
  border-radius 5px
  width 100%
}
.player-ui-control {
  padding 0 10px
  display flex
  align-items center

  &__logo {
    font-weight 500
    font-size 14px
    letter-spacing 0.2px
    color #fff
  }
  &__btn {
    line-height 0
    cursor pointer
    fill #ffffff
  }
  &__btn
  &__logo {
    padding 10px 10px 20px
    flex 0 0 auto
  }
  &__separator {
    flex 1 0 auto
  }
}
.player-ui-volume {
  display none
  position absolute
  top 50px
  right 50px
  color #ffffff
  font-size 35px

  .player-ui_full & {
    display block
  }
}
</style>
