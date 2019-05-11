/*
  Action:通过操作mutation间接更新state的多个方法的对象
 */

// 注意要引入api接口函数
import {
  reqRotationImages,
  reqLogout,
  reqUnreadMsgCount,
  reqFeedbackInfo,
  reqExamCalendar,
  reqLanguagesInfo
} from '../api'
import {
  RECEIVE_ROTATION_IMAGES,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_USER_UNREADMSG_COUNT,
  RESET_USER_UNREADMSG_COUNT,
  RECEIVE_USER_FEEDBACK_INFO,
  RECORD_FEEDBACK_INFO,
  RECEIVE_EXAM_CALENDAR,
  RECORD_EXAM_CALENDAR,
  RECEIVE_LANGUAGES_INFO,
  INIT_SINGLE_ANSWERS_LENGTH,
  INIT_MULTIPLE_ANSWERS_LENGTH,
  INIT_JUDGE_ANSWERS_LENGTH,
  INIT_FILL_ANSWERS_LENGTH,
  NEXT_QUE,
  PREV_QUE,
  RECORD_FIRST_CURRENT_TIME,
  RECORD_SINGLE_ANSWERS,
  RECORD_MULTIPLE_ANSWERS,
  RECORD_JUDGE_ANSWERS,
  RECORD_FILL_ANSWERS,
  CARD_QUE,
  REFRESH_CURRENT_INDEX,
  REFRESH_SINGLE_ANSWERS,
  REFRESH_MULTIPLE_ANSWERS, REFRESH_JUDGE_ANSWERS, REFRESH_FILL_ANSWERS, REFRESH_FIRST_CURRENT_TIME
} from "./mutation-types";

export default {
  //异步获取轮播图片数组
  async getRotationImages({commit}){
    // 发送异步ajax请求
    const result = await reqRotationImages()
    // 提交一个mutation
    if (result.statu === 0) {
      const rotationImages = result.data
      commit(RECEIVE_ROTATION_IMAGES, {rotationImages})
    }
  },
  //异步获取首页编程语言信息数组
  async getLanguagesInfo({commit}){
    // 发送异步ajax请求
    const result = await reqLanguagesInfo()
    // 提交一个mutation
    if (result.statu === 0) {
      const languagesInfo = result.data
      commit(RECEIVE_LANGUAGES_INFO, {languagesInfo})
    }
  },
  // 同步记录用户信息
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  // 异步登出
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.statu === 0) {
      commit(RESET_USER_INFO)
    }
  },
  //获取未读消息数目
  async getUnreadMsgCount({commit, state}){
    const result = await reqUnreadMsgCount(state.userInfo.sno);
    if (result.statu === 0) {
      const unreadMsgCount = result.data;
      commit(RECEIVE_USER_UNREADMSG_COUNT,{unreadMsgCount})
    }
  },
  //同步重置未读消息数目
  resetUnreadMsgCount({commit}){
    commit(RESET_USER_UNREADMSG_COUNT)
  },
  //异步获取反馈信息
  async receiveFeedbackInfo({commit, state}, setStore){
    const result = await reqFeedbackInfo(state.userInfo.sno);
    if (result.statu == 0){
      const feedbackInfo = result.data;
      commit(RECEIVE_USER_FEEDBACK_INFO, {feedbackInfo});
      setStore && setStore()
    }
  },
  //同步记录反馈信息
  recordFeedbackInfo ({commit}, feedbackInfo) {
    commit(RECORD_FEEDBACK_INFO, {feedbackInfo})
  },
  //异步获取考试日历数组
  async getExamCalendar({commit}, setStore){
    // 发送异步ajax请求
    const result = await reqExamCalendar()
    // 提交一个mutation
    if (result.statu === 0) {
      const examCalendar = result.data
      sessionStorage.setItem("examCalendar",JSON.stringify(examCalendar))
      commit(RECEIVE_EXAM_CALENDAR, {examCalendar})
      setStore && setStore()
    }
  },
  //同步记录考试日历
  recordExamCalendar ({commit}, examCalendar) {
    commit(RECORD_EXAM_CALENDAR, {examCalendar})
  },

  //初始化单选题答案数组长度
  initSingleAnswersLength({commit}, singleNum) {
    commit(INIT_SINGLE_ANSWERS_LENGTH, {singleNum})
  },
  //初始化多选题答案数组长度
  initMultipleAnswersLength({commit}, multipleNum) {
    commit(INIT_MULTIPLE_ANSWERS_LENGTH, {multipleNum})
  },
  //初始化判断题答案数组长度
  initJudgeAnswersLength({commit}, judgeNum) {
    commit(INIT_JUDGE_ANSWERS_LENGTH, {judgeNum})
  },
  //初始化填空题答案数组长度
  initFillAnswersLength({commit}, fillNum) {
    commit(INIT_FILL_ANSWERS_LENGTH, {fillNum})
  },

  //点击下一题
  nextQue({commit}) {
    commit(NEXT_QUE)
  },
  //点击上一题
  prevQue({commit}) {
    commit(PREV_QUE)
  },
  //点击答题卡序号
  cardQue({commit}, index) {
    commit(CARD_QUE, {index})
  },
  //记录当前花费时间
  recordFirstCurrentTime({commit}, firstCurrentTime) {
    commit(RECORD_FIRST_CURRENT_TIME, {firstCurrentTime})
  },
  //记录单选题答案到数组，第一个参数为数组下标，第二个参数为当前下标的值
  recordSingleAnswers({commit}, {currentIndex, singleAnswer}) {
    commit(RECORD_SINGLE_ANSWERS, {currentIndex, singleAnswer})
  },
  //记录多选题答案到数组，第一个参数为数组下标，第二个参数为当前下标的值
  recordMultipleAnswers({commit}, {currentIndex, multipleAnswer}) {
    commit(RECORD_MULTIPLE_ANSWERS, {currentIndex, multipleAnswer})
  },
  //记录判断题答案到数组，第一个参数为数组下标，第二个参数为当前下标的值
  recordJudgeAnswers({commit}, {currentIndex, judgeAnswer}) {
    commit(RECORD_JUDGE_ANSWERS, {currentIndex, judgeAnswer})
  },
  //记录填空题答案到数组，第一个参数为数组下标，第二个参数为当前下标的值
  recordFillAnswers({commit}, {currentIndex, fillAnswer}) {
    commit(RECORD_FILL_ANSWERS, {currentIndex, fillAnswer})
  },
  //刷新从sessionStorage取出放入
  refreshCurrentIndex({commit}, currentIndex) {
    commit(REFRESH_CURRENT_INDEX, {currentIndex})
  },
  //刷新从sessionStorage取出放入
  refreshSingleAnswers({commit}, singleAnswers) {
    commit(REFRESH_SINGLE_ANSWERS, {singleAnswers})
  },
  //刷新从sessionStorage取出放入
  refreshMultipleAnswers({commit}, multipleAnswers) {
    commit(REFRESH_MULTIPLE_ANSWERS, {multipleAnswers})
  },
  //刷新从sessionStorage取出放入
  refreshJudgeAnswers({commit}, judgeAnswers) {
    commit(REFRESH_JUDGE_ANSWERS, {judgeAnswers})
  },
  //刷新从sessionStorage取出放入
  refreshFillAnswers({commit}, fillAnswers) {
    commit(REFRESH_FILL_ANSWERS, {fillAnswers})
  },
  //刷新从sessionStorage取出放入
  refreshFirstCurrentTime({commit}, firstCurrentTime) {
    commit(REFRESH_FIRST_CURRENT_TIME, {firstCurrentTime})
  }
}
