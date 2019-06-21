<template>
  <div class="login-wrap">
    <!-- 给组件加 class， 会把class作用到组件的根元素上 -->
    <el-form class="login-form" ref="form" :model="form">
      <p>
        <img src="@/assets/logo_index.png" alt>
      </p>
      <el-form-item>
        <el-input v-model="form.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- el-col 栅格布局，一共 24 列，:span 用来指定占用的大小，:offset 用来指定偏移量 -->
        <el-col :span="14">
          <el-input v-model="form.code" placeholder="验证码"></el-input>
        </el-col>
        <el-col :offset="1" :span="9">
          <el-button type="primary" @click="handleSendCode">获取验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item class="login-denglu">
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import '@/vendor/gt'
// 引入极验 JavaScript SDK 文件， 通过window.initGeetest 使用

export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },

    handleSendCode () {
      const mobile = this.form.mobile
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        const { data } = res.data
        window.initGeetest(
          {
            // 以下配置参数来自服务端 SDK
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: true,
            product: 'bind'
          },
          function (captchaObj) {
            // 这里可以调用验证实例 captchaObj 的实例方法
            // console.log(captchaObj)
            captchaObj
              .onReady(function () {
                // 验证码ready之后才能调用verify方法显示验证码
                captchaObj.verify() // 弹出验证码内容框
              })
              .onSuccess(function () {
                // your code
                // console.log(captchaObj.getValidate())
                const { geetest_challenge: challenge,
                  geetest_validate: validate,
                  geetest_seccode: seccode
                } = captchaObj.getValidate()
                axios({
                  method: 'GET',
                  url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
                  params: {
                    challenge,
                    validate,
                    seccode
                  }
                }).then(res => {
                  console.log(res.data)
                })
              })
              .onError(function () {
                // your code
              })

            // 在这里注册“发送验证码”按钮的点击事件，然后进行验证用户是否输入手机号，以及手机号格式是否正确，没有问题：调用captchaObj.verify方法
          }
        )
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login-wrap {
  height: 100%;
  background-color: #e1f0ff;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    background-color: #fff;
    width: 400px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 20px;
    .login-denglu {
      width: 100%;
      .el-button {
        width: 100%;
      }
    }
    p {
      width: 100%;
      text-align: center;
      padding: 10px 0;
    }
  }
}
</style>
