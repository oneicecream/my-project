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
        <el-col :span='14'>
          <el-input v-model="form.code" placeholder="验证码"></el-input>
        </el-col>
        <el-col :offset='1' :span='9'>
          <el-button type="primary" @click="onSubmit">获取验证码</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
    p {
      width: 100%;
      text-align: center;
      padding: 10px 0;
    }
  }
}
</style>
