<template>
    <div>
        <el-row :gutter="20">
          <el-col :span="10">江苏传智播客教育科技股份有限公司</el-col>
          <el-col :span="2" offset="5">123</el-col>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link" style="cursor:pointer">
            <img width="30px" :src="userInfo.photo">
              {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>用户设置</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  }
}
</script>

<style lang="less" scoped>
</style>
