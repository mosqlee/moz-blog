import $ from 'jquery'
export default function asyncLoadJs (url) {
  return new Promise((resolve, reject) => {
    let hasLoaded = $('script[src="' + url + '"]').length > 0
    if (hasLoaded) {
      resolve()
      return
    }

    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    document.body.appendChild(script)
    script.onload = () => {
      resolve()
    }
    script.onerror = () => {
      reject(new Error('error'))
    }
  })
}
