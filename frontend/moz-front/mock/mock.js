import Mock from 'mockjs'

// let Random = Mock.Random

Mock.mock(
  '/api/user', {
    'name': '@cname',
    'intro': '@image(20)',
    'imageSrc': '@image(100) '
  })
Mock.mock('/api/blog', {
  'blog|1-5': [{
    'title': '@ctitle(10,20)',
    'id|+1': 1,
    'img': '@image(100) ',
    'createAt': '@date(yyyy-MM-dd)',
    'updateAt': '@date(yyyy-MM-dd)',
    'onSale | 0-1': '@region'
  }]
})
