<template>
  <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="110" class="form" label-position="left">
    <Row type="flex" :gutter="40">
      <i-col span="12">
        <FormItem label="商户名" prop="name">
          <Input v-model="formItem.name" placeholder="请输入商户名" :disabled="!requiredEditable"/>
        </FormItem>
        <FormItem label="扫码小票名称">
          <Input v-model="formItem.alias" placeholder="请输入扫码小票" :disabled="!editable"/>
        </FormItem>
        <FormItem label="行业类别" prop="mccCode">
          <Select v-model="formItem.mccCode" placeholder="请选择MCC码" filterable :label-in-value="true" :clearable="requiredEditable" @on-change="mccChange" :disabled="!requiredEditable">
            <Option v-for="item in mccList" :key="item.mcc_cd" :value="item.mcc_cd">{{ item.mcc_nm + '-' + item.mcc_cd }}</Option>
          </Select>
        </FormItem>
        <FormItem label="经营类型" prop="categoryCode">
          <Select v-model="formItem.categoryCode" placeholder="经营类型" filterable :label-in-value="true" :clearable="requiredEditable" @on-change="changeShopType" :disabled="!requiredEditable">
            <Option v-for="item in businessTypeList" :key="item.id" :value="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="商户简介" prop="briefIntroduction">
          <Input v-model="formItem.briefIntroduction" placeholder="商户简介" />
        </FormItem>
        <FormItem label="商户详情" prop="detail">
          <Input v-model="formItem.detail" placeholder="商户详情" type="textarea" :autosize="{minRows: 5,maxRows: 5}" />
        </FormItem>
        <FormItem label="门店LOGO" prop="logo" v-if="formItem.mold === 0">
          <upload-img title="门店LOGO" v-model="logoImgList"></upload-img>
        </FormItem>
      </i-col>
      <i-col span="12">
        <FormItem label="商户类型" v-if="type === 1">
          <RadioGroup v-model="formItem.mold">
            <Radio :disabled="!requiredEditable" :label="0">个体</Radio>
            <Radio :disabled="!requiredEditable" :label="1">连锁店</Radio>
          </RadioGroup>
        </FormItem>
        <p class="tips" v-if="type === 1">提示：商家地址必须与营业执照地址保持一致</p>
        <FormItem label="商家地址" prop="address">
          <Row :gutter="10" style="margin:0">
            <i-col span="6" style="padding-left:0">
              <Select v-model="formItem.mercProv" placeholder="省" :label-in-value="true" clearable @on-change="changeProvince"  :disabled="!editable || !requiredEditable">
                <Option v-for="item in proviceList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
              </Select>
            </i-col>
            <i-col span="6">
              <Select v-model="formItem.mercCity" placeholder="市" :label-in-value="true" clearable @on-change="changeCity"  :disabled="!editable || !requiredEditable">
                <Option v-for="item in cityList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
              </Select>
            </i-col>
            <i-col span="6">
              <Select v-model="formItem.mercArea" placeholder="区" clearable :label-in-value="true" @on-change="changeArea"  :disabled="!editable || !requiredEditable">
                <Option v-for="item in districtList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
              </Select>
            </i-col>
            <i-col span="6">
              <Input v-model="formItem.adressDetail" placeholder="详细地址"  :disabled="!editable || !requiredEditable"/>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="经纬度">
          <Input :value="formItem.longitude ? `${formItem.longitude}, ${formItem.latitude}` : ''" placeholder="经度" icon="location" @click.native="selectLocation"  :disabled="!editable"/>
          <!-- <Input v-model="formItem.latitude" placeholder="纬度" /> -->
        </FormItem>
        <FormItem label="商户服务">
          <Input v-model="formItem.service" placeholder="商户服务"  :disabled="!editable"/>
        </FormItem>
        <!-- <FormItem label="经营内容照" required prop="operImg">
          <Input v-model="formItem.shopContentImg" placeholder="经营内容照" />
          <upload-img title="经营内容照" :needImg="1" v-model="operationImgList" :viewOnly="!editable || !requiredEditable"></upload-img>
        </FormItem> -->
        <FormItem :label="type === 2 ? '结算人门头照' : '门头照'" required prop="head" v-if="formItem.mold === 0">
          <upload-img :title="type === 2 ? '结算人门头照' : '门头照'" v-model="headImgList"></upload-img>
        </FormItem>
        <FormItem label="收银台照" required prop="cash" v-if="formItem.mold === 0">
          <upload-img title="收银台照" v-model="cashImgList"></upload-img>
        </FormItem>
      </i-col>
    </Row>
    <b-map :isShow.sync="modal"
      @location="location"
      :initPoint="formItem.longitude ? {lng: formItem.longitude, lat: formItem.latitude} : null"></b-map>
  </Form>
</template>

