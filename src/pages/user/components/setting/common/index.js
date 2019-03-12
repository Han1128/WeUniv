export const UN_MODIFY_INFO = [
  {
    label: '同户名',
    value: 'username',
    placeholder: '请输入'
  },
  {
    label: '性别',
    value: 'gender',
    placeholder: '请输入'
  },
  {
    label: '身份',
    value: 'userType',
    placeholder: '请输入'
  },
  {
    label: '创建时间',
    value: 'createTime',
    placeholder: '请输入'
  }
]

export const USER_COMMON_LIST = [
  {
    label: '手机',
    value: 'phone',
    placeholder: '请输入'
  },
  {
    label: '微信',
    value: 'WeChat',
    placeholder: '请输入'
  },
  {
    label: 'QQ',
    value: 'QQ',
    placeholder: '请输入'
  },
  {
    label: '个人签名',
    value: 'description',
    placeholder: '请输入'
  }
]


export const USER_SCHOOL_INFO = [
  {
    label: '学校',
    value: 'schoolName',
    placeholder: '请输入'
  },
  {
    label: '学院',
    value: 'Institute',
    placeholder: '请输入'
  },
  {
    label: '年级',
    value: 'grade',
    placeholder: '请输入'
  },
  {
    label: '学号/工号',
    value: 'schoolId',
    placeholder: '请输入'
  },
  {
    label: '班级',
    value: 'class',
    placeholder: '请输入'
  },
  {
    label: '专业',
    value: 'profession',
    placeholder: '请输入'
  }
]

export function getWeekDate() {
  let weekDate = [];
  for (let i = 6; i >= 0; i--) {
    let date = new Date(new Date() - i * 24 * 3600 * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    weekDate.push(
      `${year}-${month + 1}-${day}`
    )
    return weekDate;
  }
}

export function tranTime(type, date) {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1 < 10 ? '0' + new Date(date).getMonth() + 1 : new Date(date).getMonth() + 1;
  const day = new Date(date).getDate() + 1 < 10 ? '0' + new Date(date).getDate() + 1 : new Date(date).getDate() + 1;
  if (type === 'date') {
    return `${year}-${month}-${day}`
  }
  else if (type === 'datetime') {
    return `${year}-${month}-${day}`
  }
}

export const day_option =  {
  disabledDate (date) {
      return date && date.valueOf() > Date.now();
  },
  shortcuts: [
    {
      text: '1 week',
      value () {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          return [start, end];
      }
    },
    {
      text: '1 month',
      value () {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          return [start, end];
      }
    },
    {
      text: '3 months',
      value () {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          return [start, end];
      }
    }
  ]
}
