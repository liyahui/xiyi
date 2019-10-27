<template>
  <div :class="$style.wrapper">
    <el-container>
      <el-header :class="$style.header">
        <div :class="$style.title">
          {{title}}
        </div>
        <div :class="$style.logout" @click="handleLogout">
          退出
        </div>
      </el-header>
      <el-main>
        <div :class="$style.head">
          <el-radio-group v-model="orderStatus" @change="handleStatusChange" :class="$style.group">
            <el-radio-button v-for="status in orderStatusList" :key="status.value" :label="status.value">
              {{status.label}}
            </el-radio-button>
          </el-radio-group>
          <el-input
            placeholder="请输入取衣码或手机号" :class="$style.search" v-model.trim="keyword" clearable @clear="getPageData"
          >
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
          <el-button-group :class="$style.page">
            <el-button type="primary" icon="el-icon-arrow-left" @click="handlePrevPage" :disabled="pageNo === 1">
              上一页
            </el-button>
            <el-button type="primary" @click="handleNextPage" :disabled="!hasNext">
              下一页
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-button-group>
        </div>
        <div :class="$style.list">
          <el-table v-loading="loading" :data="orderList" border style="width: 100%">
            <el-table-column prop="orderNo" label="订单号" width="200">
              <template slot-scope="scope">
                <el-button type="text" @click="handleOrderDetail(scope.row.orderNo)">{{scope.row.orderNo}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="count" label="图片">
              <template slot-scope="scope">
                <el-image
                  v-for="photo in scope.row.photoList"
                  :src="photo"
                  :key="photo"
                  :class="$style.image"
                  fit="cover"
                  :preview-src-list="scope.row.photoList"
                />
              </template>
            </el-table-column>
            <el-table-column prop="count" label="数量" width="100"/>
            <el-table-column prop="createTime" label="时间" width="180"/>
            <el-table-column prop="count" label="操作" width="150" v-if="showOperate">
              <template slot-scope="scope">
                <el-button type="primary" size="medium" @click="handleOrderConfirm(scope.row)">
                  确认收到衣服
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
    <el-drawer
      :visible.sync="detailShow" width="auto" title="详情" custom-class="detail-drawer" @closed="detailData = {}"
    >
      <Detail :data="detailData" :loading="detailLoading" @confirm="handleOrderConfirm"/>
    </el-drawer>
  </div>
</template>

<script>
  import {
    Message,
    Container,
    Header,
    Main,
    RadioGroup,
    RadioButton,
    Input,
    ButtonGroup,
    Button,
    Table,
    TableColumn,
    Drawer,
    Image,
    Dialog
  } from 'element-ui'
  import * as store from '../utils/store'
  import {getOrderList, getOrderDetail, confirmOrder} from '../api'
  import Detail from '../components/Detail'
  import {orderStatusList, orderConfirmActionMap} from '../utils/constants'
  import {registerElementUI} from '../utils'

  export default {
    components: {
      ...registerElementUI([
        Container,
        Header,
        Main,
        RadioGroup,
        RadioButton,
        Input,
        ButtonGroup,
        Button,
        Table,
        TableColumn,
        Drawer,
        Image,
        Dialog
      ]),
      Detail
    },
    data() {
      return {
        loading: false,
        orderStatusList,
        orderStatus: 1,
        orderList: [],
        pageNo: 1,
        pageSize: 10,
        detailData: {},
        detailLoading: false,
        detailShow: false,
        hasNext: true,
        keyword: '',
        showOperate: true
      }
    },
    computed: {
      title() {
        const merchant = store.get('merchant') || {}
        return merchant.merchantBrand || ''
      }
    },
    methods: {
      handleStatusChange() {
        this.showOperate = [1, 5].includes(this.orderStatus)
        this.pageNo = 1
        this.getPageData()
      },
      handlePrevPage() {
        if (this.pageNo > 1) {
          this.pageNo--
          this.getPageData()
        }
      },
      handleNextPage() {
        this.pageNo++
        this.getPageData()
      },
      handleSearch() {
        this.pageNo = 1
        this.getPageData()
      },
      async getPageData() {
        this.loading = true
        try {
          const {pageNo, pageSize, orderStatus, keyword} = this
          const params = {
            pageNo,
            pageSize,
            orderStatus
          }
          if (keyword) {
            params[/^1\d{10}$/.test(keyword) ? 'phoneNo' : 'fetchCode'] = keyword
          }

          const res = await getOrderList(params)
          if (res.error) {
            throw new Error(res.error.message)
          } else {
            if (res.data.length) {
              this.hasNext = true
              this.orderList = res.data
            } else {
              if (this.pageNo === 1) {
                this.orderList = []
              }
              this.hasNext = false
            }
          }
        } catch (err) {
          Message.error(err.message)
        } finally {
          this.loading = false
        }
      },
      async handleOrderDetail(orderNo) {
        this.detailShow = true
        this.detailLoading = true
        try {
          const res = await getOrderDetail(orderNo)
          this.detailData = res.data
        } catch (err) {
          Message.error(err.message)
        } finally {
          this.detailLoading = false
        }
      },
      async handleOrderConfirm({orderNo, orderStatus}, merchantRemark = '') {
        try {
          const res = await confirmOrder({
            action: orderConfirmActionMap[orderStatus],
            orderNo,
            merchantRemark
          })
          if (res.error) {
            throw new Error(res.error.message)
          } else {
            this.detailShow = false
            this.getPageData()
          }
        } catch (err) {
          Message.error(err.message)
        }
      },
      handleLogout() {
        store.remove('merchant')
        this.$router.push('/login')
      }
    },
    mounted() {
      this.getPageData()
    },
    created() {
      document.title = this.title
    }
  }
</script>

<style lang="less" module>
  .header {
    background: #409eff;
  }

  .title {
    line-height: 60px;
    color: #fff;
    font-size: 22px;
    float: left;
  }

  .list {
    margin-top: 20px;
  }

  .image {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }

  .head {
    display: flex;
    position: relative;
  }

  .search {
    width: 300px;
    margin-left: 20px;
  }

  .page {
    position: absolute;
    right: 0;
    top: 0;
  }

  .logout {
    float: right;
    line-height: 30px;
    padding: 15px 0;
    cursor: pointer;
    color: #fff;
  }
</style>