<script>
// import proCityArea from '_c/pro-city-area/proCityArea'
// import { mapMutations } from 'vuex'
import BMap from '_c/b-map'
import breadCrumb from '_c/breadCrumb/breadCrumb'
import UploadImg from '_c/uploadImg/uploadImg'
import {
  getMerchantsInfo
/* , addMerchants, updateMerchants */
} from '@/api/merchant'
import { getMccInfo, getProvinceInfo, getCityInfo, getAreaInfo, getSxoIndustryInfo } from '@/api/common'

export default {
  name: 'baseInfo',
  props: {
    type: { // 1 普通商户 2 小微商户
      type: Number,
      required: true
    },
    merchant: { // 商户基础信息对象
      type: Object,
      required: true
    }
  },
  data() {
    const createValid = (...props) => {
      return (rule, value, callback) => {
        if (props.some(prop => !this.formItem[prop])) {
          callback(new Error())
        } else {
          callback()
        }
      }
    }
    return {
      editable: true, // 是否可编辑
      requiredEditable: true, // 必填项是否可编辑
      modal: false, // 弹窗

      headImgList: [], // 门头照 数组
      logoImgList: [], // 门店 logo 数组
      cashImgList: [], // 收银台照 数组
      formItem: {
        id: '', // 商户 id
        name: '', // 商户名
        alias: '', // 商户简称
        categoryName: '', // 经营类型名称
        categoryCode: '', // 经营类型code
        operationImg: '', // 经营内容照
        mcc: '', // MCC中文
        mccCode: '', // 行业类别 MCC码
        province: '', // 省
        mercProv: '', // 省 编码
        city: '', // 市
        mercCity: '', // 市 编码
        district: '', // 区
        mercArea: '', // 区 编码
        adressDetail: '', // 详细地址
        longitude: '', // 经度
        latitude: '', // 纬度
        briefIntroduction: '', // 商户简介
        detail: '', // 商户详情
        type: '', // 商户类型
        service: '', // 商户服务
        status: '1', // 提交状态 (首次提交默认为1)
        isSupplier: 4,
        mold: 0 // 个体 会默认添加一家门店且只有一家门店，需要商户时就添加 门店的那几个照片
      },
      ruleValidate: {
        name: [
          { required: true, message: '商户名称不能为空', trigger: 'blur' },
          { pattern: /\D+/, message: '门店名称不能全为数字', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{8,20}$/, message: '门店名称为8-20个字母、汉字或数字，不含特殊字符', trigger: 'blur' }
        ],
        alias: [
          { required: true, message: '扫码小票不能为空', trigger: 'blur' },
          { pattern: /\D+/, message: '扫码小票不能全为数字', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{8,20}$/, message: '扫码小票名称为8-20个字母、汉字或数字，不含特殊字符', trigger: 'blur' }
        ],
        mccCode: [{ required: true, message: 'MCC码不能为空', trigger: 'change' }],
        categoryCode: [
          { required: true, type: 'number', message: '经营类型不能为空', trigger: 'change' }
        ],
        // briefIntroduction: [
        //   { required: true, message: '商户简介不能为空', trigger: 'blur' }
        // ],
        // detail: [
        //   { required: true, message: '商户详情不能为空', trigger: 'blur' }
        // ],
        address: [
          { required: true, message: '商户地址不能为空', trigger: 'blur', validator: createValid('mercProv', 'mercCity', 'mercArea', 'adressDetail') },
          { pattern: /\D+/, message: '门店名称不能全为数字', trigger: 'blur' }
        ],
        operImg: [
          { required: true, message: '经营内容照必须上传', trigger: 'blur', validator: createValid('operationImg') }
        ],
        head: [{ required: true, message: '门头照必须上传', trigger: 'blur', validator: createValid('headImg') }],
        cash: [{ required: true, message: '收银台照必须上传', trigger: 'blur', validator: createValid('cashImg') }]
      },
      mccList: [],
      businessTypeList: [], // 经营类型
      proviceList: [],
      cityList: [],
      districtList: [],
      operationImgList: []
    }
  },
  created() {
    this._getProvinceList()
    this._getMccList()
    this._getBusinessTypeList()
  },
  watch: {
    merchant: {
      immediate: true,
      handler(value) {
        // 编辑时
        if (value.id) {
          this.requiredEditable = false
          for (let key in this.formItem) {
            this.formItem[key] = value[key]
          }
          this.formItem.categoryCode = Number(value.categoryCode)
          this.formItem.mccCode = value.mccCode
          this.formItem.id = value.id
          if (value.operationImg) {
            this.operationImgList = [{ name: '经营内容照', url: value.operationImg }]
          }
          if (value.headImg) {
            this.headImgList = value.headImg.split(',').map((v, i) => ({ name: '门头照' + i, url: v }))
          }
          if (value.logoImg) {
            this.logoImgList = value.logoImg.split(',').map((v, i) => ({ name: 'logo照' + i, url: v }))
          }
          if (value.cashImg) {
            this.cashImgList = value.cashImg.split(',').map((v, i) => ({ name: '收银台照' + i, url: v }))
          }
          this._handleCascade() // 处理编辑时级联下拉
        } else {
          this.formItem.type = this.type
        }
      }
    },
    operationImgList(value) {
      this.formItem.operationImg = value.map(v => v.url).join(',')
    },
    logoImgList(value) {
      this.formItem.logoImg = value.map(v => v.url).join(',')
    },
    headImgList(value) {
      this.formItem.headImg = value.map(v => v.url).join(',')
    },
    cashImgList(value) {
      this.formItem.cashImg = value.map(v => v.url).join(',')
    }
  },
  methods: {
    // ...mapMutations([
    //   'setMerchant'
    // ]),
    changeShopType(value) {
      if (!value) {
        this.formItem.categoryName = ''
        return
      }
      this.formItem.categoryName = value.label
    },
    mccChange(value) {
      if (!value) {
        this.formItem.mcc = ''
        return
      }
      this.formItem.mcc = value.label
    },
    location(loc) {
      this.formItem.longitude = loc.lng
      this.formItem.latitude = loc.lat
    },
    selectLocation() {
      if (this.editable) {
        this.modal = true
      }
    },
    // handleSubmit(flag) {
    //   this.$refs['formValidate'].validate(valid => {
    //     if (valid) {
    //       // 提交表单
    //       if (this.formItem.id) { // 有 id 则是编辑
    //         updateMerchants(this.formItem).then(res => { // ...
    //           if (flag) {
    //             this.$router.push({ name: 'legalInfo' })
    //           } else {
    //             this.$router.push({ name: 'merchantList' })
    //           }
    //         })
    //       } else {
    //         addMerchants(this.formItem).then(res => { // ...
    //           if (flag) {
    //             this.setMerchant(res.data)
    //             this.$router.push({ name: 'legalInfo' })
    //           } else {
    //             this.$router.push({ name: 'merchantList' })
    //           }
    //         }).catch(err => console.log(err))
    //       }
    //     } else {
    //       this.$Message.error('请检查表单填写!')
    //     }
    //   })
    // },
    submit() {
      return new Promise((resolve, reject) => {
        this.$refs['formValidate'].validate(valid => {
          if (valid) {
            console.log(valid)
            resolve(this.formItem)
          } else {
            this.$Message.error('商户信息不完整，请检查表单填写！')
            /* eslint-disable */
            reject('商户信息不完整！')
          }
        })
      })
    },
    // cancel() {
    //   this.$router.go(-1)
    // },
    changeProvince(value) {
      console.log(value)
      if (!value) return
      this.formItem.province = value.label
      this.formItem.mercCity = ''
      this.formItem.mercArea = ''
      var pid = this.proviceList.find(item => item.identity === value.value).id
      return getCityInfo(pid).then(res => (this.cityList = res))
    },
    changeCity(value) {
      if (!value) return
      this.formItem.city = value.label
      this.formItem.mercArea = ''
      let pid = this.cityList.find(item => item.identity === value.value).id
      return getAreaInfo(pid).then(res => (this.districtList = res))
    },
    changeArea(value) {
      if (!value) return
      console.log(value)
      this.formItem.district = value.label
    },
    _getProvinceList() {
      return getProvinceInfo().then(res => {
        this.proviceList = res
        this._handleCascade() // 处理编辑时级联下拉
      })
    },
    _getMccList() {
      return getMccInfo().then(res => {
        this.mccList = res
      })
    },
    _getBusinessTypeList() {
      return getSxoIndustryInfo().then(res => {
        this.businessTypeList = res
      })
    },
    _getShopInfo(id) {
      getMerchantsInfo(id).then(res => {
        let data = res.data
        for (let key in this.formItem) {
          this.formItem[key] = data[key]
        }
        this.formItem.categoryCode = Number(data.categoryCode)
        this.formItem.mccCode = data.mccCode
        this.formItem.id = data.id
        if (data.operationImg) {
          this.operationImgList = [{name: '经营内容照', url: data.operationImg}]
        }
        this._handleCascade() // 处理编辑时级联下拉
      })
    },
    _handleCascade() {
      if (!this.proviceList.length || !this.formItem.mercProv) return
      let proObj = this.proviceList.find(item => item.identity === this.formItem.mercProv)
      getCityInfo(proObj.id).then(res => {
        this.cityList = res
        let cityObj = this.cityList.find(item => item.identity === this.formItem.mercCity)
        getAreaInfo(cityObj.id).then(res => (this.districtList = res))
      })
    }
  },
  components: {
    UploadImg, BMap, breadCrumb
  }
}
</script>

<style lang="less" scoped>
.tips {
  margin-left: 90px;
  color:red;
  font-size: 12px;
}
// .form {
//   display: flex;
//   padding-bottom: 20px;

//   .left,
//   .right {
//     flex: 1;
//   }
//   .left {
//     padding-right: 30px;
//   }

//   .tips {
//     color: #d6d6d6;
//   }
// }
// .button {
//   margin: 30px 30px 0;
//   display: flex;
//   justify-content: space-between;
// }
</style>
