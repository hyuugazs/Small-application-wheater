//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()
var latitude, longitude
Page({
  data: {
    weather: {
      wendu: 18,
      ganmao: '昼夜温差较大，较易发生感冒，请适当增减衣服。体质较弱的朋友请注意防护。',

      forecast: [
        {
          date: '18日星期五',
          type: '阴',
          high: '高温 16℃',
          low: '低温 8℃',
          fengxiang: '南风',
          fengli: '微风级'
        }, {
          date: '19日星期六',
          type: '阴',
          high: '高温 16℃',
          low: '低温 8℃',
          fengxiang: '南风',
          fengli: '微风级'
        }, {
          date: '20日星期天',
          type: '阴',
          high: '高温 16℃',
          low: '低温 8℃',
          fengxiang: '南风',
          fengli: '微风级'
        }, {
          date: '21日星期一',
          type: '阴',
          high: '高温 16℃',
          low: '低温 8℃',
          fengxiang: '南风',
          fengli: '微风级'
        }, {
          date: '22日星期二',
          type: '阴',
          high: '高温 16℃',
          low: '低温 8℃',
          fengxiang: '南风',
          fengli: '微风级'
        }
      ]
    },
    today: '2016-11-18',
    city: '北京',    //城市名称
    inputCity: '', //输入查询的城市名称
    lat: '',
    lng: '',
    screenHeight:300
  },
  onLoad: function () {
    var that = this
    wx.showLoading({
      title: '加载中'
    }),
      wx.getSystemInfo({
        success: function (res) {
          console.log('info',res)
          that.setData({
            screenHeight: res.windowHeight
          });
        }
      });
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          console.log(res)
          that.setData({
            'lat': res.latitude,
            'lng': res.longitude
          }),
          wx.request({
            url: 'https://www.hyuuga.cn/weather/',
            data: {
              lat: that.data.lat,
              lng: that.data.lng
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.hideLoading()
              that.setData({
                'weather': res.data.weather,
              })
              console.log(res.data)

            }
          })
        }
      })
  },
  inputing: function (e) {
    this.setData({ inputCity: e.detail.value });
  },
  //搜索按钮
  bindSearch: function () {
    var that = this
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: 'https://www.hyuuga.cn/weather1/',
      data: {
        city: that.data.inputCity,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.weather.city == null) {
          wx.showModal({
            title: "出错了",
            content: "没有这个城市"
          })
        }
        else {
          that.setData({
            'weather': res.data.weather,
          })
          console.log(res.data)
        }

      }
    })

  },
  bindKeyInput: function (e) {
    this.setData({
      inputCity: e.detail.value
    })
    console.log(e)
  },
})
