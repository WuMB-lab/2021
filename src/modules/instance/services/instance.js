import { config } from '../../../common/config';
import { io } from 'sinobest-functions';

/**
 * 查询问题列表数据
 * @param {Object} queryConditions 请求的查询条件
 * @param {number} pageSize 分页信息 pageSize
 * @param {number} current 分页信息 current
 * @return {Promise.<void>} 返回数据
 */
export async function queryData (data) {
  return io.post(`${config.contextPath}/rest/v1/i/instance/list`, data);
}

/**
 * 删除数据
 * @param {string} id 请求id
 * @return {Promise.<void>} 返回请求数据结果
 */
export async function handleDeleteData (id) {
  return io.delete(`${config.contextPath}/rest/v1/i/instance/del/${id}`);
}
/**
 * 修改数据
 * @param {string} item 请求参数
 * @return {Promise.<void>} 返回请求数据结果
 */
export async function handleUpdateData (data) {
  return io.delete(`${config.contextPath}/rest/v1/i/instance/update`, data);
}

/**
 * 添加数据
 * @param {Object} item 请求的参数
 * @return {Promise.<void>} 返回请求数据结果
 */
export async function handleAddData (data) {
  return io.post(`${config.contextPath}/rest/v1/i/instance/save`, data);
}
