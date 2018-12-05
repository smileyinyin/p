<template>
<div>
  <Form ref="formValidate" :label-width="100" :model="salesMan" :rules="ruleValidate">
    <Row :gutter="20">
      <i-col span="12">
        <!-- <formItem label="用户名" prop="username">
          <Input v-model="salesMan.username" placeholder="请输入用户名" />
        </formItem> -->
         <formItem label="业务员名" prop="partnerName">
          <Input v-model="salesMan.partnerName" placeholder="请输入合伙人名称" />
        </formItem>
        <formItem label="手机号" prop="mobile">
          <Input v-model="salesMan.mobile" placeholder="请输入手机号" />
        </formItem>
      </i-col>
      <i-col span="12">
        <formItem label="隶属合伙人" prop="belong">
          <Select v-model="salesMan.parentId" placeholder="选择所属城市合伙人" @on-change="changeBelong">
            <Option v-for="item in cityParList" :key="item.userId" :value="item.userId">{{ item.partnerName }}</Option>
          </Select>
        </formItem>
        <!-- <formItem label="隶属合伙人" prop="belong">
          <Row :gutter="10" type="flex" v-if="!isEdit">
            <i-col span="8">
              <Select placeholder="合伙人类型" @on-change="changes">
                <Option v-for="item in patternList" :key="item.index" :value="item.id">{{ item.label }}</Option>
              </Select>
            </i-col>
            <i-col span="16">
            </i-col>
          </Row>
          <Row :gutter="10" type="flex" v-else>
            <i-col span="8">
               <Input v-model="partnertype" disabled />
            </i-col>
            <i-col span="16">
               <Input v-model="parentName" disabled/>
            </i-col>
          </Row>
        </formItem> -->
        <formItem label="pos分润比例">
          <InputNumber
            style="width: 100%;"
            placeholder="请输入POS分润比例"
            v-model="salesMan.posProfitRate"
            :max="1"
            :min="0"
            :step="0.01"
            :formatter="value => `${+(value*100).toFixed(10)}%`"
            :parser="value => String(value.replace('%', '')/100)"></InputNumber>
        </formItem>
      </i-col>
    </Row>
    <Row type="flex" justify="end">
      <Button v-if="isEdit" @click="update" type="primary" style="width:200px">确认修改</Button>
      <Button v-else @click="submit" type="primary" style="width:200px">完成</Button>
    </Row>
  </Form>
</div>
</template>

<script>
// import proCityArea from '_c/proCityArea'
import {
  getPartnerInfo,
  addPartner,
  updatePartner,
  getParentPartnerList
} from '@/api/partner'
// import { getProvinceInfo, getCityInfo, getAreaInfo } from '@/api/common'

export default {
  name: 'salesBaseInfo',
  props: {
    baseInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    // const  createValid = (...props) => {
    //   return (rule, value, callback) => {
    //     if (props.some(prop => !this.salesMan[prop])) {
    //       callback(new Error())
    //     } else {
    //       callback()
    //     }
    //   }
    // }
    return {
      isEdit: false,
      provinceList: [],
      patternList: [
        {
          index: 1,
          id: 1,
          label: '城市合伙人'
        },
        {
          index: 2,
          id: 2,
          label: '渠道合伙人'
        }
      ],
      parentName: '',
      partnertype: '',
      cityList: [],
      areaList: [],
      cityParList: [],
      salesMan: {
        id: '',
        username: '',
        partnerName: '',
        roleId: 3,
        mobile: '',
        posProfitRate: 0,
        parentId: '',
        parentRoleId: '',
        status: 2, // 状态 默认已启用
        type: 2 // 1渠道合伙人 2业务员
      },
      ruleValidate: {
        username: [
          { required: true, message: '用户名必须填写', trigger: 'blur' }
        ],
        partnerName: [
          { required: true, message: '业务员必须填写', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号必须填写', trigger: 'blur' },
          {
            pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/,
            message: '请填写合法手机号',
            trigger: 'blur'
          }
        ],
        belong: [
          {
            required: true,
            message: '隶属合伙人必须选择',
            validator: (value, rule, callback) => {
              if (!this.salesMan.parentId) {
                callback(new Error())
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  created() {
    let id = this.$route.query.id

    // 城市合伙人列表
    getParentPartnerList({ roleId: 1 }).then(res => {
      this.cityParList = res.data
    })
    if (id) {
      this.isEdit = true
      this.salesMan.id = id
      this.getPartnerInfo(id)
    }
  },
  computed: {},
  methods: {
    submit() {
      this.$refs['formValidate'].validate(valid => {
        if (valid) {
          addPartner(this.salesMan).then(res =>
            this.$router.push({ name: 'salesManList' })
          )
        } else {
          this.$Message.error('业务员信息填写不完整，请检查表单填写!')
        }
      })
    },
    changeBelong(v) {
      let obj = this.cityParList.find(item => item.userId === v)
      debugger
      if (obj) {
        this.salesMan.parentRoleId = obj.roleId
      } else {
        this.salesMan.parentRoleId = ''
      }
    },
    changes(val) {
      this.salesMan.parentId = ''
      let pid = Number(val)
      getParentPartnerList({ roleId: pid }).then(res => {
        this.cityParList = res.data
      })
    },
    update() {
      // debugger
      this.$refs['formValidate'].validate(valid => {
        if (valid) {
          updatePartner(this.salesMan).then(res =>
            this.$router.push({ name: 'salesManList' })
          )
        } else {
          this.$Message.error('业务员信息填写不完整，请检查表单填写!')
        }
      })
    },
    getPartnerInfo(id) {
      getPartnerInfo({ id }).then(res => {
        let data = res.data
        this.salesMan.username = data.username
        this.salesMan.partnerName = data.partnerName
        this.salesMan.mobile = data.mobile
        this.salesMan.parentId = data.parentId
        this.salesMan.posProfitRate = data.posProfitRate
        this.parentName = data.parentName
        this.partnertype = (res.data.parentRoleId === 1 ? '城市合伙人' : res.data.parentRoleId === 2 ? '渠道合伙人' : '')
      })
    }
  }
}
</script>
