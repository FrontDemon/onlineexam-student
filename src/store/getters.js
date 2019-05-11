/*
  包含多个基于state的getter计算属性的对象
 */
export default {
  //答题卡已完成题数
  completeNumber (state) {
    return state.singleAnswers.filter(item => item).length +
      state.multipleAnswers.filter(item => JSON.stringify(item) !== '[]' &&  JSON.stringify(item) !== undefined && JSON.stringify(item) !== 'null').length +
      state.judgeAnswers.filter(item => item).length +
      state.fillAnswers.filter(item => item).length
  },
  unreadMsgCount: state => state.unreadMsgCount
}
