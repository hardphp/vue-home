<template>
  <div class="home">
    <van-search v-model="keyword" placeholder="请输入搜索关键词" background="#ff4444" @search="onSearch"/>
    <van-swipe :autoplay="3000" class="home-swipe" height="168">
      <van-swipe-item v-for="thumb in banner" :key="thumb.id">
        <img :src="thumb.img" >
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar v-show="notice" :text="notice" left-icon="volume-o"/>

    <div class="tuijian">
      <van-row>
        <van-col span="12" class="cate-border van-col-border">
          <div class="cate" @click="gotourl('lists',{'id':tuijian[0].id ,'mark':tuijian[0].mark})">
            <div class="cate-title">{{ tuijian[0].title }}</div>
            <div class="cate-desc">{{ tuijian[0].descript }}</div>
          </div>
          <div class="cate-img" @click="gotourl('lists',{'id':tuijian[0].id ,'mark':tuijian[0].mark})">
            <img :src="tuijian[0].img">
          </div>
        </van-col>
        <van-col span="6" class="cate-border van-col-border" >
          <div class="cate-title" @click="gotourl('lists',{'id':tuijian[1].id ,'mark':tuijian[1].mark})">{{ tuijian[1].title }}</div>
          <div class="cate-desc" @click="gotourl('lists',{'id':tuijian[1].id ,'mark':tuijian[1].mark})">{{ tuijian[1].descript }}</div>
          <div class="cate-img2" @click="gotourl('lists',{'id':tuijian[1].id ,'mark':tuijian[1].mark})">
            <img :src="tuijian[1].img">
          </div>
        </van-col>
        <van-col span="6" class="van-col-border" >
          <div class="cate-title" @click="gotourl('lists',{'id':tuijian[2].id ,'mark':tuijian[2].mark})">{{ tuijian[2].title }}</div>
          <div class="cate-desc" @click="gotourl('lists',{'id':tuijian[2].id ,'mark':tuijian[2].mark})">{{ tuijian[2].descript }}</div>
          <div class="cate-img2" @click="gotourl('lists',{'id':tuijian[2].id ,'mark':tuijian[2].mark})">
            <img :src="tuijian[2].img">
          </div>
        </van-col>
      </van-col>
      </van-row>
      <van-row>
        <van-col span="12" class="cate-border" >
          <div class="cate" @click="gotourl('lists',{'id':tuijian[3].id ,'mark':tuijian[3].mark})">
            <div class="cate-title">{{ tuijian[3].title }}</div>
            <div class="cate-desc">{{ tuijian[3].descript }}</div>
          </div>
          <div class="cate-img" @click="gotourl('lists',{'id':tuijian[3].id ,'mark':tuijian[3].mark})">
            <img :src="tuijian[3].img">
          </div>
        </van-col>
        <van-col span="12">
          <div class="cate" @click="gotourl('lists',{'id':tuijian[4].id ,'mark':tuijian[4].mark})">
            <div class="cate-title">{{ tuijian[4].title }}</div>
            <div class="cate-desc">{{ tuijian[4].descript }}</div>
          </div>
          <div class="cate-img" @click="gotourl('lists',{'id':tuijian[4].id ,'mark':tuijian[4].mark})">
            <img :src="tuijian[4].img">
          </div>
        </van-col>
      </van-row>
    </div>
    <van-tabs sticky swipeable @change="changeCate">
      <van-tab
        v-for="cate in cates"
        :title="cate.title"
        :key="cate.id"
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

    <van-tabbar active-color="#f44">
      <van-tabbar-item icon="home-o" @click="gotourl('home')">首页</van-tabbar-item>
      <van-tabbar-item :icon="daohang[0].img" @click="gotourl('lists',{'id':daohang[0].id ,'mark':daohang[0].mark})">{{ daohang[0].title }}</van-tabbar-item>
      <van-tabbar-item icon="search" @click="gotourl('search',{'keyword':''})">搜索</van-tabbar-item>
      <van-tabbar-item :icon="daohang[1].img" @click="gotourl('lists',{'id':daohang[1].id ,'mark':daohang[1].mark})">{{ daohang[1].title }}</van-tabbar-item>
      <van-tabbar-item icon="user-o" @click="gotourl('user')">代理</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Swipe, Card, SwipeItem, NoticeBar, Tag, Tab, Tabs, Tabbar, TabbarItem, Search, List, Toast } from 'vant'
import { getCates, getMaterial } from '@/api/taobaoke'
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
    [List.name]: List,
    [Toast.name]: Toast
  },

  data() {
    return {
      keyword: '',
      banner: [],
      notice: '',
      tuijian: [],
      daohang: [],
      cateMark: '9660',
      cates: [],
      finishedText: '没有更多了',
      loading: false,
      finished: false,
      page: 1,
      lists: []
    }
  },
  created() {
    this.fetchCateList()
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
    onSearch() {
      if (!this.keyword) {
        Toast('请输入关键词')
      } else {
        this.$router.push({ name: 'search', params: { 'keyword': this.keyword }})
      }
    },
    fetchCateList() {
      getCates().then(response => {
        this.banner = response.data.ad
        this.cates = response.data.cates[1][0]['lists']
        this.tuijian = response.data.cates[2]
        this.daohang = response.data.cates[3]
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
.home {
  padding-bottom: 50px;
  background-color: rgb(242, 242, 242);
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
