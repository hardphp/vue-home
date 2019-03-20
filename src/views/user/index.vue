<template>
  <div class="user">
    <van-cell-group class="user-info">
      <van-cell title="15237156573" value="审核中" label="代理ID:123456789" />
    </van-cell-group>
    <van-cell-group class="user-ticheng">
      <van-cell value="100%" icon="refund-o" is-link @click="gotourl('userlevel')">
        <template slot="title">
          <span class="custom-text">代理提成</span>
          <van-tag type="danger" >一级</van-tag>
        </template>
      </van-cell>
    </van-cell-group>

    <van-row class="user-links">
      <van-col span="6">
        <div class="user-money">123</div>
        账户余额(元)
      </van-col>
      <van-col span="6">
        <div class="user-money">123</div>
        待入账(元)
      </van-col>
      <van-col span="6">
        <div class="user-money">123</div>
        本月收入(元)
      </van-col>
      <van-col span="6">
        <div class="user-money">123</div>
        上月收入(元)
      </van-col>

    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="paid" title="收入明细" is-link />
    </van-cell-group>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="个人资料" is-link @click="gotourl('userinfo')"/>
      <van-cell icon="diamond-o" title="新手引导" is-link />
      <van-cell icon="chat-o" title="意见反馈" is-link />
    </van-cell-group>

    <van-cell-group >
      <van-cell icon="exchange" title="退出账户" is-link />
    </van-cell-group>

    <van-tabbar v-model="active" active-color="#f44">
      <van-tabbar-item icon="home-o" @click="gotourl('home')">首页</van-tabbar-item>
      <van-tabbar-item :icon="daohang[0].img" @click="gotourl('lists',{'id':daohang[0].id ,'mark':daohang[0].mark})">{{ daohang[0].title }}</van-tabbar-item>
      <van-tabbar-item icon="search" @click="gotourl('search',{'keyword':''})">搜索</van-tabbar-item>
      <van-tabbar-item :icon="daohang[1].img" @click="gotourl('lists',{'id':daohang[1].id ,'mark':daohang[1].mark})">{{ daohang[1].title }}</van-tabbar-item>
      <van-tabbar-item icon="user-o" @click="gotourl('user')">代理</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Tabbar, TabbarItem, Tag, Toast } from 'vant'
import { getCates } from '@/api/taobaoke'

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tag.name]: Tag
  },
  data() {
    return {
      daohang: [],
      active: 4
    }
  },
  created() {
    this.fetchCateList()
  },
  methods: {
    gotourl(url, params = null) {
      this.$router.push({ name: url, params: params })
    },
    fetchCateList() {
      getCates().then(response => {
        this.daohang = response.data.cates[3]
      })
    }
  }
}
</script>

<style lang="less">
.user {
  background-color: #f2f2f2;
  &-info{
    margin-bottom: 15px;
    .van-cell__value span{
        font-size: 12px;
        color:crimson;
    }
  }

  &-ticheng{
    .van-tag{
      margin-left: 10px;
    }
  }

  &-poster {
    width: 100%;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .user-money {
      display: block;
      font-size: 18px;
      color:chocolate;
    }
  }
}
</style>
