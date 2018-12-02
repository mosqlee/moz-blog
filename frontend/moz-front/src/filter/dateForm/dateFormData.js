const cateMap = [
  {
    id: 0,
    value: '前端技术'
  },
  {
    id: 1,
    value: '后端技术'
  },
  {
    id: 2,
    value: '生活随笔'
  },
  {
    id: 3,
    value: '面试心得'
  }
]
function filterCate (cate) {
  const cateObj = cateMap.find(item => item.id === cate)
  if (cateObj) {
    return cateObj.value
  } else {
    return '无效cate'
  }
}
export default function (value, blog) {
  if (!value) return ''
  const date = new Date(value * 1000)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()
  return `${month}月 ${day},${year} about ${filterCate(blog.category)} by ${blog.auth}`
}
