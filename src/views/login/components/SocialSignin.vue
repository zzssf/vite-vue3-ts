<template>
  <div class="social-signup-container">
    <div class="sign-btn" @click="wechatHandleClick('wechat')">
      <span class="wx-svg-container">
        <svg-icon icon-class="wechat" class="icon" />
      </span>
      WeChat
    </div>
    <div class="sign-btn" @click="tencentHandleClick('tencent')">
      <span class="qq-svg-container">
        <svg-icon icon-class="qq" class="icon" />
      </span>
      QQ
    </div>
  </div>
</template>

<script lang="ts" setup>
// Methods
const wechatHandleClick = (type: string) => {
  alert(`${type} ok`)
  // You can uncomment and use the following code for real functionality
  // const appid = 'xxxxx'
  // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
  // const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect'
  // openWindow(url, type, 540, 540)
}

const tencentHandleClick = (type: string) => {
  alert(`${type} ok`)
  // You can uncomment and use the following code for real functionality
  // const client_id = 'xxxxx'
  // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
  // const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
  // openWindow(url, type, 540, 540)
}
</script>

<style lang="scss" scoped>
.social-signup-container {
  margin: 20px 0;

  .sign-btn {
    display: inline-block;
    cursor: pointer;
  }

  .icon {
    margin-top: 8px;
    font-size: 24px;
    color: #fff;
  }

  .wx-svg-container,
  .qq-svg-container {
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 20px;
    border-radius: 4px;
    padding-top: 1px;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }

  .wx-svg-container {
    background-color: #24da70;
  }

  .qq-svg-container {
    margin-left: 50px;
    background-color: #6ba2d6;
  }
}
</style>
