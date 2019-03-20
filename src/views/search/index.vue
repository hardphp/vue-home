<template>
  <div class="home">
    <van-search v-model="keyword" placeholder="请输入搜索关键词" background="#ff4444" @search="onSearch"/>
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="finishedText"
      @load="onLoad"
    >
      <van-card
        v-for="good in lists"
        :thumb="good.pictUrl"
        :title="good.title"
        price
      >
        <div slot="desc" class="card-desc" @click="gotourl('goods',{'numiid':good.numiid ,'volume':good.volume,'couponAmount':good.couponAmount,'price':good.price,'commission':good.commission,'url':good.couponUrl})">
          <span>现价 ￥{{ good.zkFinalPrice }}</span>
          <span class="to-right">月销 {{ good.volume }}</span>
        </div>
        <div slot="tags" class="card-tags" @click="gotourl('goods',{'numiid':good.numiid ,'volume':good.volume,'couponAmount':good.couponAmount,'price':good.price,'commission':good.commission,'url':good.couponUrl})">
          <van-tag type="danger">券 {{ good.couponAmount }}元</van-tag>
        </div>
        <div slot="price" class="card-price" @click="gotourl('goods',{'numiid':good.numiid ,'volume':good.volume,'couponAmount':good.couponAmount,'price':good.price,'commission':good.commission,'url':good.couponUrl})">
          <span>券后价 ￥{{ good.price }}</span>
        </div>
        <div slot="num" class="card-num" @click="gotourl('goods',{'numiid':good.numiid ,'volume':good.volume,'couponAmount':good.couponAmount,'price':good.price,'commission':good.commission,'url':good.couponUrl})">
          <span><van-icon name="balance-o" />赚 ￥{{ good.commission }}</span>
        </div>
      </van-card>
    </van-list>
  </div>
</template>

<script>
import { Icon, Card, SwipeItem, Search, List, Toast } from 'vant'
import { search } from '@/api/taobaoke'
export default {
  components: {
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Search.name]: Search,
    [List.name]: List,
    [Toast.name]: Toast
  },
  data() {
    return {
      keyword: this.$route.params.keyword,
      finishedText: '没有更多了',
      loading: false,
      finished: false,
      page: 1,
      lists: []
    }
  },
  created() {

  },
  methods: {
    gotourl(url, params = null) {
      this.$router.push({ name: url, params: params })
    },
    onSearch() {
      if (!this.keyword) {
        Toast('请输入关键词')
      } else {
        this.page = 1
        this.lists = []
        this.getData()
      }
    },
    onLoad() {
      if (!this.keyword) {
        Toast('请输入关键词')
        this.loading = false
      } else {
        this.getData()
      }
    },
    getData() {
      search({ keyword: this.keyword, pageNo: this.page }).then(response => {
        if (response.data.length > 0) {
          this.lists.push(...response.data)
          this.page++
        } else {
          this.finished = true
        }
        this.loading = false
      })
    }

  }
}
</script>

<style lang="less">
.home {
  padding-bottom: 50px;
  background-color: #f2f2f2;

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }
}

.van-card{
  margin-top: 0px !important;
  margin-bottom: 1px;
  padding-left: 0;
  background-color: #fff;
  .van-card__thumb{
    width: 110px;
    height: 110px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .van-card__content{
    height: 110px;
    .card-desc {
      margin-top: 5px;
      margin-bottom: 5px;
      .to-right {
        float: right;
      }
    }
    .card-tags {
      margin: 5px 0;
    }
    .card-num{
      color: #ed6a0c;
      .van-icon{
        top:1.5px;
      }
    }
  }

}
</style>
