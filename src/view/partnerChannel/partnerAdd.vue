<template>
  <div>
    <bread-crumb :data="[
      {path: '/channelPartnerList', title: '渠道合伙人管理'},
      {title: isEdit ? '渠道合伙人编辑' : '渠道合伙人添加'}
    ]"></bread-crumb>

    <Card>
      <Form :label-width="120" ref="formValidate" :model="partner" :rules="ruleValidate">
        <Row :gutter="20">
          <i-col span="12">
            <!-- <formItem label="用户名" prop="username" required>
              <Input v-model="partner.username" placeholder="请输入用户名" />
            </formItem> -->
             <formItem label="合伙人名称" prop="partnerName" required>
              <Input v-model="partner.partnerName" placeholder="请输入合伙人名称" />
            </formItem>
            <formItem label="手机号" prop="mobile" required>
              <Input v-model="partner.mobile" placeholder="请输入手机号" />
            </formItem>
              <formItem label="所在地" prop="address" required>
                <pro-city-area
                  :p="partner.mercProv"
                  :c="partner.mercCity"
                  :a="partner.mercArea"
                  @on-change="changePro"
                ></pro-city-area>
              <!-- <Row :gutter="10" class-name="form-item">
                  <i-col span="8">
                    <Select v-model="partner.mercArea" placeholder="选择省份" label-in-value inline clearable @on-change="changeProvince">
                      <Option v-for="item in provinceList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                    </Select>
                  </i-col>
                  <i-col span="8">
                    <Select v-model="partner.mercCity" placeholder="选择市/区" label-in-value inline clearable @on-change="changeCity">
                      <Option v-for="item in cityList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                    </Select>
                  </i-col>
                  <i-col span="8">
                    <Select v-model="partner.mercProv" placeholder="选择区/县" label-in-value inline clearable @on-change="changeArea">
                      <Option v-for="item in areaList" :key="item.id" :value="item.identity">{{ item.name }}</Option>
                    </Select>
                  </i-col>
              </Row> -->
            </formItem>
            <formItem label="详细地址" prop="detailAddress">
              <Input v-model="partner.detailAddress" placeholder="请输入身份证号" />
            </formItem>
            <!-- <formItem label="所属城市合伙人" prop='parentId'>
              <Select v-model="partner.parentId" placeholder="选择所属城市合伙人" @on-change="changeBelong">
                <Option v-for="item in cityParList" :key="item.userId" :value="item.userId">{{ item.partnerName }}</Option>
              </Select>
            </formItem> -->
            <formItem label="身份证号" prop="identityCard">
              <Input v-model="partner.identityCard" placeholder="请输入身份证号" />
            </formItem>
            <formItem label="开户名" prop="accountName">
              <Input v-model="partner.accountName" placeholder="请输入开户名" />
            </formItem>
            <formItem label="开户总行">
              <Select v-model="partner.bankCode" placeholder="请选择开户总行" :label-in-value="true" clearable @on-change="changeBank">
                <Option v-for="(item, index) in generalLineList" :key="index" :value="item.id">{{ item.name }}</Option>
              </Select>
            </formItem>
            <formItem label="开户支行">
              <span style="margin-right: 20px;" v-if="partner.bankBranchName">{{partner.bankBranchName}}</span>
              <Button type="primary" @click="isShow = true" :disabled="!partner.bankCode">选择支行</Button>
            </formItem>
            <formItem label="银行卡号" prop="bankFrontNumber">
              <Input v-model="partner.bankFrontNumber" placeholder="请输入银行卡号" />
            </formItem>
          </i-col>
          <i-col span="12">
            <!-- <formItem label="POS分润比例" prop="pos_profit_rate" required>
              <InputNumber
                style="width: 100%;"
                placeholder="请输入POS分润比例"
                v-model="partner.pos_profit_rate"
                :max="1"
                :min="0"
                :step="0.01"
                :formatter="value => `${+(value*100).toFixed(10)}%`"
                :parser="value => String(value.replace('%', '')/100)"></InputNumber>
            </formItem>
            <formItem label="商户商品分润比例" prop="offline_profit_rate" required>
              <InputNumber
                style="width: 100%;"
                placeholder="请输入商户商品分润比例"
                v-model="partner.offline_profit_rate"
                :max="1"
                :min="0"
                :step="0.01"
                :formatter="value => `${+(value*100).toFixed(10)}%`"
                :parser="value => String(value.replace('%', '')/100)"></InputNumber>
            </formItem>
            <formItem label="供应商商品分润比例" prop="online_profit_rate" required>
              <InputNumber
                style="width: 100%;"
                placeholder="请选择供应商商品分润比例"
                v-model="partner.online_profit_rate"
                :max="1"
                :min="0"
                :step="0.01"
                :formatter="value => `${+(value*100).toFixed(10)}%`"
                :parser="value => String(value.replace('%', '')/100)"></InputNumber>
            </formItem> -->
            <formItem label="pos分润比例" prop="posProfitRate">
              <InputNumber
                style="width: 100%;"
                placeholder="请输入POS分润比例"
                v-model="partner.posProfitRate"
                :max="1"
                :min="0"
                :step="0.01"
                :formatter="value => `${+(value*100).toFixed(10)}%`"
                :parser="value => String(value.replace('%', '')/100)"></InputNumber>
            </formItem>
            <FormItem label="法人名称" required prop="identityName">
              <Input v-model="partner.identityName" placeholder="法人名称" />
            </FormItem>
            <FormItem label="法人身份证" required prop="identityImg">
              <div style="color:#d6d6d6">每张照片建议大小为<span style="color: red;">500KB</span>，格式可以为PNG、JPG、JPEG</div>
              <upload-img title="法人身份证正面"
                :noTips="true"
                v-model="identityFrontImgList"
                :needImg="1"></upload-img>
              <upload-img title="法人身份证反面"
                :noTips="true"
                v-model="identityBackImgList"
                :needImg="1"></upload-img>
            </FormItem>
            <FormItem label="银行卡正面图" required prop="bankFrontImg">
              <upload-img title="银行卡正面图"
                v-model="bankFrontImgList"
                :needImg="1"></upload-img>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Card>
    <Row type="flex" justify="end" class="mt30 ml30 mr30">
      <Button v-if="isEdit" @click="update" class="w120 btn-add">确认修改</Button>
      <Button v-else @click="submit" class="w120 btn-add">完成</Button>
    </Row>
    <Modal v-model="isShow" @on-ok="chooseBranchBank" :closable="true" title="选择支行" width="800">
      <Row>
        <i-col span="24" align="right">
          <Input placeholder="请输入支行名称" v-model="params.name" class="w120 mr20" />
          <Select placeholder="省" :label-in-value="true" clearable class="w120 mr20 tl" v-model="params.provinceId" @on-change="changeProvince1">
              <Option v-for="(item, index) in provinceList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
          <Select placeholder="市" :label-in-value="true" clearable  class="w120 mr20 tl" v-model="params.cityId">
              <Option v-for="(item, index) in modalCityList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
          <Button type="primary" @click="getBranchList">查询</Button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData" class="mt20" @on-selection-change="changeSelect" ref="selection"></Table>
      <Page :total="params.totalCounts" show-sizer :page-size="params.size" :current.sync="params.page" @on-change="getpage" @on-page-size-change="changePageSize" class="mt20 tr"> </Page>
    </Modal>
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import uploadImg from '_c/uploadImg/uploadImg'
import proCityArea from '_c/proCityArea'
import { getPartnerInfo, addPartner, updatePartner, activePartner, getParentPartnerList } from '@/api/partner'
import { getProvinceInfo, getCityInfo, getSxoBanksInfo, getSxoBanksBranchInfoByFuzzyQuery } from '@/api/common'

