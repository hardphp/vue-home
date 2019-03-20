<template>
  <div class="reg">
    <van-cell-group>
      <van-field
        v-model="phone"
        label="姓名"
        placeholder="请输入姓名"
        left-icon="contact"
      />
    </van-cell-group>
    <div class="reg-btn">
      <van-button block size="small" type="warning">保存</van-button>
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
