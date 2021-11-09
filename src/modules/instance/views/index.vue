<template>
  <div class="yhwt-container">
    <a-card style="margin-bottom: 24px; border-radius: 8px;">
      <a-form
        style="margin-bottom: 16px"
        :form="form"
        :label-col="{ xs: 24, sm: 8, md: 8, lg: 6 }"
        :wrapper-col="{ xs: 24, sm: 16, md: 16, lg: 18 }"
      >
        <a-row>
          <a-col
            :xs="colResponsiveProps.xs"
            :sm="colResponsiveProps.sm"
            :md="colResponsiveProps.md"
            :lg="colResponsiveProps.lg"
            :xl="colResponsiveProps.xl"
          >
            <a-form-item label="实例名称">
              <a-input
                type="text"
                :allowClear="true"
                v-model="queryParams.instanceName"
                placeholder="实例名称" />
            </a-form-item>
          </a-col>
          <a-col
            :xs="colResponsiveProps.xs"
            :sm="colResponsiveProps.sm"
            :md="colResponsiveProps.md"
            :lg="colResponsiveProps.lg"
            :xl="colResponsiveProps.xl"
          >
            <a-form-item label="实例IP">
              <a-input
                type="text"
                :allowClear="true"
                v-model="queryParams.instanceIp"
                placeholder="实例IP" />
            </a-form-item>
          </a-col>
          <a-col
            :xs="colResponsiveProps.xs"
            :sm="colResponsiveProps.sm"
            :md="colResponsiveProps.md"
            :lg="colResponsiveProps.lg"
            :xl="colResponsiveProps.xl"
          >
            <a-form-item label="实例类型">
              <a-select
                placeholder="请选择实例类型"
                :allowClear="true"
                v-model="queryParams.instanceType">
                <a-select-option
                  v-for="typeOption in typeOptions"
                  :key="typeOption.code"
                  :value="typeOption.code">
                  {{ typeOption.detail }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            v-if="collapse"
            :xs="colResponsiveProps.xs"
            :sm="colResponsiveProps.sm"
            :md="colResponsiveProps.md"
            :lg="colResponsiveProps.lg"
            :xl="colResponsiveProps.xl"
          >
            <a-form-item label="实例状态">
              <a-select
                placeholder="请选择实例状态"
                :allowClear="true"
                v-model="queryParams.instanceStatus">
                <a-select-option
                  v-for="statusOption in statusOptions"
                  :key="statusOption.code"
                  :value="statusOption.code">
                  {{ statusOption.detail }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :xs="colResponsiveProps.xs"
            :sm="colResponsiveProps.sm"
            :md="colResponsiveProps.md"
            :lg="colResponsiveProps.lg"
            :xl="colResponsiveProps.xl"
            class="yhwt-form-operator-col"
          >
            <div class="yhwt-form-operator">
              <a-button
                type="primary"
                @click="handleQuery"><a-icon type="search" style="backgroud-color: black"/>搜索</a-button>
              <a-button @click="handleReset" type="primary"><a-icon type="minus-circle" />清空</a-button>
              <div
                v-if="collapse"
                @click="() => {this.collapse = !this.collapse}"
                class="yhwt-form-operator-collapse"
              >
                <span>收起</span>
                <a-icon type="up" />
              </div>
              <div
                v-else
                @click="() => {this.collapse = !this.collapse}"
                class="yhwt-form-operator-collapse"
              >
                <span>展开</span>
                <a-icon type="down" />
              </div>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card style="border-radius: 8px;">
      <a-button type="primary" @click="handleShowViewModal('create')">
        添加实例
      </a-button>
      <a-table
        :tableLayout="tableLayout"
        :loading="loading"
        :rowKey="(record, index) => record.instanceId"
        :columns="columns"
        :dataSource="instanceList"
        @change="handlePaginationChange"
        :pagination="instancePagination"
        :dicts="dicts">
        <span slot="instanceStatus" slot-scope="text">
          <a-tag :key="text" v-if="text" :color="'geekblue'">使用中</a-tag>
          <a-tag :key="text" v-else :color="'volcano'">空闲</a-tag>
        </span>
        <span
          slot="operate"
          slot-scope="text, record">
          <a-button
            class="ui-button-blue"
            style="margin-right:5px"
            type="primary"
            @click="handleShowViewModal('check', record)"
          >
            查看
          </a-button>
          <a-button
            class="ui-button-blue"
            style="margin-right:5px"
            type="primary"
            @click="handleStatusUpdate('stop', record)"
            v-if="record.instanceStatus">
            停止
          </a-button>
          <a-button
            class="ui-button-blue"
            style="margin-right:5px"
            type="primary"
            @click="handleStatusUpdate('start', record)"
            v-else>
            启动
          </a-button>
          <a-button
            class="ui-button-blue"
            style="margin-right:5px"
            type="primary"
            @click="handleShowViewModal('edit', record)">
            编辑
          </a-button>
          <a-button
            class="ui-button-blue"
            style="margin-right:5px"
            type="danger"
            v-if="!record.instanceStatus"
            @click="handleDelModalShow(record.instanceId)">
            删除
          </a-button>
        </span>
      </a-table>
    </a-card>
    <a-modal
      v-model="delVisible"
      title="提示"
      @ok="handleDelInstance"
      :bodyStyle="delModalBody"
      :width="400"
    >
      <div style="height: 55px;padding: 0;width: 300px;">
        <div style="float:left;width: 50px;"><a-icon type="exclamation-circle" :style="delTextIcon"/></div>
        <div style="float:left;width: 250px;font-size: 30px;padding: 10px 10px 0px 10px;">确定删除此实例</div>
      </div>
    </a-modal>
    <a-modal
      v-if="visible"
      :title="editFormTitle"
      :visible="visible"
      :width="1000"
      centered
      @cancel="handlInstanceCancel"
    >
      <template slot="footer">
        <a-button @click="handlInstanceCancel">{{ cancelText }}</a-button>
        <a-button
          v-if="!isCheck"
          type="primary"
          @click="handleInstanceConfirm">确定</a-button>
      </template>
      <edit-form
        ref="editFormRef"
        :type="editFormType"
        :formData="editFormItem"
        :tableData="editFormTableData"
        :tableColumns="editFormColumns"
        :dicts="dicts"></edit-form>
    </a-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import {
    Button,
    Modal,
    Form,
    Select,
    Icon,
    Card,
    Col,
    Row,
    Input,
    Tag,
    Table
  } from 'ant-design-vue';
  import EditForm from './EditForm.vue';
  const AFormItem = Form.Item;

  const ASelectOption = Select.Option;
  export default {
    name: 'InstanceComputer',
    components: {
      AForm: Form,
      AFormItem,
      ASelect: Select,
      ASelectOption,
      AIcon: Icon,
      AButton: Button,
      AModal: Modal,
      ACard: Card,
      EditForm,
      ACol: Col,
      ARow: Row,
      AInput: Input,
      ATag: Tag,
      ATable: Table
    },
    data: function () {
      return {
        commit: true,
        query: false,
        isCheck: false,
        number: RegExp('^\\d+?$'),
        editFormTitle: '实例配置',
        instanceId: undefined,
        instanceList: [],
        form: this.$form.createForm(this, { name: 'yhwtForm' }),
        // 查询参数
        queryParams: {
          instanceName: '',
          instanceIp: '',
          instanceType: '',
          instanceStatus: undefined
        },
        colResponsiveProps: {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 8
        },
        dicts: {},
        statusOptions: [],
        typeOptions: [],
        collapse: false,
        tableLayout: 'auto',
        columns: [
          { dataIndex: 'index', align: 'center', title: '序号', sorter: (a, b) => a.index - b.index },
          { dataIndex: 'instanceName', title: '实例名称', align: 'center' },
          { dataIndex: 'instanceType', title: '实例类型', align: 'center' },
          { dataIndex: 'instanceIp', title: '设备IP', align: 'center' },
          { dataIndex: 'workerPort', title: '实例端口', align: 'center' },
          { dataIndex: 'instanceStatus', title: '实例状态', scopedSlots: { customRender: 'instanceStatus' }, align: 'center' },
          { dataIndex: 'instanceJobCount', title: '实例上作业数', align: 'center' },
          { dataIndex: 'operate', title: '操作', scopedSlots: { customRender: 'operate' }, align: 'center' }
        ],
        editFormColumns: [
          { title: '序号', dataIndex: 'index', key: 'index' },
          { title: '配置项名称', dataIndex: 'name', key: 'name' },
          { title: '配置项值', dataIndex: 'value', key: 'value', scopedSlots: { customRender: 'value' } },
          { title: '配置项描述', dataIndex: 'description', key: 'description' }
        ],
        editFormTableData: [
          { key: 'workerName', index: '1', name: 'worker名称', description: 'worker名称，是worker在manager集群唯一标识' },
          { key: 'workerPort', index: '2', name: 'worker_rpc_port', description: 'worker的rpc端口，如果是同一台机器装有多个worker，此端口' },
          { key: 'workerPath', index: '3', name: '实例安装路径', description: 'worker实例安装路径' },
          { key: 'workerArgs', index: '4', name: 'Default VM arguments', description: 'worker JVM配置参数' },
          { key: 'workerJobCount', index: '5', name: 'pe.concurr.job.count', description: '一个worker上运行的最大作业数' },
          { key: 'gangerArgs', index: '6', name: 'Default VM arguments', description: 'Ganger JVM配置参数' }
        ],
        visible: false,
        delVisible: false,
        editFormType: '',
        editFormItem: {
          id: '',
          instanceName: '',
          workerPort: '',
          instanceStatus: 0,
          instanceIp: '',
          instanceType: '',
          workerName: '',
          workerJobCount: '',
          workerPath: '',
          workerArgs: '',
          gangerArgs: '',
          remark: ''
        },
        cancelText: '取消',
        instancePagination: {
          current: 1,
          pageSize: 10,
          total: 0,
          size: 'small'
        },
        loading: false,
        delTextIcon: {
          fontSize: '40px',
          color: '#FFD700',
          padding: '15px 20px 20px 20px'
        },
        delModalBody: {
          height: '60px',
          width: '300px',
          padding: '0px'
        }
      };
    },
    methods: {
      // 函数映射
      ...mapActions('instance', [
       'deleteData', 'addData', 'getData', 'getDict', 'updateData'
      ]),
      // 删除确定框中的确定按钮调用的函数。
      handleDelInstance () {
        // 删除后调用 reload 查询函数
        this.deleteData(this.instanceId).then(res => {
          if (res.appcode === '200') {
           this.$notification.success({
              message: '成功',
              description: res.msg || '删除成功'
            });
            this.handleReload();
          } else {
            this.$notification.error({
              message: '错误',
              description: res.errMsg
            });
            this.loading = false;
          }
        });
        this.delVisible = false;
        this.instanceId = undefined;
      }, // 删除确定框显示函数
      handleDelModalShow (val) {
        this.instanceId = val;
        // 绑定删除数据的instanceId
        this.delVisible = true;
      }, // 查询按钮调用的函数
      handleQuery () {
        this.query = true;
        this.loading = true;
        this.handleReload();
      }, // 重置按钮调用的函数
      handleReset () {
        // 重置表单
        this.queryParams = {
          instanceName: '',
          instanceIp: '',
          instanceType: '',
          instanceStatus: undefined
        };
        this.instancePagination.current = 1;
        // 重新查询数据
        this.handleReload();
      }, // table展示页的页面数和条数修改触发的函数， 作用： 修改展示页的当前页数和展示条数
      handlePaginationChange (param) {
        this.instancePagination.current = param.current;
        this.instancePagination.pageSize = param.pageSize;
        this.handleReload();
      }, // 新增、修改和查询调用的函数
      handleShowViewModal (type, data) {
        switch (type) {
          case 'create':
            this.editFormItem = {};
            this.instanceId = undefined;
            this.cancelText = '取消';
            for (let i = 0; i < this.editFormTableData.length; i++) {
              this.editFormTableData[i].value = '';
            }
            this.isCheck = false;
            break;
          case 'edit':
            this.editFormItem = Object.assign({}, data);
            if (this.editFormItem.remark === undefined) this.editFormItem.remark = '';
            for (let i = 0; i < this.editFormTableData.length; i++) {
              this.editFormTableData[i].value = data[this.editFormTableData[i].key];
            }
            this.isCheck = false;
            this.cancelText = '取消';
            break;
          case 'check':
            this.editFormItem = Object.assign({}, data);
            if (this.editFormItem.remark === undefined) this.editFormItem.remark = '';
            for (let i = 0; i < this.editFormTableData.length; i++) {
              this.editFormTableData[i].value = data[this.editFormTableData[i].key];
            }
            this.isCheck = true;
            this.cancelText = '关闭';
            break;
          default:
            return;
        }
        this.editFormType = type;
        this.visible = true;
      }, // 启动和停止按钮调用的函数， 作用：修改使用状态
      handleStatusUpdate (type, data) {
        if (type === 'stop') {
          data.instanceStatus = 0;
          this.updateData(data).then(res => {
            if (res.appcode === '200') {
              this.$message.success(res.msg);
              this.handleReload();
            } else {
              this.$message.error(res.msg);
            }
          });
        } else if (type === 'start') {
          data.instanceStatus = 1;
          this.updateData(data).then(res => {
            if (res.appcode === '200') {
              this.$message.success(res.msg);
              this.handleReload();
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      }, // 新增和修改中的确定按钮调用的函数。 作用： 提交表单
      handleInstanceConfirm () {
        let instanceObj = {};
        this.$refs.editFormRef.form.validateFields((err) => {
          if (!err) {
            instanceObj = this.$refs.editFormRef.formData;
          }
        });
        if (Object.keys(instanceObj).length === 0) {
          this.$message.error('请按提示填写完相关信息');
          return;
        }
        if (instanceObj.workerJobCount != null && !this.number.test(instanceObj.workerJobCount)) {
          this.$message.error('配置项pe.concurr.job.count 的值应为一个数字');
          return;
        }
        this.loading = true;
        if (this.editFormType === 'create') {
          this.addData(instanceObj).then(res => {
              if (res.appcode === '200') {
                this.$message.success(res.msg);
                this.query = true;
                this.handleReload();
              } else {
                this.$message.error(res.errMsg);
              }
              this.$refs.editFormRef.form.resetFields();
              this.visible = false;
              this.loading = false;
          });
        } else if (this.editFormType === 'edit') {
            if (this.editFormItem.instanceId === undefined) {
              instanceObj.instanceId = this.instanceId;// 说明是新增页面，点击的保存
            } else {
              instanceObj.instanceId = this.editFormItem.instanceId;// 说明是编辑页面，点击的保存
            }
           this.addData(instanceObj).then(res => {
              if (res.appcode === '200') {
                this.$message.success(res.msg);
                // 重新查询问题列表数据
                this.handleReload();
              } else {
                this.$message.error(res.errMsg);
              }
              this.$refs.editFormRef.form.resetFields();
              this.visible = false;
              this.loading = false;
          });
        }
      }, // 删除框 取消按钮调用的函数， 作用： 取消instanceId的绑定，同时关闭删除框
      handlInstanceCancel () {
        this.handleReload();
        this.$refs.editFormRef.form.resetFields();
        this.instanceId = undefined;
        this.visible = false;
      }, // 查询功能函数，获取后端的数据
      handleReload () {
        if (this.commit) {
          return;
        }
        if (this.query) {
          this.instancePagination.current = 1;
          this.query = false;
        }
        const params = Object.assign({}, this.queryParams, {
          current: this.instancePagination.current,
          pageSize: this.instancePagination.pageSize
        });
        this.getData(params).then((res) => {
          if (res.appcode === '200') {
            this.instanceList = res.map.records;
            for (let i = 0; i < this.instanceList.length; i++) {
              this.instanceList[i].index = i + 1;
            }
            // 分页器
            this.instancePagination.total = res.map.total;
          } else {
            this.$notification.error({
              message: res.errMsg,
              description: res.errMsg
            });
          }
          this.loading = false;
        });
      },
      initDicts () {
          // 真实为调用后端接口获取字典
          this.dicts = {
              STATUS: [{ code: 1, detail: '使用中' }, { code: 0, detail: '空闲' }],
              TYPES: [{ code: 'Worker', detail: 'Worker' }, { code: 'Ganger', detail: 'Ganger' }],
              IPS: [
                    { code: '192.168.11.7', detail: '192.168.11.7' },
                    { code: '192.168.11.9', detail: '192.168.11.9' },
                    { code: '192.168.11.11', detail: '192.168.11.11' }
                  ]
          };
          this.typeOptions = this.dicts.TYPES;
          this.statusOptions = this.dicts.STATUS;
      }
    },
    mounted () {
      // this.handleReload({ currentPage: this.instancePagination.current, pageSize: this.instancePagination.pageSize });
    },
    created () {
      // 初始化字典
      this.initDicts();
    }
  };
</script>

<style scoped lang="less">
  .yhwt-container{
    .ant-form{
      margin-bottom: 0 !important;
      &-item{
        width: 90%;
      }
      .yhwt-form-operator-col{
        float: right;
      }
      .yhwt-form-operator{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 4px;
        &-collapse{
          cursor: pointer;
          margin-left: 6px;
          color: var(--sg-primary-color);
          i{
            font-size: 16px;
          }
        }
        .ant-btn{
          margin-right: 8px
        }
      }
    }
    .ant-table{
      .table-name{
        color: var(--sg-primary-color);
      }
      .table-operator{
        cursor: pointer;
        word-break: keep-all;
        white-space: nowrap;
      }
    }
  }
</style>
