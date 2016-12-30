/** 获取我的习题册 */
export const rememberWorkbook = (state) => state.remember.my
export const rememberWorkbookAll = (state) => state.remember.all
export const rememberSubjectId = (state) => state.remember.subjectId
export const rememberChapter = (state) => state.remember.chapter
export const rememberChapterScroll = (state) => state.remember.chapterScroll
export const rememberExercise = (state) => state.remember.exercise
export const rememberExerciseScroll = (state) => state.remember.exerciseScroll
export const rememberExample = (state) => state.remember.example
/** 获得练习册ID*/
export const wookbookId = (state) => state.route.params.bookId
/** 获得章节ID*/
export const chapterId = (state) => state.route.params.chapterId
/** 获得章节ID*/
export const exampleId = (state) => state.route.params.id