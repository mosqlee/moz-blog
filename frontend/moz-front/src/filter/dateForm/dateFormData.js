export default function (value, cate) {
  if (!value) return ''
  const date = new Date(value)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()
  return `${month}月 ${day},${year} about ${cate}`
}
