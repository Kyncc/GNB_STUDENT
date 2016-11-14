/** 获取我的习题册 */
export const rememberWorkbook = (state) => state.remember.my
export const rememberSubjectId = (state) => state.remember.subjectId
export const rememberChapter = (state) => state.remember.chapter
/** 获得章节ID*/
export const wookbookId = (state) => state.route.params.bookId