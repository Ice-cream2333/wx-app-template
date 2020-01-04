import '../vendor.js'

const baseUrl = 'xxx'

function xxx(data) {
  return await wx.reqAsync({
    url: `${baseUrl}/xxx`, //仅为示例，并非真实的接口地址
    data
  })
}
