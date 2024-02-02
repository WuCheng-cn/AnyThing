<template>
  <transition-group name="fade">
    <div v-if="isShowLogin" class="login" :style="{ backgroundImage: `url(${defaultBackgroundImg})` }">
      <div class="inner">
        <div class="account">
          <div class="info">
            <n-avatar
              class="avator"
              lazy
              round
              :size="160"
              :src="avatar"
              :fallback-src="avatar"
            />
            <div class="name">
              admin
            </div>
          </div>
          <input
            class="password"
            type="password"
            autofocus
            placeholder="输入密码"
          >
          <n-icon
            class="icon"
            color="#fff"
            :size="36"
            :component="ArrowForwardCircleOutline"
            @click="handleLogin"
          />
        </div>
      </div>
    </div>
    <Loading v-else :is-loaded="isLoaded" @animationend.once="isShowLogin = true" />
  </transition-group>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { AnyComponentHelper } from '@/helper/AnyComponentHelper'
import { useConfig } from '@/config'
import { ArrowForwardCircleOutline } from '@vicons/ionicons5'
import avatar from '@/assets/img/deskTop/avator.jpg'
import Loading from '@/views/Desktop/component/Loading.vue'
// const Loading = AnyComponentHelper.asyncComponent(() => import('@/views/Desktop/component/Loading.vue'))

const router = useRouter()

const { defaultBackgroundImg } = useConfig().DesktopConfig

const isShowLogin = ref(false)

const isLoaded = ref(false)

async function init () {
  await AnyComponentHelper.loadImage(defaultBackgroundImg)
  await AnyComponentHelper.loadImage(avatar)
  isLoaded.value = true
}

function handleLogin () {
  router.push('/desktop')
}

onMounted(() => {
  init()
})
</script>
<style scoped lang="less">
.login {
  position: relative;
  width: 100vw;
  height: 100vh;

  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(100px);
    -webkit-backdrop-filter: blur(100px);

    .account {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      input[type="password"] {
        letter-spacing: 2px;
        font-size: 20px;
        color: rgba(0, 0, 0, .6);
      }

      .info {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translate(-50%, -100%);

        // border-radius: 50%;
        .avator {
          box-shadow: 0 0 32px rgba(0, 0, 0, .2);
          margin-bottom: 20px;
        }

        .name {
          white-space: nowrap;
          font-size: 48px;
          height: 48px;
          line-height: 48px;
          color: #fff;
          font-weight: bold;
          text-align: center;
          text-shadow: 0 0 8px rgba(0, 0, 0, .8);
        }
      }

      .password {
        height: 36px;
        width: 220px;
        border-radius: 18px;
        background-color: #fff;
        border: none;
        outline: none;
        padding: 0 12px;
        box-shadow: 0 0 32px rgba(0, 0, 0, .2);
        font-size: 14px;
        letter-spacing: 0px;
        caret-color: #ccc;
        font-weight: bold;

        &::placeholder {
          font-size: 14px;
          color: rgba(0, 0, 0, .3);
          letter-spacing: 0px;
        }
      }

      .icon {
        position: absolute;
        height: 36px;
        width: 36px;
        top: 50%;
        right: -10px;
        transform: translate(100%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all .3s;
        box-shadow: 0 0 32px rgba(0, 0, 0, .2);

        &:hover {
          cursor: pointer;
          box-shadow: 0 0 32px rgba(0, 0, 0, .3);
        }

        &:active {
          opacity: .7;
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
