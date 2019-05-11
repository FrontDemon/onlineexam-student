/*
  State:状态对象
 */
export default {
  rotationImages: [],  //首页轮播图数组
  userInfo: {},// 用户信息
  unreadMsgCount: 0,//用户我的页面未读消息条数
  feedbackInfo: [],//消息列表反馈信息数组
  examCalendar: [],//考试日历列表数组
  languagesInfo: [],//首页九宫格编程语言信息

  currentIndex: 0,//当前题目索引，默认为0
  singleAnswers: [],//单选题答案数
  multipleAnswers: [],//多选题答案数组
  judgeAnswers: [],//判断题答案数组
  fillAnswers: [],//填空题答案数组
  firstCurrentTime:0,//花费时间
}
