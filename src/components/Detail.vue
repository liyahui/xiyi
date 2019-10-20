<template>
  <div>
    <el-form label-width="150px" label-position="left" class="form" v-loading="loading">
      <el-form-item label="取衣码">
        {{data.fetchCode || '-'}}
      </el-form-item>
      <el-form-item label="订单编号">
        {{data.orderNo || '-'}}
      </el-form-item>
      <el-form-item label="下单时间">
        {{data.createTime || '-'}}
      </el-form-item>
      <el-form-item label="预约取衣日期">
        {{data.fetchDate || '-'}}
      </el-form-item>
      <el-form-item label="订单状态">
        {{orderStatus}}
      </el-form-item>
      <el-form-item label="订单优惠">
        {{data.reductionAmount}} 元
      </el-form-item>
      <el-form-item label="支付金额">
        {{data.payAmount}} 元
      </el-form-item>
      <el-form-item label="下单门店">
        {{data.merchantBrand || '-'}}
      </el-form-item>
      <el-form-item label-width="0" class="textarea">
        <el-input type="textarea" placeholder="备注" resize="none" v-model="remark"></el-input>
      </el-form-item>
      <el-form-item label-width="0" class="button">
        <el-button type="primary" style="width: 100%" @click="handleOrderConfirm">确认收到衣服</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {orderStatusList, orderConfirmActionMap} from '../utils/constants'
  import {confirmOrder} from '../api'
  import {Message} from 'element-ui'

  export default {
    props: {
      data: {
        type: Object
      },
      loading: {
        type: Boolean
      }
    },
    data() {
      return {
        remark: ''
      }
    },
    computed: {
      orderStatus() {
        const result = orderStatusList.find(status => status.value === this.data.orderStatus)
        return result ? result.label : '-'
      }
    },
    methods: {
      async handleOrderConfirm() {
        try {
          const res = await confirmOrder({
            action: orderConfirmActionMap[this.data.orderStatus],
            orderNo: this.data.orderNo,
            merchantRemark: this.remark
          })
          if (res.error) {
            throw new Error(res.error.message)
          } else {
            this.$emit('confirm')
          }
        } catch (err) {
          Message.error(err.message)
        }
      }
    }
  }
</script>

<style lang="less">
  .detail-drawer {
    .form {
      padding: 0 30px;

      .el-form-item {
        margin-bottom: 0;

        &.textarea, &.button {
          margin-top: 10px;
        }
      }

      .el-form-item__content {
        text-align: right;
      }
    }
  }
</style>
