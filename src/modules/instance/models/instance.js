import {
  handleAddData,
  handleDeleteData,
  queryData
} from '../services/instance';
// import Vue from 'vue';

const state = {
  TEST_NAME: '示例'
};

const mutations = {};
const actions = {
  /**
   * 获取列表数据
   * @param {*} context
   * @param {*} payload
   */
  getData: async (context, payload) => {
    const response = await queryData(payload);
    return response;
  },

  /**
   * 删除数据
   * @param { Object } payload 参数
   * @param { function } call dva提供调用函数方法
   * @param { function } put  dva提供调用effects方法
   * @return {null} 无返回
   */
  deleteData: async (context, payload) => {
    const response = await handleDeleteData(payload);
    return response;
  },

  /**
   * 修改数据数据
   * @return {null} 无返回
   */
  updateData: async (context, payload) => {
    const response = await handleAddData(payload);
    return response;
  },

  /**
   * 新增数据
   * @return {null} 无返回
   */
  addData: async (context, payload) => {
    const response = await handleAddData(payload);
    return response;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
