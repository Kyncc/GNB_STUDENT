import exercise from './pages/exercise/router'
import uploader from './pages/uploader/router'
import books from './pages/books/router'
import want from './pages/want/router'

export default [
  // 练习册
  ...books,
  // 练习模块
  ...exercise,
  // 作业上传模块
  uploader,
  // 想要练习册
  want
]
