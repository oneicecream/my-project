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
        style="width: 100%"
        v-loading="articleLoading">
        <el-table-column
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
          label="状态"
          width="180">
          <template slot-scope="scope">
            <el-tag :type="statTypes[scope.row.status].type">{{ statTypes[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作">
          <template>
            <el-button type="primary" plain>修改</el-button>
            <el-button type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--
        数据分页
        page-size 配置每页大小，默认是10
        total 用来配置总记录数
        分页组件会根据每页大小和总记录数进行分页
      -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalCount"
        :disabled="articleLoading"
        @current-change="handleCurrentChange">
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
      articles: [],
      statTypes: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      pageSize: 10, // 每页大小
      totalCount: 0, // 总数据量
      page: 1, // 当前页码
      articleLoading: false // 加载中
    }
  },
  created () {
    this.loadArticles()
  },

  methods: {
    async loadArticles () {
      // 请求开始，加载 loading
      this.articleLoading = true
      // const token = getUser().token
      // 除了登录相关接口之后，其他接口都必须在请求头中通过 Authorization 字段提供用户 token
      // 当我们登陆成功，服务端会生成一个 token 令牌，放到用户信息中
      const data = await this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page: this.page, // 页码
          per_page: this.pageSize// 每页大小
        }
        // headers: {
        //   Authorization: `Bearer ${token}` // 后端要求: 将 token 以 'Bearer token' 的数据格式放到请求头的 Authorization 字段中
        // }
      })
      this.articles = data.results
      this.totalCount = data.total_count
      // 请求结束，停止 loading
      this.articleLoading = false
    },

    handleCurrentChange (page) {
      // 将数据中的页码修改为当前最新改变的数据页码
      this.page = page

      // 页码改变，重新加载当前文章列表
      this.loadArticles()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
