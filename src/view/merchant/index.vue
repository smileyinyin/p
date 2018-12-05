<template>
  <div class="merchant">
    <h3 class="pb10">商户管理</h3>
    <Card>
      <Row class="pb20" type="flex">
        <i-col>
          <i-button @click="openModal" icon="plus" class="btn-add">添加商户</i-button>
        </i-col>
        <i-col style="flex:1">
          <Row :gutter="20" type="flex" justify="end" align="middle" style="margin-bottom: 10px;">
            <Select v-model="searchForm.status" placeholder="全部状态" clearable class="w120 mr20">
              <!-- <Option value="1" key="1">草稿</Option>
              <Option value="2" key="2">提交</Option> -->
              <Option value="3" key="3">正常</Option>
              <!-- <Option value="4" key="4">审核失败</Option> -->
              <Option value="5" key="5">停业</Option>
            </Select>
            <!-- <Select v-model="searchForm.categoryCode" placeholder="经营类型" clearable class="w120 mr20">
              <Option v-for="item in businessTypeList" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select> -->
            <!-- <Select v-model="searchForm.type" placeholder="商户类型" clearable class="w120 mr20">
              <Option value="1" key="1">普通商户</Option>
              <Option value="2" key="2">小微商户</Option>
            </Select> -->
            <i-input v-model="searchForm.name" placeholder="商户名称" clearable class="w120 mr20"></i-input>
            <DatePicker v-model="searchForm.date" type="datetimerange" placement="bottom-end" placeholder="选择日期" class="w280 mr20"></DatePicker>
            <!-- <Checkbox v-model="searchForm.isSupplier"
              :true-value="2"
              :false-value="-1"
              style="width: 100px; margin-right: 20px;">筛选供应商</Checkbox> -->
          </Row>
        </i-col>
        <i-col>
          <i-button type="primary" @click="getMerchantList" icon="search">查 询</i-button>
        </i-col>
      </Row>
      <Table border :columns="columns" :data="tableData"></Table>
      <Row type="flex" justify="end" align="middle" style="margin-top: 10px">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.currentPage"
              @on-change="getMerchantList"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row>
    </Card>
    <Modal
        scrollable
        class-name="modal"
        v-model="modal"
        title="选择商户类型"
        @on-ok="goMerchant">
        <merchant-type @select="chooseMerchantType"></merchant-type>
    </Modal>
  </div>
</template>

<script>
/**
 * 基本信息 和 认证信息：
 * 草稿状态(1) 可编辑 基本信息 和 工商信息，
 * 待审核(2) 全都不能改，
 * 审核通过(3) 后 基本信息必填项不可改。
 * 审核失败(4) 后全都可以改。
 * 停业(5) 全都不能改。
 * ---------
 * 账号信息：
 * 审核通过之前(1)(2) 灰色
 * 正常营业(3) 可添加，已添加后 只能查看不可编辑
 * ---------
 * 小微商户：
 * 没有工商信息
 * ---------
 * status: 1, // 1 草稿  2提交(带审核) 3正常(审核通过) 4审核失败  5  停业
   industryStatus / legalStatus: 1, //  1 未认证 2 认证
   accountStatus: 0, //  0 未添加 1 已添加
   type: 1 普通商户 2 小微商户
 */
/**
 * 2018.09.27
 * 商户不再有审核，只有 正常（3，不可更改）、停业（5，可更改） 状态！！
 * 商户基本信息、工商法人信息、结算信息 一页填完
 */
import { mapMutations } from 'vuex'
import merchantType from './components/merchantType'
import { formatDate } from '@/libs/util'/* eslint-disable */
import { getMerchantsList, getMerchantsActive } from '@/api/merchant'
import { getSxoIndustryInfo } from '@/api/common'
import makeColums from './data/merchant-columns'

export default {
  name: 'merchant',
  data() {
    return {
      modal: false,
      selectedMerchantType: '', // 弹出框选择的 商户类型
      searchForm: { // 搜索条件
        status: '',
        categoryCode: '',
        type: '',
        name: '',
        storeName: '',
        date: '',
        isSupplier: 0
      },
      pager: {
        currentPage: 1,
        pageSize: 20,
        totalCounts: 0
      },
      businessTypeList: [ // 经营类型
        // { id: 5, code: '5', dataValue: '经营类型' }
      ],
      columns: makeColums.call(this),
      tableData: []
    }
  },
  created() {
    this.getMerchantList()
    this._getBusinessTypeList()
  },
  methods: {
    ...mapMutations([
      'setMerchant'
    ]),
    openModal() {
      this.modal = true
    },
    chooseMerchantType(type) {
      this.selectedMerchantType = type
    },
    goMerchant() {
      this.setMerchant({ type: this.selectedMerchantType, status: 1 })
      this.$router.push({ name: 'merchantAdd' })
    },
    goLegalInfo(params) {
      this.setMerchant(params)
      this.$router.push({ name: 'legalInfo' })
    },
    goAccountInfo(params) {
      this.setMerchant(params)
      this.$router.push({ name: 'accountInfo' })
    },
    goStoreList(params) {
      this.setMerchant(params)
      this.$router.push({ name: 'storeList' })
    },
    goMemberList(params) {
      this.setMerchant(params)
      this.$router.push({ name: 'memberList' })
    },
    getMerchantList() {
      let query = Object.assign(
        {},
        this.searchForm,
        this.pager,
        {
          startTime: formatDate(this.searchForm.date[0], 'yyyy-MM-dd hh:mm:ss'),
          endTime: formatDate(this.searchForm.date[1], 'yyyy-MM-dd hh:mm:ss')
        }
      )
      getMerchantsList(query).then(res => {
        this.tableData = res.data
        this.pager.totalCounts = res.totalCounts
      })
    },
    changePageSize(size) {
      this.pager.pageSize = size
      this.getMerchantList()
    },
    _getBusinessTypeList() {
      getSxoIndustryInfo().then(res => {
        this.businessTypeList = res
      })
    }
  },
  components: {
    merchantType
  }
}
</script>

<style lang="less" scoped>
.merchant {
  /deep/ .link {
    padding: 5px;
    cursor: pointer;
    color: #2d8cf0;
  }
}
</style>
