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
    chemistry: {
      scroll: 0,
      list: []
    },
    add: [],
    search: [],
    want: {
      version: '',
      index: '',
      // camera: 'https://blog.ygxdxx.com/img/random/material-2.png'
      camera: ''
    }
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
    cameraList: [],
    // camera: 'https://blog.ygxdxx.com/img/random/material-2.png',
    camera: '',
    scroll: 0,
    isReset: false
  }
}

export default state
