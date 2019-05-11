/*
  vuex 的 mutations 模块
*/
import Vue from 'vue'
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
  CARD_QUE,
  RECORD_FIRST_CURRENT_TIME,
  RECORD_SINGLE_ANSWERS,
  RECORD_MULTIPLE_ANSWERS,
  RECORD_JUDGE_ANSWERS,
  RECORD_FILL_ANSWERS,
  REFRESH_CURRENT_INDEX,
  REFRESH_SINGLE_ANSWERS,
  REFRESH_MULTIPLE_ANSWERS,
  REFRESH_JUDGE_ANSWERS,
  REFRESH_FILL_ANSWERS,
  REFRESH_FIRST_CURRENT_TIME
} from "./mutation-types";
// [方法名](state,{param}){}
export default {
  [RECEIVE_ROTATION_IMAGES] (state, {rotationImages}){
    state.rotationImages = rotationImages;
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },
  [RECEIVE_USER_UNREADMSG_COUNT] (state, {unreadMsgCount}) {
    state.unreadMsgCount = unreadMsgCount;
  },
  [RESET_USER_UNREADMSG_COUNT] (state) {
    state.unreadMsgCount = 0
  },
  [RECEIVE_USER_FEEDBACK_INFO] (state, {feedbackInfo}) {
    state.feedbackInfo = feedbackInfo
  },
  [RECORD_FEEDBACK_INFO] (state, {feedbackInfo}) {
    state.feedbackInfo = feedbackInfo
  },
  [RECEIVE_EXAM_CALENDAR] (state, {examCalendar}){
    state.examCalendar = examCalendar;
  },
  [RECORD_EXAM_CALENDAR] (state, {examCalendar}) {
    state.examCalendar = examCalendar
  },
  [RECEIVE_LANGUAGES_INFO] (state, {languagesInfo}) {
    state.languagesInfo = languagesInfo;
  },
  [INIT_SINGLE_ANSWERS_LENGTH] (state, {singleNum}) {
    state.singleAnswers.length = singleNum;
  },
  [INIT_MULTIPLE_ANSWERS_LENGTH] (state, {multipleNum}) {
    state.multipleAnswers.length = multipleNum;
  },
  [INIT_JUDGE_ANSWERS_LENGTH] (state, {judgeNum}) {
    state.judgeAnswers.length = judgeNum;
  },
  [INIT_FILL_ANSWERS_LENGTH] (state, {fillNum}) {
    state.fillAnswers.length = fillNum;
  },
  [NEXT_QUE] (state) {
    state.currentIndex += 1;
  },
  [PREV_QUE] (state) {
    state.currentIndex -= 1;
  },
  [CARD_QUE] (state, {index}) {
    state.currentIndex = index - 1;
  },
  [RECORD_FIRST_CURRENT_TIME] (state, {firstCurrentTime}) {
    state.firstCurrentTime = firstCurrentTime;
  },
  [RECORD_SINGLE_ANSWERS] (state, {currentIndex, singleAnswer}) {
    state.singleAnswers.splice(currentIndex, 1, singleAnswer);
    // state.singleAnswers[currentIndex] = singleAnswer;
  },
  [RECORD_MULTIPLE_ANSWERS] (state, {currentIndex, multipleAnswer}) {
    // 注意下标要减去前面单选题数量
    state.multipleAnswers.splice(currentIndex - state.singleAnswers.length, 1, multipleAnswer);
    // state.multipleAnswers[currentIndex - state.singleAnswers.length] = multipleAnswer;
  },
  [RECORD_JUDGE_ANSWERS] (state, {currentIndex, judgeAnswer}) {
    // 注意下标要减去前面单选题数量和多选题数量
    state.judgeAnswers.splice(currentIndex - state.singleAnswers.length - state.multipleAnswers.length, 1, judgeAnswer);
    // state.judgeAnswers[currentIndex - state.singleAnswers.length - state.multipleAnswers.length] = judgeAnswer;
  },
  [RECORD_FILL_ANSWERS] (state, {currentIndex, fillAnswer}) {
    // 注意下标要减去前面单选题数量和多选题数量和判断题数量
    state.fillAnswers.splice(currentIndex - state.singleAnswers.length - state.multipleAnswers.length - state.judgeAnswers.length, 1, fillAnswer);
    // state.fillAnswers[currentIndex - state.singleAnswers.length - state.multipleAnswers.length - state.judgeAnswers.length] = fillAnswer;
  },
  [REFRESH_CURRENT_INDEX] (state, {currentIndex}) {
    state.currentIndex = currentIndex;
  },
  [REFRESH_SINGLE_ANSWERS] (state, {singleAnswers}) {
    state.singleAnswers = singleAnswers;
  },
  [REFRESH_MULTIPLE_ANSWERS] (state, {multipleAnswers}) {
    state.multipleAnswers = multipleAnswers;
  },
  [REFRESH_JUDGE_ANSWERS] (state, {judgeAnswers}) {
    state.judgeAnswers = judgeAnswers;
  },
  [REFRESH_FILL_ANSWERS] (state, {fillAnswers}) {
    state.fillAnswers = fillAnswers;
  },
  [REFRESH_FIRST_CURRENT_TIME] (state, {firstCurrentTime}) {
    state.firstCurrentTime = firstCurrentTime;
  }
}