export default {
  name: 'channelPartnerAdd',
  data() {
    const validAddress = (rule, value, callback) => {
      if (!this.partner.mercProv) {
        callback(new Error('所在地必须选择'))
      } else {
        callback()
      }
    }

    const validIdentityImg = (rule, value, callback) => {
      if (!this.identityFrontImgList.length || !this.identityBackImgList.length) {
        callback(new Error())
      } else {
        callback()
      }
    }

    const validBankImg = (rule, value, callback) => {
      if (!this.bankFrontImgList.length) {
        callback(new Error('银行卡正面图必须上传'))
      } else {
        callback()
      }
    }

    return {
      isEdit: false,
      // isShowModal: false,
      // selfRate: '', // 自定义比例
      provinceList: [],
      cityList: [],
      areaList: [],
      identityFrontImgList: [],
      identityBackImgList: [],
      bankFrontImgList: [],
      cityParList: [], // 所属城市合伙人列表
      partner: {
        id: '',
        username: '',
        partnerName: '',
        mobile: '',
        posProfitRate: 0, // pos分润费率
        // address: '',
        // pos_profit_rate: 0, // pos 分润比例
        // offline_profit_rate: 0, // 商户商品分润比例
        // online_profit_rate: 0, // 体验商商品分润比例
        mercArea: '', // 省编码,
        mercCity: '', // 市编码,
        mercProv: '', // 区编码,
        province: '', // 省中文
        city: '', // 市中文
        district: '', // 区中文
        time: '', // 随便传啥
        status: 2, // 状态
        roleId: 2, // 2渠道合伙人、1城市合伙人
        // parentId: '',
        parentRoleId: '',
        detailAddress: '', // 详细地址

        identityName: '', // 身份证名称
        identityCard: '', // 身份证号
        identityFrontImg: '', // 身份证正面
        identityBackImg: '', // 身份证反面
        bankName: '', // 银行名
        bankFrontNumber: '', // 银行卡号
        bankFrontImg: '', // 银行卡正面照
        bankCode: '', // 银行总行 code
        bankBranchCode: '', // 支行code
        bankBranchName: '', // 支行名称
        accountName: '' // 开户名
        // roleId: this.$store.state.user.roleId,
        // userId: this.$store.state.user.userId
      },
      ruleValidate: {
        username: [{ required: true, message: '用户名必须填写', trigger: 'blur' }],
        partnerName: [{ required: true, message: '合伙人名称必须填写', trigger: 'blur' }],
        // parentId: [{ required: true, message: '选择所属城市合伙人必须填写', trigger: 'blur', type: 'number' }],
        mobile: [
          { required: true, message: '手机号必须填写', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/, message: '请填写合法手机号', trigger: 'blur' }
        ],
        detailAddress: [{ required: true, message: '详细地址必须填写', trigger: 'blur' }],
        address: [{ required: true, message: '所在地必须填写', trigger: 'blur', validator: validAddress }],
        // pos_profit_rate: [{ required: true, type: 'number', message: 'POS分润比例必须填写', trigger: 'blur' }],
        // offline_profit_rate: [{ required: true, type: 'number', message: '商户商品分润比例必须填写', trigger: 'blur' }],
        // online_profit_rate: [{ required: true, type: 'number', message: '体验商商品分润比例必须填写', trigger: 'blur' }],
        // posProfitRate: [{ required: true, message: 'POS分润比例必须填写', trigger: 'blur' }],
        identityName: [{ required: true, message: '法人名称必须填写', trigger: 'blur' }],
        identityImg: [{ required: true, message: '身份证正反图必须上传', trigger: 'blur', validator: validIdentityImg }],
        bankFrontImg: [{ required: true, message: '银行卡正面图必须上传', trigger: 'blur', validator: validBankImg }],
        identityCard: [
          { required: true, message: '身份证号必须填写', trigger: 'blur' },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请填写合法身份证', trigger: 'blur' }
        ],
        accountName: [
          { required: true, message: '开户名必须填写', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,45}$/, message: '开户名必须2-45位中文、字母或数字，不含特殊字符', trigger: 'blur' },
          { pattern: /\D+/, message: '开户名不能全为数字', trigger: 'blur' }
        ],
        bankFrontNumber: [
          { required: true, message: '银行卡号必须填写', trigger: 'blur' }
        ]
      },

      isShow: false,
      generalLineList: [],
      modalCityList: [],
      params: {
        bankId: '',
        provinceId: '',
        cityId: '',
        name: '',
        page: 1,
        size: 10
      },
      totalCounts: 1,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '支行名称',
          key: 'name'
        }, {
          title: 'id',
          key: 'id'
        }
      ],
      tableData: [],
      selectionList: []
    }
  },
  created() {
    let id = this.$route.query.id
    if (id) {
      this.isEdit = true
      this.partner.id = id
      this._getPartnerInfo(id)
    }
    this._getProvinceInfo()
    getParentPartnerList({ roleId: 1 }).then(res => {
      this.cityParList = res.data
    })
    getSxoBanksInfo().then(res => {
      this.generalLineList = res
    })
  },
  watch: {
    identityFrontImgList(value) {
      this.partner.identityFrontImg = value.map(v => v.url).join(',')
    },
    identityBackImgList(value) {
      this.partner.identityBackImg = value.map(v => v.url).join(',')
    },
    bankFrontImgList(value) {
      this.partner.bankFrontImg = value.map(v => v.url).join(',')
    }
  },
  methods: {
    getBranchList() {
      if (!this.params.provinceId || !this.params.cityId) {
        this.$Message.error('请选择省、市')
        return
      }
      this.params.bankId = this.partner.bankCode
      debugger
      getSxoBanksBranchInfoByFuzzyQuery(this.params).then(res => {
        this.tableData = res.data
        this.totalCounts = res.objectotalNumber
      })
    },
    changeProvince1(value) {
      this.params.cityId = ''
      if (!value) return
      this.partner.bankBranchCode = ''
      this.partner.bankBranchName = ''
      debugger
      var pid = value.value
      return getCityInfo(pid).then(res => (this.modalCityList = res))
    },
    changeSelect(li) {
      this.selectionList = li
    },
    chooseBranchBank() {
      if (!this.selectionList.length) {
        this.$Message.error('请选择一个支行')
        return
      }
      if (this.selectionList.length > 1) {
        this.$Message.error('只能选择一个支行')
        return
      }
      this.partner.bankBranchCode = this.selectionList[0].id
      this.partner.bankBranchName = this.selectionList[0].name
    },
    changeBank(value) {
      this.partner.bankBranchCode = ''
      this.partner.bankBranchName = ''
      if (!value) return
      this.partner.bankName = value.label
    },
    getpage(val) {
      this.params.page = val
      this.getBranchList()
    },
    changePageSize(val) {
      this.params.page = 1
      this.params.size = val
      this.getBranchList()
    },
    changeBelong(v) {
      let obj = this.cityParList.find(item => item.userId === v)
      debugger
      if (obj) {
        this.partner.parentRoleId = obj.roleId
      } else {
        this.partner.parentRoleId = ''
      }
    },
    submit() {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          addPartner(this.partner).then(res => this.$router.push({ name: 'channelPartnerList' }))
        } else {
          this.$Message.error('请检查表单填写!')
        }
      })
    },
    update() {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          updatePartner(this.partner).then(res => {
            if (this.partner.status === 4) { // 审核不通过时 编辑完成改为待审核
              activePartner({ status: 1, id: this.partner.id }).then(res => {
                this.$router.push({ name: 'channelPartnerList' })
              })
            } else {
              this.$router.push({ name: 'channelPartnerList' })
            }
          })
        } else {
          this.$Message.error('请检查表单填写!')
        }
      })
    },
    // changePartnerType(value) {
    //   this.partner.roleName = value
    // },
    changePro({ proCode, province, cityCode, city, areaCode, area }) {
      console.log(proCode, province, cityCode, city, areaCode, area)
      this.partner.mercProv = proCode
      this.partner.province = province
      this.partner.mercCity = cityCode
      this.partner.city = city
      this.partner.mercArea = areaCode
      this.partner.district = area
    },
    // changeProvince(value) {
    //   console.log(value)
    //   if (!value) return
    //   this.partner.mercCity = ''
    //   this.partner.mercProv = ''
    //   this.partner.province = value.label
    //   var pid = this.provinceList.find(item => item.identity === value.value).id
    //   return getCityInfo(pid).then(res => (this.cityList = res))
    // },
    // changeCity(value) {
    //   if (!value) return
    //   this.partner.mercProv = ''
    //   this.partner.city = value.label
    //   let pid = this.cityList.find(item => item.identity === value.value).id
    //   return getAreaInfo(pid).then(res => (this.areaList = res))
    // },
    // changeArea(value) {
    //   if (!value) return
    //   this.partner.district = value.label
    // },
    _getProvinceInfo() {
      getProvinceInfo().then(res => {
        this.provinceList = res
        // this._handleCascade() // 处理编辑时级联下拉
      })
    },
    // _handleCascade() {
    //   if (!this.provinceList.length || !this.partner.mercArea) return
    //   let proObj = this.provinceList.find(item => item.identity === this.partner.mercArea)
    //   getCityInfo(proObj.id).then(res => {
    //     this.cityList = res
    //     let cityObj = this.cityList.find(item => item.identity === this.partner.mercCity)
    //     getAreaInfo(cityObj.id).then(res => (this.areaList = res))
    //   })
    // },
    _getPartnerInfo(id) {
      getPartnerInfo({ id }).then(res => {
        let data = res.data
        this.partner.username = data.username
        this.partner.mobile = data.mobile
        this.partner.status = data.status
        this.partner.roleName = data.roleName
        // this.partner.address = data.address
        this.partner.mercProv = data.mercProv
        this.partner.province = data.province
        this.partner.mercCity = data.mercCity
        this.partner.city = data.city
        this.partner.mercArea = data.mercArea
        this.partner.district = data.district
        this.partner.detailAddress = data.detailAddress // 详细地址
        // this.partner.pos_profit_rate = data.pos_profit_rate
        // this.partner.offline_profit_rate = data.offline_profit_rate
        // this.partner.online_profit_rate = data.online_profit_rate

        this.partner.posProfitRate = data.posProfitRate // pos分润费率
        this.partner.identityName = data.identityName // 身份证号
        this.partner.identityCard = data.identityCard // 身份证号
        this.partner.bankName = data.bankName // 银行名
        this.partner.bankFrontNumber = data.bankFrontNumber // 银行卡号
        this.partner.bankCode = Number(data.bankCode) // 银行总行 code
        this.partner.bankBranchCode = data.bankBranchCode // 支行code
        this.partner.bankBranchName = data.bankBranchName // 支行名称
        this.partner.accountName = data.accountName // 开户名
        // this.partner.parentId = data.parentId

        if (data.identityFrontImg) {
          this.identityFrontImgList = [{ name: '身份证正面', url: data.identityFrontImg }]
        }
        if (data.identityBackImg) {
          this.identityBackImgList = [{ name: '身份证反面', url: data.identityBackImg }]
        }
        if (data.bankFrontImg) {
          this.bankFrontImgList = [{ name: '银行卡正面照', url: data.bankFrontImg }]
        }

        // this._handleCascade() // 处理编辑时级联下拉
      })
    }
  },
  components: { breadCrumb, uploadImg, proCityArea }
}
</script>

<style lang="less" scoped>
.form-item /deep/ .ivu-form-item-content::after {
  content: '';
  display: block;
  clear: both;
}
</style>
