<template>
  <div class="yhwt-modal-container">
    <a-form
      :form="form"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol">
      <a-row>
        <a-col :span="8">
          <a-form-item label="实例名称：">
            <a-input
              :maxLength="20"
              v-model="formData.instanceName"
              v-decorator="[
                'instanceName',
                {
                  rules: [{ required: true, message: '请输入问题名称' }],
                  initialValue: formData.instanceName ,
                },
              ]"
              placeholder="请输入实例名称"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="主机IP：">
            <a-select
              :maxLength="20"
              @change="handleSelectChange"
              v-decorator="[
                'instanceIp',
                {
                  rules: [{ required: true, message: '请输入主机IP：' }],
                  initialValue: formData.instanceIp
                },
              ]"
              placeholder="请选择主机IP">
              <a-select-option v-for="dict in dicts.IPS" :key="dict.code" label="instanceIp">
                {{ dict.detail }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="工作类型：">
            <a-select
              :maxLength="20"
              @change="handleSelectChange"
              v-decorator="[
                'instanceType',
                {
                  rules: [{ required: true, message: '请选择工作类型：' }],
                  initialValue: formData.instanceType,
                },
              ]"
              placeholder="请选择工作类型：">
              <a-select-option v-for="dict in dicts.TYPES" :key="dict.code" label="instanceType">
                {{ dict.detail }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item
            label="备注"
            :labelCol="{ lg: { span: 2 }, sm: { span: 20 } }"
            :wrapperCol="{ lg: { span: 21 }, sm: { span: 0 } }">
            <a-textarea
              rows="4"
              v-model="formData.remark"
              :maxLength="50"
              placeholder="请输入备注"
              v-decorator="[
                'remark',
                {
                  initialValue: formData.remark
                }
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="40">
          <h3>参数配置</h3>
        </a-col>
      </a-row>
      <a-table
        :columns="tableColumns"
        :data-source="tableData"
        :pagination="tablePagination"
        :tableLayout="tableLayou"
        size="middle"
      >
        <div slot="value" slot-scope="text, record">
          <a-input
            :id="record.key"
            :defaultValue="record.value"
            @change="handleInputChange"
          />
        </div>
      </a-table>
    </a-form>
  </div>
</template>
<script>
import {
  Select,
  Form,
  Input,
  Row,
  Col,
  Table,
} from 'ant-design-vue';
const ASelectOption = Select.Option;
const AFormItem = Form.Item;
const { TextArea } = Input;

export default {
  name: 'EditForm',
  components: {
    ASelect: Select,
    ASelectOption,
    AForm: Form,
    AFormItem,
    AInput: Input,
    ARow: Row,
    ACol: Col,
    ATextarea: TextArea,
    ATable: Table,
  },
  data: function () {
    return {
      tableLayou: 'auto',
      flagType: undefined,
      tablePagination: false,
      headers: {
        authorization: 'authorization-text'
      },
      form: this.$form.createForm(this, { name: 'InstanceEditForm' }),
      formItemLayout: {
          labelCol: { span: 6 },
          wrapperCol: { span: 16 }
      }
    };
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    type: {
      type: String,
      default: 'create'
    },
    dicts: {
      type: Object,
      default: () => {
        return {};
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableColumns: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  created () {
    // 从这里可以看出，传入进来的数据可以在这里被识别
    this.flagType = this.type;
  },
  methods: {
    handleInputChange (e) {
      const obj = e.srcElement;
      this.formData[obj.id] = obj.value;
    },
    handleSelectChange (value, Option) {
      const key = Option.componentOptions.propsData.label;
      this.formData[key] = value;
    }
  }
};
</script>

<style lang="less" scoped>
.yhwt-modal-container {
  .ant-form {
    .ant-input-disabled,
    .ant-select-disabled {
      background: none;
      border: none;
      color: rgba(0, 0, 0, 0.65);
      font-weight: 700;
      cursor: auto;
      /deep/ .ant-select-selection {
        background: none;
        border: none;
        cursor: auto;
        .ant-select-arrow {
          display: none;
        }
      }
    }
  }
}
</style>
