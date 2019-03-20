<style lang="less" scoped>
.admin-statistics {
  padding: 4rem;
  .overview-icon {
    overflow: hidden;
    margin: 2rem;
    & div:last-child {
      margin-right: 0;
    }
    .icon-item {
      width: 25rem;
      height: 10rem;
      float: left;
      margin-right: 4rem;
      background: #fff;
      overflow: hidden;
      position: relative;
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: .5rem;
      box-shadow: 4px 4px 40px rgba(0,0,0,.05);
      .icon-large {
        float: left;
        position: absolute;
        top: 50%;
        left: 2rem;
        transform: translateY(-50%);
      }
      .icon-right {
        float: right;
        position: absolute;
        top: 50%;
        right: 2rem;
        transform: translateY(-50%);
      }
    }
  }
  .line-list {
    margin-top: 10rem;
    overflow: hidden;
    .line-style {
      width: 100%;
      height: 60rem;
      /deep/canvas {
        height: 55rem !important;
      }
    }
  }
  .pie-list {
    margin-top: 10rem;
    overflow: hidden;
    .pie-style {
      width: 40rem;
      height: 40rem;
      float: left;
      margin-left: 13rem;
    }
  }
  .table-list {
    padding: 0 5rem;
    h1 {
      font-size: 2rem;
      padding: 2rem 0;
    }
  }
}
</style>
<template>
  <div class="admin-statistics">
    <!-- <div class="overview-icon">
      <div class="icon-item" v-for="item in iconPanel" :key="item.label">
        <svg class="icon-large" aria-hidden="true" :style="{'color': interactionMap[item.count].color}">
            <use :xlink:href="item.iconCode"></use>
        </svg>
        <div class="icon-right">
          <h2>{{item.label}}</h2>
          <p>{{dataCount[0][item.count]}}</p>
        </div>
      </div>
    </div> -->
    <div class="line-list">
      <div ref="interLineCharts" class="line-style"></div>
    </div>
    <div class="table-list">
      <h1>文章阅读数排行</h1>
      <Table :columns="readColumns" :data="dataCount.mostReading">
        <template slot-scope="{ row }" slot="author">
          <span>{{row.author.username}}</span>
        </template>
      </Table>
      <h1>文章点赞排行</h1>
      <Table :columns="likeColumns" :data="dataCount.mostLike"></Table>
      <h1>文章收藏排行</h1>
      <Table :columns="collectColumns" :data="dataCount.mostCollect"></Table>
    </div>
    <!-- <div class="pie-list">
      <div ref="interPieCharts" class="pie-style"></div>
      <div ref="articlePieCharts" class="pie-style"></div>
    </div> -->
  </div>
</template>
<script>
import {
  PIE_CHART_OPTIONS,
  PIE_CHARTS,
  PIE_CHARTS_OPTIONS,
  LINE_OPTIONS,
  getWeekDate,
  MOST_READ_MAP,
  MOST_LIKE_MAP,
  MOST_COLLECT_MAP
} from '../common/index.js';
import mixins from '../common/mixins.js';
const R = require('ramda');
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie'); // 引入饼图组件
require('echarts/lib/chart/line'); // 引入则线图组件
require('echarts/lib/component/legend');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
export default {
  mixins: [mixins],
  components: {},
  data () {
    return {
      adminId: '',
      dataCount: {},
      lineDataCount: {},
      interLineOptions: LINE_OPTIONS,
      readColumns: MOST_READ_MAP,
      likeColumns: MOST_LIKE_MAP,
      collectColumns: MOST_COLLECT_MAP,
      iconPanel: [
        // {
        //   label: '最受欢迎用户',
        //   iconCode: '#icon-ai-users',
        //   count: 'mostUser'
        // },
        // {
        //   label: '文章数量',
        //   iconCode: '#icon-wenzhang',
        //   count: 'article'
        // },
        {
          label: '最多议论文章',
          iconCode: '#icon-pingluncomment43-copy',
          count: 'title'
        },
        {
          label: '关注最多话题',
          iconCode: '#icon-huati',
          count: 'iconLabel'
        }
      ],
      interactionMap: {
        like: {
          label: '点赞',
          color: '#3CB2EF'
        },
        collect: {
          label: '收藏',
          color: '#67E0E3'
        },
        comment: {
          label: '评论',
          color: '#FFDB5C'
        },
        title: {
          label: '文章',
          color: '#B6A2DE'
        },
        shortArticle: {
          label: '说说',
          color: '#FB7293'
        },
        iconLabel: {
          label: '标签',
          color: '#E7BCF3'
        },
        user: {
          label: '用户',
          color: '#40C9C6'
        }
      }
    }
  },
  created() {
    this.adminId = localStorage.getItem('userid');
    this.getTheMostData();
    this.getArticleStatistics();
  },
  methods: {
    // 查询各项最大值数据
    getTheMostData() {
      this.axios.get('/getMostData', {
        params: {
          adminId: this.adminId
        }
      })
      .then(res => {
        this.dataCount = res.data;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 获得曲线
    getArticleStatistics() {
      this.axios.get('/getArticleStatistics', {
        params: {
          adminId: this.adminId
        }
      })
      .then(res => {
        this.lineDataCount = res.data;
        this.setInterActionLine();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    setInterActionLine() {
      let longLineObj = this.lineDataCount.longLine;
      let shortLineObj = this.lineDataCount.shortLine;

      this.interLineOptions = JSON.parse(JSON.stringify(LINE_OPTIONS));
      let longOptions = this.getSignOptions('长文', longLineObj);
      this.interLineOptions.legend.data.push('长文');
      this.interLineOptions.series.push(longOptions);

      let shortOptions = this.getSignOptions('短文', shortLineObj);
      this.interLineOptions.legend.data.push('短文');
      this.interLineOptions.series.push(shortOptions);

      this.interLineOptions.xAxis.data = getWeekDate();
      echarts.init(this.$refs.interLineCharts).setOption(this.interLineOptions);
      this.interLineOptions = JSON.parse(JSON.stringify(LINE_OPTIONS));
    },
  }
}
</script>
