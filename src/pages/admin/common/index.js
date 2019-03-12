export const PIE_CHART_OPTIONS = {
  backgroundColor: '#fff',
  title: {
      text: 'Customized Pie',
      left: 'center',
      top: 20,
      textStyle: {
          color: '#ccc'
      }
  },

  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },

  visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
          colorLightness: [0, 1]
      }
  },
  series : [
      {
          name:'访问来源',
          type:'pie',
          radius : '55%',
          center: ['50%', '50%'],
          data:[
              // 需要初始化的数据
              // {value:335, name:'直接访问'},
              // {value:310, name:'邮件营销'},
              // {value:274, name:'联盟广告'},
              // {value:235, name:'视频广告'},
              // {value:400, name:'搜索引擎'}
          ].sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          label: {
              normal: {
                  textStyle: {
                      color: '#333' // 字的颜色
                  }
              }
          },
          labelLine: {
              normal: {
                  lineStyle: {
                      color: '#ccc' // 线的颜色
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
              }
          },
          itemStyle: {
              normal: {
                  color: '#c23531', // 饼图饼的颜色
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
              return Math.random() * 200;
          }
      }
  ]
}

export const PIE_CHARTS_OPTIONS = {
  title : {
      x:'center'
  },
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      orient: 'vertical',
      left: 'left',
      data: []
  },
  series : [
      {
          name: '访问来源',
          type: 'pie',
          // roseType: 'angle',
          radius : '55%',
          center: ['50%', '60%'],
          data:[],
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
}

export const PIE_CHARTS = {
  title : {
      text: '南丁格尔玫瑰图',
      subtext: '纯属虚构',
      x:'center'
  },
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      x : 'center',
      y : 'bottom',
      // data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
      data: []
  },
  toolbox: {
      show : true,
      feature : {
          mark : {show: true},
          dataView : {show: true, readOnly: false},
          magicType : {
              show: true,
              type: ['pie', 'funnel']
          },
          restore : {show: true},
          saveAsImage : {show: true}
      }
  },
  calculable : true,
  series : [
      {
          name:'面积模式',
          type:'pie',
          radius : [30, 50],
          center : ['75%', '50%'],
          roseType : 'area',
          data: []
          // data:[
          //     {value:10, name:'rose1'},
          //     {value:5, name:'rose2'},
          //     {value:15, name:'rose3'},
          //     {value:25, name:'rose4'},
          //     {value:20, name:'rose5'},
          //     {value:35, name:'rose6'},
          //     {value:30, name:'rose7'},
          //     {value:40, name:'rose8'}
          // ]
      }
  ]
}

export const LINE_OPTIONS = {
  title: {
      text: '折线图堆叠'
  },
  tooltip: {
      trigger: 'axis'
  },
  legend: {
      data:[]
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  toolbox: {
      feature: {
          saveAsImage: {}
      }
  },
  xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
      // data: ['周一','周二','周三','周四','周五','周六','周日']
  },
  yAxis: {
      type: 'value'
  },
  series: [
      // {
      //     name:'邮件营销',
      //     type:'line',
      //     smooth: true,
      //     data:[120, 132, 101, 134, 90, 230, 210]
      // },
      // {
      //     name:'联盟广告',
      //     type:'line',
      //     smooth: true,
      //     data:[220, 182, 191, 234, 290, 330, 310]
      // },
      // {
      //     name:'视频广告',
      //     type:'line',
      //     smooth: true,
      //     data:[150, 232, 201, 154, 190, 330, 410]
      // },
      // {
      //     name:'直接访问',
      //     type:'line',
      //     smooth: true,
      //     data:[320, 332, 301, 334, 390, 330, 320]
      // },
      // {
      //     name:'搜索引擎',
      //     type:'line',
      //     smooth: true,
      //     data:[820, 932, 901, 934, 1290, 1330, 1320]
      // }
  ]
}

export function getWeekDate() {
  let weekDate = [];
  for (let i = 6; i >= 0; i--) {
    let date = new Date(new Date() - i * 24 * 3600 * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    weekDate.push(
      `${year}-${month}-${day}`
    )
  }
  return weekDate;
}
