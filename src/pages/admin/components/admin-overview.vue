<style lang="less" scoped>
.admin-overview {
  margin: 4rem;
  margin-top: 6rem;
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

}
</style>
<template>
  <div class="admin-overview">
    <div class="overview-icon">
      <div class="icon-item" v-for="item in iconPanel" :key="item.label">
        <svg class="icon-large" aria-hidden="true" :style="{'color': interactionMap[item.count].color}">
            <use :xlink:href="item.iconCode"></use>
        </svg>
        <div class="icon-right">
          <h2>{{item.label}}</h2>
          <p>{{dataCount[item.count]}}</p>
        </div>
      </div>
    </div>
    <div class="line-list">
      <div ref="interLineCharts" class="line-style"></div>
    </div>
    <div class="pie-list">
      <div ref="interPieCharts" class="pie-style"></div>
      <div ref="articlePieCharts" class="pie-style"></div>
    </div>
  </div>
</template>
<script>
import { PIE_CHART_OPTIONS, PIE_CHARTS, PIE_CHARTS_OPTIONS, LINE_OPTIONS, getWeekDate } from '../common/index.js';
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
  components: {},
  data () {
    return {
      adminId: '',
      dataCount: {},
      lineDataCount: {},
      interPieOptions: PIE_CHARTS_OPTIONS,
      articlePieOptions: PIE_CHARTS_OPTIONS,
      interLineOptions: LINE_OPTIONS,
      lineTemplate: {
        name:'',
        type:'line',
        smooth: true,
        data:[]
      },
      iconPanel: [
        {
          label: '用户数量',
          iconCode: '#icon-ai-users',
          count: 'user'
        },
        {
          label: '文章数量',
          iconCode: '#icon-wenzhang',
          count: 'article'
        },
        {
          label: '评论数量',
          iconCode: '#icon-pingluncomment43-copy',
          count: 'comment'
        },
        {
          label: '话题数量',
          iconCode: '#icon-huati',
          count: 'tag'
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
        article: {
          label: '文章',
          color: '#B6A2DE'
        },
        longArticle: {
          label: '文章',
          color: '#B6A2DE'
        },
        shortArticle: {
          label: '说说',
          color: '#FB7293'
        },
        tag: {
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
    this.getDataCount();
  },
  mounted() {
    // echarts.init(this.$refs.interPieCharts).setOption(this.interPieOptions)
  },
  methods: {
    getDataCount() {
      this.axios.get('/getDataCount', {
        params: {
          adminId: this.adminId
        }
      })
      .then(res => {
        this.dataCount = res.data;
        this.lineDataCount = res.line;
        this.setInterActionPie();
        this.setInterActionLine();
      })
      .catch(err => {
        console.log('err', err)
        this.$Notice.error({ title: '提示',  desc: '用户未授权' });
      })
    },
    setInterActionLine() {
      let likeLineObj = this.lineDataCount.like;
      let collectLineObj = this.lineDataCount.collect;
      let commentLineObj = this.lineDataCount.comment;

      this.interLineOptions = JSON.parse(JSON.stringify(LINE_OPTIONS));
      let likeOptions = this.getSignOptions('点赞', likeLineObj);
      this.interLineOptions.legend.data.push('点赞');
      this.interLineOptions.series.push(likeOptions);

      let collectOptions = this.getSignOptions('收藏', collectLineObj);
      this.interLineOptions.legend.data.push('收藏');
      this.interLineOptions.series.push(collectOptions);

      let commentOptions = this.getSignOptions('评论', commentLineObj);
      this.interLineOptions.legend.data.push('评论');
      this.interLineOptions.series.push(commentOptions);

      this.interLineOptions.xAxis.data = getWeekDate();
      echarts.init(this.$refs.interLineCharts).setOption(this.interLineOptions);
      this.interLineOptions = JSON.parse(JSON.stringify(LINE_OPTIONS));
    },
    // 动态配置选项
    getSignOptions(name, seriesData) {
      let date = getWeekDate();
      let options = JSON.parse(JSON.stringify(this.lineTemplate));
      for (let item of date) {
        let index = R.pluck('_id')(seriesData).indexOf(item);
        options.name = name;
        if (index!== -1) {
          options.data.push(seriesData[index].count);
        }
        else {
          options.data.push(0)
        }
      }
      return options;
    },
    setInterActionPie() {
      let interactionObj = [];
      let articleObj = [];
      R.forEachObjIndexed((val, key) => {
        if (['like', 'collect', 'comment'].includes(key)) {
          interactionObj.push({
            value: val,
            name: this.interactionMap[key].label,
            itemStyle: {
                color: this.interactionMap[key].color
            }
          })
        }
        else if (['longArticle', 'shortArticle'].includes(key)) {
          articleObj.push({
            value: val,
            name: this.interactionMap[key].label,
            itemStyle: {
                color: this.interactionMap[key].color
            }
          })
        }
      })(this.dataCount);
      this.interPieOptions.series[0].data = interactionObj;
      this.interPieOptions.legend.data = R.pluck('name')(interactionObj);
      echarts.init(this.$refs.interPieCharts).setOption(this.interPieOptions);

      this.articlePieOptions.series[0].data = articleObj;
      this.articlePieOptions.legend.data = R.pluck('name')(articleObj);
      echarts.init(this.$refs.articlePieCharts).setOption(this.articlePieOptions);
    }
  }
}
</script>
