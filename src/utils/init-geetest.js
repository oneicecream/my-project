import '@/vendor/gt'

export default function (options) {
  return new Promise((resolve, reject) => {
    window.initGeetest(options, captchaObj => {
      resolve(captchaObj)
    })
  })
}

// const capthchaObj = await initGeetest({
//   // 以下配置参数来自服务端 SDK
//   gt: data.gt,
//   challenge: data.challenge,
//   offline: !data.success,
//   new_captcha: true,
//   product: 'bind' // 隐藏，直接弹出式
// })
