import Mock from 'mockjs'

// let Random = Mock.Random

Mock.mock(
  '/api/user', {
    'name': '@cname',
    'intro': '@image(20)',
    'imageSrc': '@image(100) '
  })
Mock.mock(/\/api\/blog\?page=[0-9]*/, {
  'data': {
    'total': 10,
    'current': 1,
    'blog|1-5': [{
      'title': '@ctitle(10,20)',
      'intro': '@ctitle(10,20)',
      'id|+1': 1,
      'img': '@image(100) ',
      'createAt': '@date(yyyy-MM-dd)',
      'updateAt': '@date(yyyy-MM-dd)',
      'category': '@ctitle(10,20)'
    }]
  }
})
Mock.mock(/\/api\/blog\/[0-9]*/, {
  'data': {
    'title': '@ctitle(10,20)',
    'intro': '@ctitle(10,20)',
    'id|+1': 1,
    'img': '@image(100) ',
    'createAt': '@date(yyyy-MM-dd)',
    'updateAt': '@date(yyyy-MM-dd)',
    'category': '@ctitle(10,20)',
    'detail': '@ctitle(100,2000)'
  }
})
