<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
      <div>
      <el-button type="success">发布</el-button>
      <el-button type="primary">草稿</el-button>
      </div>
    </div>
    <!-- 表单 -->
    <el-col :span="10">
      <el-form ref="form" :model="articleForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="articleForm.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <!-- <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group> -->
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="articleForm.channel_id" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- /表单 -->
  </el-card>
</template>

<script>
export default {
  name: 'AppPublish',
  data () {
    return {
      articleForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        channel_id: 3, //  文章所属频道id
        cover: { //  封面
          type: 0, //  封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.publish-card {
  min-height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
