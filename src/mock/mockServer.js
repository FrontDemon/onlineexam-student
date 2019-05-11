/*
  使用mockjs提供mock数据接口
 */

import Mock from 'mockjs'
import data from './data.json'

// 返回programingLanguages的接口
Mock.mock('/programingLanguagesTest', {code: 0, data: data.programingLanguages})
// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可
