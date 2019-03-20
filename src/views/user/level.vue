<template>
  <div class="reg">
    <van-radio-group v-model="level">
      <van-cell-group>
        <van-cell title="一级代理，佣金比利100%，年费100元/年" clickable @click="level = '1'">
          <van-radio name="1" />
        </van-cell>
        <van-cell title="二级代理，佣金比利90%，年费90元/年" clickable @click="level = '2'">
          <van-radio name="2" />
        </van-cell>
         </van-cell>
        <van-cell title="三级代理，佣金比利80%，年费80元/年" clickable @click="level = '3'">
          <van-radio name="3" />
        </van-cell>
         </van-cell>
        <van-cell title="四级代理，佣金比利70%，年费70元/年" clickable @click="level = '4'">
          <van-radio name="4" />
        </van-cell>
         </van-cell>
        <van-cell title="五级代理，佣金比利60%，年费60元/年" clickable @click="level = '5'">
          <van-radio name="5" />
        </van-cell>
         </van-cell>
        <van-cell title="六级代理，佣金比利50%，年费50元/年" clickable @click="level = '6'">
          <van-radio name="6" />
        </van-cell>
        <van-cell title="七级代理，佣金比利30%，年费0元/年" clickable @click="level = '7'">
          <van-radio name="7" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="reg-btn">
      <van-button block size="small" type="warning">去支付</van-button>
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
  RadioGroup,
  Radio,
  Field,
  Button
} from 'vant'

export default {
  components: {
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Field.name]: Field,
    [Button.name]: Button
  },

  data() {
    return {
      level: 7
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
  .van-cell__title{
      flex: 80%;
  }
  .van-cell__value{
      flex: 20%;
  }
  &-btn{
    margin: 20px;
  }
}
</style>
