<template>
  <div>
    <!-- 数据筛选 -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>数据筛选</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
    <!-- 数据筛选 -->

    <!-- 文章列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>一共有xxx条数据</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <!--
        table 表格不需要我们去手动 v-for  遍历
        你只需要将数组数据交给 table 表格的 data 属性就可以了
        然后配置 el-table-column 表格列组件即可
          lable 猎头标题
          prop  遍历项中的数据字段
          width 列表宽度
        表格默认把数据当做文本去输出
        如果需要其他数据格式，则可以自动以表格列
       -->
      <el-table
        class="article-list"
        :data="articles"
        style="width: 100%">
        <el-table-column
          prop="cover.images[0]"
          label="封面"
          width="180">
          <!--
            template 中的内容就是自定义表格列内容
            如果需要在 templata 中访问遍历项数据，则需要给 template 配置slot-scope="scope"
             slot-scope 属性名是固定的
             scope 值是自己随便起的名字
            结果就是：我们可以通过 scope.row 访问到当前遍历项对象就好比我们遍历中的item 一样
           -->
          <template slot-scope="scope">
            <img
            width="50"
              v-for="item in scope.row.cover.images"
              :key="item"
              :src="item">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>

      <!-- 数据分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
      <!-- /数据分页 -->
    </el-card>
    <!-- /文章列表 -->
  </div>
</template>

<script>
// import { getUser } from '@/utils/auth'
export default {
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.loadArticles()
  },

  methods: {
    async loadArticles () {
      // const token = getUser().token
      // 除了登录相关接口之后，其他接口都必须在请求头中通过 Authorization 字段提供用户 token
      // 当我们登陆成功，服务端会生成一个 token 令牌，放到用户信息中
      const data = await this.$http({
        method: 'GET',
        url: '/articles'
        // headers: {
        //   Authorization: `Bearer ${token}` // 后端要求: 将 token 以 'Bearer token' 的数据格式放到请求头的 Authorization 字段中
        // }
      })
      this.articles = data.results
    }
  }
}
</script>

<style lang="less" scoped>

</style>
