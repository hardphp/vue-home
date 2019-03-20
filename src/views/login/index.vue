<template>
  <div class="login">
    <van-cell-group>
      <van-field
        v-model="phone"
        label="手机号"
        placeholder="请输入手机号"
        left-icon="contact"
      />
    </van-cell-group>

    <van-cell-group>
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        left-icon="contact"
      />
    </van-cell-group>

    <div class="login-btn">
      <van-button block size="small" type="warning">登录</van-button>
    </div>
  </div>
</template>

<script>
import {
  Col,
  Icon,
  Cell,
  CellGroup,
  Toast,
  Field,
  Button
} from 'vant'

export default {
  components: {
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button
  },

  data() {
    return {

    }
  },

  methods: {

  }
}
</script>

<style lang="less">
.login {
  margin-top: 20px;
  background-color: #f2f2f2;
  &-btn{
    margin: 20px;
  }
}
</style>
