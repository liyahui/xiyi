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
      <template v-if="[1, 5].includes(data.orderStatus)">
        <el-form-item label-width="0" class="textarea">
          <el-input type="textarea" placeholder="备注" resize="none" v-model="remark"></el-input>
        </el-form-item>
        <el-form-item label-width="0" class="button">
          <el-button type="primary" style="width: 100%" @click="handleOrderConfirm">确认收到衣服</el-button>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
  import {orderStatusList} from '../utils/constants'
  import {Form, FormItem, Input, Button} from 'element-ui'
  import {registerElementUI} from '../utils'

  export default {
    components: {
      ...registerElementUI([Form, FormItem, Input, Button])
    },
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
        this.$emit('confirm', this.data, this.remark)
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
