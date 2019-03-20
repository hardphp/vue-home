<template>
  <div class="reg">
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
        v-model="sms"
        center
        clearable
        label="验证码"
        left-icon="contact"
        placeholder="请输入短信验证码"
      >
        <van-button slot="button" size="small" type="warning">发送验证码</van-button>
      </van-field>
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
    <van-cell-group>
      <van-field
        v-model="password"
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        left-icon="contact"
      />
    </van-cell-group>
    <div class="reg-btn">
      <van-button block size="small" type="warning">提交注册</van-button>
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
.reg {
  margin-top: 20px;
  background-color: #f2f2f2;
  &-btn{
    margin: 20px;
  }
}
</style>
