let state = {
  index: {
    math: {
      list: [],
      scroll: 0
    },
    physics: {
      list: [],
      scroll: 0
    }
  },
  exercise: {
    total: {
      list: [],
      isReset: true,
      scroll: 0,
      recordSize: 0,
      totalCount: 0,
      chapterName: '',
      currentChapterId: '',
      currentExercisesId: ''
    },
    practice: {
      list: [],
      isReset: true,
      scroll: 0,
      recordSize: 0,
      totalCount: 0,
      chapterName: '',
      currentChapterId: '',
      currentExercisesId: ''
    },
    break: {
      list: [],
      isReset: true,
      scroll: 0,
      recordSize: 0,
      totalCount: 0,
      chapterName: '',
      currentChapterId: '',
      currentExercisesId: ''
    },
    pass: {
      list: [],
      isReset: true,
      scroll: 0,
      recordSize: 0,
      totalCount: 0,
      chapterName: '',
      currentChapterId: '',
      currentExercisesId: ''
    }
  }
}
export default state
