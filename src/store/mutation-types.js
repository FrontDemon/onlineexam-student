/*
  包含n个mutation的type名称常量
 */
export const RECEIVE_ROTATION_IMAGES = 'receive_rotation_images' // 接收首页轮播图数组
export const RECEIVE_USER_INFO = 'receive_user_info' // 接收用户信息
export const RESET_USER_INFO = 'reset_user_info' // 重置用户信息
export const RECEIVE_USER_UNREADMSG_COUNT = 'receive_user_unreadmsg_count' // 接收用户我的页面未读消息条数
export const RESET_USER_UNREADMSG_COUNT = 'reset_user_unreadmsg_count' // 重置我的页面未读消息条数
export const RECEIVE_USER_FEEDBACK_INFO = 'receive_feedback_info' // 获取我的页面未读消息条数
export const RECORD_FEEDBACK_INFO = 'record_feedback_info' //重置反馈信息
export const RECEIVE_EXAM_CALENDAR = 'receive_exam_calendar' // 接收考试日历数组
export const RECORD_EXAM_CALENDAR = 'record_exam_calendar' // 同步考试日历数组
export const RECEIVE_LANGUAGES_INFO = 'receive_languages_info' // 接收首页编程语言信息数组

export const INIT_SINGLE_ANSWERS_LENGTH = 'init_single_answers_length' // 初始化单选题答案数组长度
export const INIT_MULTIPLE_ANSWERS_LENGTH = 'init_multiple_answers_length' // 初始化多选题答案数组长度
export const INIT_JUDGE_ANSWERS_LENGTH = 'init_judge_answers_length' // 初始化判断题答案数组长度
export const INIT_FILL_ANSWERS_LENGTH = 'init_fill_answers_length' // 初始化填空题答案数组长度

export const NEXT_QUE = 'next_que' //点击下一题
export const PREV_QUE = 'prev_que' //点击上一题
export const CARD_QUE = 'card_que' //点击答题卡序号
export const RECORD_FIRST_CURRENT_TIME = 'record_first_current_time' //记录最先进入考试的开始时间

export const RECORD_SINGLE_ANSWERS = 'record_single_answers' // 记录单选题答案到数组，第一个参数为数组下标，第二个参数为当前下标的值
export const RECORD_MULTIPLE_ANSWERS = 'record_multiple_answers' // 记录多选题答案到数组，第一个参数为数组下标，第二个参数为当前下标的值
export const RECORD_JUDGE_ANSWERS = 'record_judge_answers' // 记录判断题答案到数组，第一个参数为数组下标，第二个参数为当前下标的值
export const RECORD_FILL_ANSWERS = 'record_fill_answers' // 记录填空题答案到数组，第一个参数为数组下标，第二个参数为当前下标的值

export const REFRESH_CURRENT_INDEX = 'refresh_current_index' //刷新从sessionStorage取出放入
export const REFRESH_SINGLE_ANSWERS = 'refresh_single_answers' //刷新从sessionStorage取出放入
export const REFRESH_MULTIPLE_ANSWERS = 'refresh_multiple_answers' //刷新从sessionStorage取出放入
export const REFRESH_JUDGE_ANSWERS = 'refresh_judge_answers' //刷新从sessionStorage取出放入
export const REFRESH_FILL_ANSWERS = 'refresh_fill_answers' //刷新从sessionStorage取出放入
export const REFRESH_FIRST_CURRENT_TIME = 'refresh_first_current_time' //刷新从sessionStorage取出放入


