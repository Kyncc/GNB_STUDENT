let state = {
  remember: {
    index: {
      options: {
        degree: 0
      },
      scroll: 0,
      list: [],
      offset: '',
      reset: true
    },
    download: [],
    count: 0
  },
  camera: {
    index: {
      list: [],
      scroll: 0,
      offset: '',
      reset: true
    },
    download: [],
    count: 0
  },
  good: {
    index: {
      options: {
        degree: 0,
        type: 0
      },
      scroll: 0,
      list: [],
      reset: true,
      offset: ''
    },
    similarity: {
      list: [],
      offset: ''
    },
    download: [],
    count: 0
  }
}

export default state
