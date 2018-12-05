<template>
  <!-- <div>账号信息 {{ $route.params.id }}</div> -->
<div v-if="accountStatus !== 1">
  <bread-crumb :data="[
      {path: '/merchantList', title: '商户管理'},
      {title: '添加账号信息'}
    ]"></bread-crumb>
  <Card>
    <p class="pb20">添加账号信息</p>

    <div class="wrapper">
      <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="120" class="form">
        <Row :gutter="10">
          <i-col span="12">
            <FormItem label="账号名" prop="merchanName" required>
              <Input placeholder="请输入账户名" v-model="formItem.merchanName"/>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="登录手机号" prop="mobile" required>
              <Row :gutter="10" style="margin-left:0;">
                <i-col span="16">
                  <Input v-model="formItem.mobile" placeholder="请输入登录手机号" clearable inline />
                </i-col>
                <i-col span="8">
                  <Select v-model="formItem.personType" :label-in-value="true" >
                    <Option :value="1">老板</Option>
                    <Option :value="2">店员</Option>
                  </Select>
                </i-col>
              </Row>
            </FormItem>
          </i-col>
         <!--  <i-col span="24">
            <FormItem label="商户角色" required>
              <CheckboxGroup v-model="formItem.isSupplier">
                <Checkbox :label="4">商户</Checkbox>
                <Checkbox :label="2">供应商</Checkbox>
                <Checkbox :label="3">体验店</Checkbox>
              </CheckboxGroup>
              <RadioGroup v-model="formItem.isSupplier">
                <Radio :label="4">商户</Radio>
                <Radio :label="2">供应商</Radio>
                <Radio :label="3">体验店</Radio>
              </RadioGroup>
            </FormItem>
          </i-col> -->
          <!-- <i-col span="12">
            <FormItem label="绑定区代" required>
              <Row :gutter="10" style="margin:0">
                <i-col span="8" style="padding-left:0">
                  <Select v-model="formItem.province" placeholder="省" :label-in-value="true" clearable @on-change="changeProvince">
                    <Option v-for="item in proviceList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                  </Select>
                </i-col>
                <i-col span="8">
                  <Select v-model="formItem.city" placeholder="市" :label-in-value="true" clearable @on-change="changeCity">
                    <Option v-for="item in cityList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                  </Select>
                </i-col>
                <i-col span="8">
                  <Select v-model="formItem.district" placeholder="区" :label-in-value="true" clearable @on-change="changeDistrict">
                    <Option v-for="item in districtList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                  </Select>
                </i-col>
              </Row>
            </FormItem>
          </i-col> -->
          <i-col span="24">
            <FormItem label="绑定的父级">
              <RadioGroup v-model="bindType" @on-change="bindTypeChange">
                <Radio label="channelPartner">渠道合伙人</Radio>
                <Radio label="salsMan">业务员</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="12" v-if="bindType === 'channelPartner'">
            <FormItem label="选择渠道合伙人" prop="channelPartnerId">
              <Select v-model="formItem.channelPartnerId" placeholder="请选择渠道合伙人" clearable @on-change="changeChannelPartner">
                <Option v-for="item in channelPartnerList" :key="item.id" :value="item.id">{{ item.partner_name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="24" v-else>
            <Row>
              <i-col span="12">
                <FormItem label="选择城市合伙人" prop="cityPartnerId" required>
                  <Select v-model="formItem.cityPartnerId" placeholder="请选择城市合伙人" clearable @on-change="changePartner">
                    <Option v-for="item in partnerList" :key="item.id" :value="item.id">{{ item.partner_name }}</Option>
                  </Select>
                </FormItem>
              </i-col>
              <i-col span="12">
                <FormItem label="选择业务员" prop="salesmanId">
                  <Select v-model="formItem.salesmanId" clearable>
                    <Option v-for="item in salesManList" :key="item.id" :value="item.id">{{ item.partner_name }}</Option>
                  </Select>
                </FormItem>
              </i-col>
            </Row>
          </i-col>
        </Row>
      </Form>
    </div>
  </Card>
  <Row type="flex" justify="space-between" class="mt30 ml30 mr30">
    <Button class="w120 btn-cancel" size="large" @click="cancel">取消</Button>
    <Button class="w120" size="large" type="primary" @click="handleSubmit" v-if="accountStatus !== 1">保存</Button>
  </Row>
</div>

<div v-else>
  <bread-crumb :data="[
      {path: '/merchantList', title: '商户管理'},
      {title: '账号信息详情'}
    ]"></bread-crumb>
  <Card>
    <h3 slot="title">账号信息详情</h3>
    <Form :label-width="120">
      <formItem label="账号名">{{ formItem.accountName }}</formItem>
      <formItem label="账号角色">{{ formItem.accountRole }}</formItem>
      <formItem label="商户角色">{{ getRole }}</formItem>
      <formItem label="手机号">{{ formItem.mobile }}</formItem>
      <formItem label="绑定的城市合伙人">{{ formItem.cityParent }}</formItem>
      <formItem label="绑定的渠道合伙人" v-if="formItem.parent">{{ formItem.parent }}</formItem>
      <formItem label="绑定的业务员" v-if="formItem.sale">{{ formItem.sale }}</formItem>
    </Form>
  </Card>
  <Row type="flex" class="mt30 ml30">
    <Button class="w120 btn-cancel" size="large" @click="cancel">返回</Button>
  </Row>
</div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import {/* getDistrictPartner, getSaleList, */
  merchantSignUp, merchantSignUpDetail, findNameByRole } from '@/api/user'
// import { getProvinceInfo, getCityInfo, getAreaInfo } from '@/api/common'
import { getIndustryAndLegal } from '@/api/merchant'

export default {
  name: 'accountInfo',
  data() {
    return {
      bindType: 'channelPartner',
      accountStatus: 0, // 1 已添加则不可编辑
      formItem: {
        merchantsId: '', // 商户ID
        merchanName: '', // 商户注册名
        mobile: '', // 手机号
        personType: 1, // 商户人员 1 老板 2 店员
        province: '', // 省
        city: '', // 市
        district: '', // 区
        cityPartnerId: '', // 城市合伙人 ID
        channelPartnerId: '', // 渠道合伙人 id
        salesmanId: '', // 业务员 ID

        userId: '', // 渠道合伙人 xx废弃
        saleId: '', // 业务员ID xx废弃
        isSupplier: 4 // 0城市合伙人1渠道合伙人2供应商3体验店4商户
      },
      ruleValidate: {
        merchanName: [{ required: true, message: '账号名不能为空', trigger: 'blur' }],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, message: '请填写合法手机号', trigger: 'blur' }
        ],
        cityPartnerId: [{ required: true, type: 'number', message: '合伙人不能为空', trigger: 'blur' }],
        channelPartnerId: [{ required: true, type: 'number', message: '渠道合伙人不能为空', trigger: 'change' }],
        salesmanId: [{ required: true, type: 'number', message: '业务员不能为空', trigger: 'change' }]
      },
      proviceList: [],
      cityList: [],
      districtList: [],

      partnerList: [],
      channelPartnerList: [],
      salesManList: [],
      provinceId: '',
      cityId: '',
      districtId: ''
    }
  },
  created() {
    let merchant = this.$store.state.merchant.merchant
    if (!merchant) {
      this.$router.push({ name: 'merchantList' })
      return
    }
    let { accountStatus, id, name } = merchant
    this.formItem.merchantsId = id
    this.accountStatus = accountStatus
    this.formItem.merchanName = name

    if (accountStatus === 1) { // 已添加
      this._getAccountInfoDetail()
    } else {
      this._getLegalmanMobile() // 拉取法人电话
      this._getCityPartnerList()
      this._getChannelPartnerList()
    }
    // this._getProvinceList()
  },
  computed: {
    getRole() {
      let role = this.formItem.isSupplier
      if (role === 0) {
        return '城市合伙人'
      } else if (role === 1) {
        return '渠道合伙人'
      } else if (role === 2) {
        return '供应商'
      } else if (role === 3) {
        return '体验店'
      } else if (role === 4) {
        return '商户'
      }
    }
  },
  methods: {
    bindTypeChange(value) {
      if (value === 'channelPartner') {
        this.formItem.salesmanId = ''
      } else if (value === 'salsMan') {
        this.formItem.channelPartnerId = ''
      }
    },
    cancel() {
      this.$router.go(-1)
    },
    handleSubmit() {
      this.$refs['formValidate'].validate(valid => {
        if (valid) {
          this.$Modal.confirm({
            title: '确认保存',
            content: '<p>确定要提交吗？</p><br/><p style="color:red">提交后无法更改。</p>',
            onOk: () => {
              this._submit()
            }
          })
        } else {
          this.$Message.error('请检查表单填写!')
        }
      })
    },
    changePartner(value) {
      // console.log('getSalesList')
      // getSaleList({ parentId: value }).then(res => (this.salesManList = res.data.filter(v => v)))
      let obj = this.partnerList.find(item => item.id === value)
      // debugger
      // obj && findNameByRole({ // 查询合伙人下的渠道合伙人
      //   roleId: 2,
      //   parentId: obj.id,
      //   parentRoleId: 1
      // }).then(res => {
      //   this.channelPartnerList = res.data
      // })
      obj && findNameByRole({ // 查询合伙人吓的业务员
        roleId: 3,
        parentId: obj.id,
        parentRoleId: 1
      }).then(res => {
        this.salesManList = res.data
      })
    },
    changeChannelPartner(value) {
      // let obj = this.channelPartnerList.find(item => item.id === value)
      // obj && findNameByRole({
      //   roleId: 3,
      //   parentId: obj.id,
      //   parentRoleId: 2
      // }).then(res => {
      //   this.salesManList = res.data
      // })
    },
    _getCityPartnerList() {
      findNameByRole({
        roleId: 1,
        parentId: '',
        parentRoleId: ''
      }).then(res => {
        this.partnerList = res.data
      })
    },
    _getChannelPartnerList() {
      findNameByRole({ // 查询 渠道合伙人
        roleId: 2
      }).then(res => {
        this.channelPartnerList = res.data
      })
    },
    // changeProvince(value) {
    //   this.formItem.city = ''
    //   this.formItem.district = ''
    //   if (!value) {
    //     this.provinceId = ''
    //     this.partnerList = []
    //     return
    //   }
    //   var pid = this.proviceList.find(item => item.identity === value.value).id
    //   this.provinceId = pid
    //   this._getPartnerList()
    //   return getCityInfo(pid).then(res => {
    //     console.log(res)
    //     this.cityList = res
    //   })
    // },
    // changeCity(value) {
    //   debugger
    //   this.formItem.district = ''
    //   if (!value) {
    //     this.cityId = ''
    //     this._getPartnerList()
    //     return
    //   }
    //   let pid = this.cityList.find(item => item.identity === value.value).id
    //   this.cityId = pid
    //   this._getPartnerList()
    //   return getAreaInfo(pid).then(res => (this.districtList = res))
    // },
    // changeDistrict(value) {
    //   if (!value) {
    //     this.districtId = ''
    //     this._getPartnerList()
    //     return
    //   }
    //   let pid = this.districtList.find(item => item.identity === value.value).id
    //   this.districtId = pid
    //   this._getPartnerList()
    // },
    // _getPartnerList() {
    //   console.log(1111111)
    //   getDistrictPartner({
    //     proviceId: this.provinceId,
    //     cityId: this.cityId || undefined,
    //     distictId: this.districtId || undefined
    //   }).then(res => {
    //     console.log(res)
    //     this.partnerList = res.data
    //   })
    // },
    // _getProvinceList() {
    //   return getProvinceInfo().then(res => {
    //     this.proviceList = res
    //     this._handleCascade() // 处理编辑时级联下拉
    //   })
    // },
    // _handleCascade() {
    //   if (!this.proviceList.length || !this.formItem.id) return
    //   let proObj = this.proviceList.find(item => item.identity === this.formItem.province)
    //   getCityInfo(proObj.id).then(res => {
    //     this.cityList = res
    //     let cityObj = this.cityList.find(item => item.identity === this.formItem.city)
    //     getAreaInfo(cityObj.id).then(res => (this.districtList = res))
    //   })
    // },
    _submit() {
      // 提交表单
      merchantSignUp(this.formItem).then(res => {
        console.log(res)
        this.$Message.success('提交成功')
        this.$router.push({ name: 'merchantList' })
      }).catch(err => console.log(err))
    },
    _getAccountInfoDetail() {
      merchantSignUpDetail({ merchantsId: this.formItem.merchantsId }).then(res => {
        this.formItem = res.data
      })
    },
    _getLegalmanMobile() {
      getIndustryAndLegal(this.formItem.merchantsId).then(res => {
        let legalPerson = res.data.legalPerson
        if (legalPerson) {
          this.formItem.mobile = legalPerson.mobile
        }
      })
    }
  },
  components: { breadCrumb }
}
</script>
