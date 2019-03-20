<template>
  <div class="lists">

    <van-swipe :autoplay="3000" class="home-swipe" height="168">
      <van-swipe-item v-for="thumb in banner" :key="thumb.id">
        <img :src="thumb.img" >
      </van-swipe-item>
    </van-swipe>

    <van-tabs sticky swipeable @change="changeCate">
      <van-tab
        v-for="cate in cates"
        :title="cate.title"
        :key="cate.mark"
      >

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

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Swipe, Card, SwipeItem, NoticeBar, Tag, Tab, Tabs, Tabbar, TabbarItem, Search, List } from 'vant'
import { getList, getMaterial } from '@/api/taobaoke'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Card.name]: Card,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [Tag.name]: Tag,
    [Tabs.name]: Tabs,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Tab.name]: Tab,
    [Search.name]: Search,
    [List.name]: List
  },

  data() {
    return {
      banner: [],
      cateMark: this.$route.params.mark,
      cates: [],
      finishedText: '没有更多了',
      loading: false,
      finished: false,
      page: 1,
      lists: []
    }
  },
  created() {
    this.fetchCateList(this.$route.params.id)
  },
  methods: {
    gotourl(url, params = null) {
      this.$router.push({ name: url, params: params })
    },
    changeCate(index, title) {
      this.cateMark = this.cates[index].mark
      this.page = 1
      this.lists = []
      this.getData()
    },
    fetchCateList(id) {
      getList({ themeId: id }).then(response => {
        this.banner = response.data.ad
        this.cates = response.data.cates
      })
    },
    getData() {
      getMaterial({ materialId: this.cateMark, pageNo: this.page }).then(response => {
        if (response.data.length > 0) {
          this.lists.push(...response.data)
          this.page++
        } else {
          this.finished = true
        }
        this.loading = false
      })
    },
    onLoad() {
      this.getData()
    }
  }
}
</script>

<style lang="less">
.lists {
  background-color: #f2f2f2;
  &-swipe {
    height: 4.5rem;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

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
  .tuijian{
    margin: 5px 0px;
    background-color: #fff;
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
.cate{
  float: left;
  width: 60%;
}
.cate-img{
  float: right;
  width: 40%;
  overflow: hidden;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 70px;
  text-align: center;
  img{
     max-width: 100%;
     height: 100%;
  }
}
.cate-title{
  font-size: 14px;
  text-align: center;
  padding-top: 5px;
  font-weight: bold;
}
.cate-desc{
  font-size: 12px;
  text-align: center;
  padding-top: 5px;
  color: #7d7e80;
}
.cate-img2{
  width: 100%;
  overflow: hidden;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 31px;
  text-align: center;
  img{
    max-width: 100%;
    height: 100%;
  }
}
.cate-border{
  border-right: 1px solid #eee;
}
.van-col-border{
  border-bottom: 1px solid #eee;
}
</style>
