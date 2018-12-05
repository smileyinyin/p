<template>
<Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="100" class="form">
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
    <i-col span="12">
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
    </i-col>
    <i-col span="12">
      <FormItem label="选择合伙人" prop="userId" required>
        <Select v-model="formItem.userId" placeholder="请选择合伙人" clearable @on-change="changePartner">
          <Option v-for="item in partnerList" :key="item.id" :value="item.id">{{ item.username }}</Option>
        </Select>
      </FormItem>
    </i-col>
    <i-col span="12">
      <FormItem label="选择业务员" prop="saleId">
        <Select v-model="formItem.saleId" clearable>
          <Option v-for="item in salesManList" :key="item.id" :value="item.id">{{ item.username }}</Option>
        </Select>
      </FormItem>
    </i-col>
  </Row>
</Form>
</template>

<script>
import { getDistrictPartner, getSaleList
/* , merchantSignUp, merchantSignUpDetail */ } from '@/api/user'
import { getProvinceInfo, getCityInfo, getAreaInfo } from '@/api/common'
// import { getIndustryAndLegal } from '@/api/merchant'

export default {
  name: 'accountInfo',
  props: {
    accountInfo: {
      type: [ null, Object ]
    }
  },
  data() {
    return {
      accountStatus: 0, // 1 已添加则不可编辑
      formItem: {
        merchantsId: '', // 商户ID
        merchanName: '', // 商户注册名
        mobile: '', // 手机号
        personType: 1, // 商户人员 1 老板 2 店员
        province: '', // 省
        city: '', // 市
        district: '', // 区
        userId: '', // 区代(渠道合伙人)
        saleId: '', // 业务员ID
        isSupplier: 4 // 0城市合伙人1渠道合伙人2供应商3体验店4商户
      },
      ruleValidate: {
        merchanName: [{ required: true, message: '账号名不能为空', trigger: 'blur' }],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, message: '请填写合法手机号', trigger: 'blur' }
        ],
        userId: [{ required: true, type: 'number', message: '合伙人不能为空', trigger: 'blur' }]
      },
      proviceList: [],
      cityList: [],
      districtList: [],

      partnerList: [],
      salesManList: [],
      provinceId: '',
      cityId: '',
      districtId: ''
    }
  },
  created() {
    // findPartnerList().then(res => {
    //   this.partnerList = res.data.list
    // })
    let merchant = this.$store.state.merchant.merchant
    if (!merchant) {
      this.$router.push({ name: 'merchantList' })
      return
    }
    let { id, name } = merchant
    this.formItem.merchantsId = id
    this.formItem.merchanName = name

    this._getProvinceList()
  },
  watch: {
    accountInfo: {
      handler(v) {
        if (v) {
          this.formItem = v
        }
      }
    }
  },
  methods: {
    submit() {
      return new Promise((resolve, reject) => {
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            resolve(this.formItem)
          } else {
            this.$Message.error('账号信息填写不完整，请检查表单填写!')
            /* eslint-disable */
            reject('账号信息填写不完整！！')
          }
        })
      })
    },
    changePartner(value) {
      console.log('getSalesList')
      getSaleList({parentId: value}).then(res => (this.salesManList = res.data.filter(v => v)))
    },
    changeProvince(value) {
      this.formItem.city = ''
      this.formItem.district = ''
      if (!value) {
        this.provinceId = ''
        this.partnerList = []
        return
      }
      var pid = this.proviceList.find(item => item.identity === value.value).id
      this.provinceId = pid
      this._getPartnerList()
      return getCityInfo(pid).then(res => {
        console.log(res)
        this.cityList = res
      })
    },
    changeCity(value) {
      debugger
      this.formItem.district = ''
      if (!value) {
        this.cityId = ''
        this._getPartnerList()
        return
      }
      let pid = this.cityList.find(item => item.identity === value.value).id
      this.cityId = pid
      this._getPartnerList()
      return getAreaInfo(pid).then(res => (this.districtList = res))
    },
    changeDistrict(value) {
      if (!value) {
        this.districtId = ''
        this._getPartnerList()
        return
      }
      let pid = this.districtList.find(item => item.identity === value.value).id
      this.districtId = pid
      this._getPartnerList()
    },
    _getPartnerList() {
      console.log(1111111)
      getDistrictPartner({
        proviceId: this.provinceId,
        cityId: this.cityId || undefined,
        distictId: this.districtId || undefined
      }).then(res => {
        console.log(res)
        this.partnerList = res.data
      })
    },
    _getProvinceList() {
      return getProvinceInfo().then(res => {
        this.proviceList = res
        this._handleCascade() // 处理编辑时级联下拉
      })
    },
    _handleCascade() {
      if (!this.proviceList.length || !this.formItem.id) return
      let proObj = this.proviceList.find(item => item.identity === this.formItem.province)
      getCityInfo(proObj.id).then(res => {
        this.cityList = res
        let cityObj = this.cityList.find(item => item.identity === this.formItem.city)
        getAreaInfo(cityObj.id).then(res => (this.districtList = res))
      })
    },
    // _submit() {
    //   // 提交表单
    //   merchantSignUp(this.formItem).then(res => {
    //     console.log(res)
    //     this.$Message.success('提交成功')
    //     this.$router.push({ name: 'merchantList' })
    //   }).catch(err => console.log(err))
    // },
    // _getAccountInfoDetail() {
    //   merchantSignUpDetail({ merchantsId: this.formItem.merchantsId }).then(res => {
    //     this.formItem = res.data
    //   })
    // },
    // _getLegalmanMobile() {
    //   getIndustryAndLegal(this.formItem.merchantsId).then(res => {
    //     let legalPerson = res.data.legalPerson
    //     if (legalPerson) {
    //       this.formItem.mobile = legalPerson.mobile
    //     }
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
.button {
  margin: 30px 30px 0;
  display: flex;
  justify-content: space-between;
}
</style>
