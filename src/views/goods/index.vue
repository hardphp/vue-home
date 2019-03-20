<template>
  <div class="goods">
    <van-swipe :autoplay="3000" class="goods-swipe" height="375">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <van-col span="20">
          <div class="goods-title">{{ goods.title }}</div>
          <div class="goods-price">券后价 ￥{{ goods.price }}</div>
        </van-col>
        <van-col span="4" class="goods-detail">
          <van-icon name="description" />
          <span>详情</span>
        </van-col>
      </van-cell>
      <van-cell class="goods-volume">
        <van-col span="12">现价 ￥{{ goods.zkFinalPrice }}</van-col>
        <van-col span="12" style="text-align:right">月销 {{ goods.volume }}</van-col>
      </van-cell>
      <van-cell class="goods-volume">
        <van-col span="12" >优惠券 {{ goods.remain }} 元</van-col>
        <van-col span="12" style="text-align:right">佣金 ￥{{ goods.commission }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-mini-btn icon="home-o" @click="goHome">
        首页
      </van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="share" @click="showShare">
        分享
      </van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="lingqu">
        立即领取
      </van-goods-action-big-btn>
      <van-goods-action-big-btn primary @click="showKouling">
        淘口令下单
      </van-goods-action-big-btn>
    </van-goods-action>

    <van-popup v-model="kouling" position="bottom" class="van-container">
      <div class="van-header">
        <div class="img-wrap">
          <img :src="goodsImg">
        </div>
        <div class="goods-info">
          <div class="van-goods-name" v-text="goods.title"/>
          <div class="van-goods-price">
            <span class="van-price-symbol">券后价 ￥</span>
            <span class="van-price-num">{{ goods.price }}</span>
          </div>
          <van-icon name="close" class="van-close-icon" @click="closeKouling" />
        </div>
      </div>
      <div class="van-body" v-html="shareText"/>
      <div class="van-foot">
        <van-button type="danger" size="small" block round @click="handleCopy($event)">立即复制</van-button>
      </div>
    </van-popup>

  </div>
</template>

<script>
import clip from '@/utils/clipboard'
import { getdetail } from '@/api/taobaoke'
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  Popup,
  Button,
  GoodsActionMiniBtn
} from 'vant'

export default {
  components: {
    [Tag.name]: Tag,
    [Popup.name]: Popup,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [Button.name]: Button,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn
  },

  data() {
    return {
      kouling: false,
      shareText: '',
      goodsImg: '',
      goods: {
        title: '',
        price: this.$route.params.price,
        zkFinalPrice: 0,
        volume: this.$route.params.volume,
        remain: this.$route.params.couponAmount,
        commission: this.$route.params.commission,
        tpwd: '',
        thumb: []
      }
    }
  },
  created() {
    this.getGood(this.$route.params.numiid, this.$route.params.url)
  },

  methods: {
    getGood(numiid, url) {
      getdetail({ numiid: numiid, url: url }).then(response => {
        this.goods.title = response.data.title
        this.goodsImg = response.data.pictUrl
        this.goods.zkFinalPrice = response.data.zkFinalPrice
        this.goods.thumb = response.data.smallImages
        this.goods.tpwd = response.data.tpwd
      })
    },
    formatPrice(price) {
      return '¥' + (price / 100).toFixed(2)
    },
    showKouling() {
      this.shareText = '复制这条信息，' + this.goods.tpwd + ' ，打开【手机淘宝】即可查看'
      this.kouling = true
    },
    closeKouling() {
      this.kouling = false
    },
    showShare() {
      this.shareText = '' + this.goods.title + '\n\n' +
                          '【在售价】' + this.goods.zkFinalPrice + '元\n' +
                          '【优惠券】' + this.goods.remain + '元\n' +
                          '【券后价】' + this.goods.price + '元\n' +
                          '---------------------------------------------------\n' +
                          '复制这条信息，' + this.goods.tpwd + ' ，打开【手机淘宝】即可查看'
      this.kouling = true
    },
    handleCopy(event) {
      clip(this.shareText, event)
      Toast('复制成功')
    },
    goHome() {
      this.$router.push({ name: 'home' })
    },
    lingqu() {
      window.location.href = this.$route.params.url
    }
  }
}
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;
  background-color: #f2f2f2;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-volume {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }
  &-detail{
    text-align: right;
    .van-icon{
      font-size: 25px;
      top: 10px;
    }
    span{
      display: block;
    }
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }

  .van-container{
    font-size: 14px;
    background: #fff;
    overflow-y: visible;
    max-height: -webkit-max-content;
    max-height: max-content;

      .van-header{
        margin-left: 15px;
        font-size: 14px;
        background: #fff;
        overflow-y: visible;
        max-height: -webkit-max-content;
        max-height: max-content;

        .img-wrap{
          position: relative;
          float: left;
          margin-top: -10px;
          width: 80px;
          height: 80px;
          background: #f8f8f8;
          border-radius: 2px;

            img {
              position: absolute;
              margin: auto;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              max-width: 100%;
              max-height: 100%;
            }
        }

        .goods-info{
          padding: 10px 60px 10px 10px;
          min-height: 82px;
          overflow: hidden;
          box-sizing: border-box;
            .van-goods-name{
              font-size: 12px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .van-goods-price {
              color: #f44;
              margin-top: 10px;
              vertical-align: middle;
                .van-price-symbol {
                  vertical-align: middle;
                }
                .van-price-num {
                  font-size: 16px;
                  vertical-align: middle;
                }
            }

            .van-close-icon {
              top: 10px;
              right: 15px;
              font-size: 20px;
              color: #969799;
              position: absolute;
              text-align: center;
            }

        }
      }
      .van-body{
        min-height: 50px;
        color: #323233;
        text-align: left;
        font-size: 12px;
        margin: 5px;
        border: 1px dotted #becfd0;
        padding: 5px;
        background-color: #f1f4f8;
        white-space: pre;
      }
      .van-foot{
        margin: 15px;
      }
  }

}
</style>
