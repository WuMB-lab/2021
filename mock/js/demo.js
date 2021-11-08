/*
 mockjs语法参考官网http://mockjs.com/
 */

const Mock = require('mockjs');

const userinfo = '/api/userinfo';

const loginData = Mock.mock({
  username: 'guest',
  sex: '男',
  age: 18
});

module.exports = {
  [`POST ${userinfo}`](req, res) {
    res.json(loginData);
  },
  [`GET ${userinfo}`](req, res) {
    res.json(loginData);
  }
};
