<style lang="less" scoped>
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="header-bar">
      <img src="../../assets/LOGO1.png" alt="上下网">
      <div class="sxw">上下科技</div>
      <div class="title">分公司 - {{ city }}</div>
    </div>
    <div class="login-con">
      <Card icon="log-in" :bordered="false">
        <p class="mt20 mb20 title">分公司业务管理平台</p>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">
            版权所有(c) 2013-2018. All rights reserved.
            <br/>
            上下科技 版权所有
            <!-- <CommonIcon type="locked"/>
            <span @click="forget" style="color: #57a3f3;cursor: pointer;">忘记密码？</span> -->
          </p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import CommonIcon from '_c/common-icon'
import { mapActions } from 'vuex'
import md5 from 'md5'
console.log(md5('message'))

const CITY = {
  'wuxi': '无锡'
}[process.env.VUE_APP_MODE] || '杭州'

export default {
  data() {
    return {
      city: CITY
    }
  },
  components: {
    LoginForm,
    CommonIcon
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    handleSubmit ({ userName, password }) {
      password = md5(password)
      this.handleLogin({ userName, password }).then(res => {
        this.$router.push({ name: 'home' })
      })
    },
    forget() {
      console.log('忘记密码')
    }
  }
}
</script>

<style>

</style>
