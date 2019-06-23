<template>
    <div>
        <el-row :gutter="20">
          <el-col :span="10">江苏传智播客教育科技股份有限公司</el-col>
          <el-col :span="2" offset="5">123</el-col>
          <el-dropdown>
            <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
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

    }
  }
}
</script>

<style lang="less" scoped>
  .el-header {
    line-height: 60px;
  }
</style>
