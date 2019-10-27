<template>
  <div :class="$style.wrapper">
    <el-form :class="$style.form" :model="model" :rules="rules" ref="form">
      <el-form-item prop="loginName">
        <el-input placeholder="用户名" v-model="model.loginName" @keydown.enter.native="handleSubmit"/>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input placeholder="密码" type="password" v-model="model.pwd" @keydown.enter.native="handleSubmit"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :class="$style.button" @click="handleSubmit">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {Message, Form, FormItem, Input, Button} from 'element-ui'
  import {login} from '../api'
  import * as store from '../utils/store'
  import {registerElementUI} from '../utils'

  export default {
    components: {
      ...registerElementUI([
        Form,
        FormItem,
        Input,
        Button
      ])
    },
    data() {
      return {
        model: {
          loginName: '',
          pwd: ''
        },
        rules: {
          loginName: [
            {
              required: true,
              message: '请输入用户名'
            }
          ],
          pwd: [
            {
              required: true,
              message: '请输入密码'
            }
          ]
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.form.validate(valid => {
          valid && this.handleLogin()
        })
      },
      async handleLogin() {
        try {
          const res = await login(this.model)
          if (res.error) {
            throw new Error(res.error.message)
          } else {
            store.set('merchant', res.data)
            await this.$router.replace('/')
          }
        } catch (err) {
          Message.error(err.message)
        }
      }
    }
  }
</script>

<style lang="less" module>
  .wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f5f5;
  }

  .form {
    width: 300px;
  }

  .button {
    width: 100%;
  }
</style>
