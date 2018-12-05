<template>
  <div class="header-bar">
    <!-- <img src="../../../../assets/images/logo1.png" alt="上下网" class="logo"> -->
    <p style="width:180px; font-size: 16px; color: #fff">上下科技分公司管理平台</p>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import './header-bar.less'
export default {
  name: 'HeaderBar'
}
</script>
