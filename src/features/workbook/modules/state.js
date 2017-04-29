let state = {
  workbook: {
    math: {
      scroll: 0,
      list: []
    },
    physics: {
      scroll: 0,
      list: []
    },
    add: [],
    search: []
  },
  chapter: {
    list: [],
    scroll: 0,
    isReset: false
  },
  uploader: {
    list: [],
    // camera: 'https://blog.ygxdxx.com/img/random/material-2.png'
    camera: ''
  },
  exercise: {
    list: [],
    scroll: 0,
    isReset: false
  }
}

export default state
