let state = {
  index: {
    math: {
      index: {
        list: [],
        scroll: 0,
        isReset: false
      }
    },
    physics: {
      index: {
        list: [],
        scroll: 0,
        isReset: false
      }
    }
  },
  exercise: {
    total: {
      list: [],
      count: 0,
      isReset: false,
      chapterName: '',
      scroll: 0,
      offset: ''
    },
    practice: {
      list: [],
      count: 0,
      isReset: false,
      chapterName: '',
      scroll: 0,
      offset: ''
    },
    break: {
      list: [],
      count: 0,
      isReset: false,
      chapterName: '',
      scroll: 0,
      offset: ''
    },
    pass: {
      list: [],
      count: 0,
      isReset: false,
      chapterName: '',
      scroll: 0,
      offset: ''
    }
  }
}
export default state
