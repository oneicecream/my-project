<template>
  <div class='login-wrap'>
    <!-- 给组件加 class， 会把class作用到组件的根元素上 -->
    <!-- 配置校验规则
            reles 规则对象配置到 el-form 上
            prop  校验字段配置到 el-form-item 上
         JavaScript 触发验证
            给 el-form 添加 ref
            调用 this.$refs['ref名字'].validate(valie => {}) 触发验证
    -->
    <el-form class='login-form' ref='form' :model='form' :rules='rules'>
      <p>
        <img src='@/assets/logo_index.png' alt>
      </p>
      <el-form-item prop='mobile'>
        <el-input v-model='form.mobile' placeholder='手机号'></el-input>
      </el-form-item>
      <el-form-item prop='code'>
        <!-- el-col 栅格布局，一共 24 列，:span 用来指定占用的大小，:offset 用来指定偏移量 -->
        <el-col :span='14'>
          <el-input v-model='form.code' placeholder='验证码'></el-input>
        </el-col>
        <el-col :offset='1' :span='9'>
          <!-- <el-button type='primary' @click='handleSendCode'>获取验证码</el-button> -->
          <!-- :disabled 禁用状态 当codeTimer中有定时器时禁用，当codeTimer中的定时器被清楚时 此按钮恢复使用 -->
          <el-button
          type='primary'
          @click='handleSendCode'
          :disabled='!!codeTimer'
          :loading="codeLoading"
          >{{ codeTimer ? `剩余${codeTimeSeconds}秒` : '获取验证码' }}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item prop="agrss">
        <el-checkbox v-model="form.agrss">我同意该<a href="#">协议</a></el-checkbox>
      </el-form-item>
      <el-form-item class='login-denglu'>
        <el-button
         class="btn-login"
         type='primary'
         @click='handleLogin'
         :loading="loginLoading"
         >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import '@/vendor/gt'
// import '@/vendor/gt' // 引入极验 JavaScript SDK 文件，通过 window.initGeetest 使用
import { saveUser } from '@/utils/auth' // 按需加载，加载模块中非 export defaule 成员
import initGeetest from '@/utils/init-geetest'
const initCodeTimeSeconds = 60 // codeTimeSeconds 的初始值
// 引入极验 JavaScript SDK 文件， 通过window.initGeetest 使用

export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '',
        code: '',
        agrss: ''
      },
      rules: { // 验证规则对象
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // { len: 11 , message: '长度必须11位', trigger: 'blur' }
          { pattern: /\d{11}/, message: '长度必须11位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // { len: 6 , message: '请输入正确的验证码', trigger: 'blur' }
          { pattern: /\d{6}/, message: '请输入正确的验证码', trigger: 'blur' }
        ],
        agrss: [
          { required: true, message: '请同意用户协议' },
          { pattern: /true/, message: '清同意用户协议' }
        ]
      },
      codeTimer: null, // 倒计时定时器
      codeTimeSeconds: initCodeTimeSeconds, // 倒计时时间
      loginLoading: false, // 登陆中 loading
      codeLoading: false
    }
  },
  methods: {
    handleLogin () {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        // 表单验证通过，提交登录请求
        this.submitLogin()
      })
    },

    async submitLogin () {
      this.loginLoading = true
      try {
        const userInfo = await this.$http({
          method: 'POST',
          url: '/authorizations',
          // data: {
          //     mobile,
          //     code
          // }
          data: this.form
        })
        // >=200 && <400 的状态码会进入then成功
        // window.localStorage.setItem('user_info', JSON.stringify(userInfo))
        saveUser(userInfo)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
        // console.log(res.data)
      } catch (err) { // >= 400 的状态码都会进入这里
        this.$message.error('登录失败，手机号或验证码错误')
      }
      this.loginLoading = false
    },

    handleSendCode () {
      // 验证手机号是否有效
      this.$refs['form'].validateField('mobile', errorMessage => {
        // 如果校验失败
        if (errorMessage.trim().length > 0) {
          return
        }

        // 验证码通过，初始化显示人机交互验证码
        this.showGeetest()
      })
    },

    async showGeetest () {
      try {
        this.codeLoading = true
        // 任何函数中的 function 内部的 this 指向 window
        const mobile = this.form.mobile
        const data = await this.$http({
          method: 'GET',
          url: `/captchas/${mobile}`
        })
        const captchaObj = await initGeetest({
        // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: true,
          product: 'bind'
        })
        captchaObj.onReady(() => {
          this.codeLoading = false
          // 验证码ready之后才能调用verify方法显示验证码
          captchaObj.verify() // 弹出验证码内容框
        }).onSuccess(async () => {
        // your code
        // console.log(captchaObj.getValidate())
          try {
            const {
              geetest_challenge: challenge,
              geetest_validate: validate,
              geetest_seccode: seccode
            } = captchaObj.getValidate()
            // 发送短信
            await this.$http({
              method: 'GET',
              url: `/sms/codes/${mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            })
            // 发送短信成功，开始倒计时
            // console.log (res.data)
            // 调用倒计时函数
            this.codeCountDown()
          } catch (err) {
            this.$message.error('获取验证码失败')
            this.codeLoading = false
          }
        })
      } catch (err) {
        this.$message.error('获取验证码失败')
        this.codeLoading = false
      }
    },

    //  验证码倒计时
    codeCountDown () {
      this.codeTimer = window.setInterval(() => {
        this.codeTimeSeconds--
        if (this.codeTimeSeconds <= 0) {
          // 清除定时器
          window.clearInterval(this.codeTimer)
          // 让倒计时的时间回归初始状态
          this.codeTimeSeconds = initCodeTimeSeconds
          this.codeTimer = null // 将储存定时器引用的变量重新赋值为 null
        }
      }, 1000)
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
