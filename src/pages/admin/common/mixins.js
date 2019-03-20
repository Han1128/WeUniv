import { getWeekDate } from '../common/index.js';
const R = require('ramda');
export default {
  data() {
    return {
      lineTemplate: {
        name:'',
        type:'line',
        smooth: true,
        data:[]
      },
    }
  },
  methods: {
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
  },
}
