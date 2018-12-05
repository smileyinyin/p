<template>
  <div>
    <h3 class="mb10">渠道合伙人管理</h3>

    <Card>
      <Row :gutter="10" class="mb20">
        <i-col :span="24" style="display:flex">
          <Button @click="addPartner" icon="plus" class="btn-add">添加合伙人</Button>
          <Row type="flex" justify="end" style="flex:1">
            <Input class="w200 mr20" v-model="searchForm.mobile" placeholder="合伙人账号（手机号码）" clearable/>
            <DatePicker class="w200 mr20" v-model="createTime" type="datetimerange" placement="bottom-end" placeholder="选择日期"></DatePicker>
            <Button type="primary" @click="getPartnerList" icon="search">查询</Button>
          </Row>
        </i-col>
        <!-- <Form :labelWidth="100">
          <i-col span="4">
          </i-col>
          <i-col span="8">
            <formItem label="合伙人账号">
            </formItem>
          </i-col>
          <i-col span="8">
            <formItem label="创建时间">
              <Select v-model="searchForm.status" clearable>
                <Option :value="1">待审核</Option>
                <Option :value="2">已启用</Option>
                <Option :value="3">已禁用</Option>
                <Option :value="4">审核不通过</Option>
              </Select>
            </formItem>
          </i-col>
          <i-col span="4">
            <formItem>
            </formItem>
          </i-col>
        </Form> -->
      </Row>
      <Table :data="tableData" :columns="columns" border></Table>
      <Row type="flex" justify="end" style="margin-top: 20px">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.pageNum"
              @on-page-size-change="changePageSize"
              @on-change="changePage"
        > </Page>
      </Row>
    </Card>
  </div>
</template>

<script>/* eslint-disable */
import { getPartnerList, activePartner } from '@/api/partner'
import { formatDate } from '@/libs/util'
// import { getProvinceInfo, getCityInfo, getAreaInfo } from '@/api/common'

export default {
  name: 'channelPartnerList',
  data() {
    return {
      createTime: '',
      searchForm: {
        // provice: '',
        // city: '',
        // distric: '',
        roleId: 2, // 2 表示渠道合伙人
        mobile: '',
        status: ''

        // roleId: this.$store.state.user.roleId,
        // userId: this.$store.state.user.userId
      },
      pager: {
        pageNum: 1,
        pageSize: 20,
        totalCounts: 0
      },
      columns: [
        {
          title: '序号',
          // key: 'id'
          type:'index'
        },
        {
          title: '合伙人名称',
          key: 'partnerName'
        },
        // {
        //   title: '合伙人类型',
        //   key: 'roleName'
        // },
        {
          title: '地址',
          key: 'address',
          width: 160,
          render: (h, params) => {
            return h('span', null, params.row.province + params.row.city + params.row.district)
          }
        },
        {
          title: '账号',
          key: 'mobile'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            let str = ''
            let color = ''
            switch (params.row.status) {
              case 1:
                str = '待审核'
                color = '#FF0000'
                break
              case 2:
                str = '启用'
                color = '#0099FF'
                break
              case 3:
                str = '禁用'
                color = '#FF0000'
                break
              case 4:
                str = '审核不通过'
                color = '#00CC00'
                break
              default:
                break
            }
            return h('span', { style: { color: color } }, str)
          }
        },
        {
          title: '创建时间',
          key: 'time',
          width: 140,
          render: (h, params) => {
            return h('span', null, formatDate(new Date(params.row.time), 'yyyy-MM-dd hh:mm'))
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          render: (h, params) => {
            let status = params.row.status
            let act = ''
            let type = 'primary'
            let onclick = null
            switch (status) {
              case 1:
                act = '审核'
                type = 'warning'
                onclick = () => this.$router.push({ name: 'channelPartnerCheck', query: { id: params.row.id } })
                break
              case 2:
                act = '禁用'
                type = 'error'
                onclick = () => {
                  // this.$Modal.confirm({
                  //   title: '确认禁用',
                  //   content: '<p>确认禁用该合伙人吗？</p>',
                  //   onOk: () => {
                  //     activePartner({ status: 3, id: params.row.id }).then(res => this.getPartnerList())
                  //   }
                  // })
                  // TODO
                  this.$Notice.info({
                    title: '暂不支持',
                    desc: '<p>暂不支持此功能，敬请期待:)</p><br/>'
                  })
                  // TODO
                }
                break
              case 3:
                act = '启用'
                type = 'success'
                onclick = () => {
                  // this.$Modal.confirm({
                  //   title: '确认启用',
                  //   content: '<p>确认启用该合伙人吗？</p>',
                  //   onOk: () => {
                  //     activePartner({ status: 2, id: params.row.id }).then(res => this.getPartnerList())
                  //   }
                  // })
                  // TODO
                  this.$Notice.info({
                    title: '暂不支持',
                    desc: '<p>暂不支持此功能，敬请期待:)</p><br/>'
                  })
                  // TODO
                }
                break
              case 4:
                break
              default:
                break
            }
            return h('div', [
              h('Button', {
                props: { type: 'primary', size: 'small' },
                style: { marginRight: '10px' },
                on: {
                  click: status === 2
                    ? () => this.$router.push({ name: 'channelPartnerCheck', query: { id: params.row.id } })
                    : () => this.$router.push({ name: 'channelPartnerAdd', query: { id: params.row.id } })
                }
              }, status === 2 ? '查看' : '修改'),
              act && h('Button', {
                props: { type: type, size: 'small' },
                on: {
                  click: onclick
                }
              }, act)
            ])
          }
        }
      ],
      tableData: [
        // {
        //   id: 1,
        //   name: '合伙人A',
        //   address: '南京路一号',
        //   parentName: '任务A',
        //   mobile: '134343577',
        //   status: 4,
        //   createTime: '2018-01-02'
        // },
        // {
        //   id: 2,
        //   name: '合伙人A',
        //   address: '南京路一号',
        //   parentName: '任务A',
        //   mobile: '134343577',
        //   status: 1,
        //   createTime: '2018-01-02'
        // },
        // {
        //   id: 3,
        //   name: '合伙人A',
        //   address: '南京路一号',
        //   parentName: '任务A',
        //   mobile: '134343577',
        //   status: 2,
        //   createTime: '2018-01-02'
        // },
        // {
        //   id: 4,
        //   name: '合伙人A',
        //   address: '南京路一号',
        //   parentName: '任务A',
        //   mobile: '134343577',
        //   status: 3,
        //   createTime: '2018-01-02'
        // }
      ],
      provinceList: [], // 省列表
      cityList: [], // 市列表
      areaList: [] // 区列表
    }
  },
  created() {
    this.getPartnerList()
    // this._getProvinceInfo()
  },
  methods: {
    addPartner() {
      this.$router.push({ name: 'channelPartnerAdd' })
    },
    changePage(page) {
      this.pager.pageNum = page
      this.getPartnerList()
    },
    changePageSize(size) {
      this.pager.pageSize = size
      this.getPartnerList()
    },
    getPartnerList() {
      let query = Object.assign({}, this.searchForm, this.pager, {
        createTime: formatDate(this.createTime[0], 'yyyy-MM-dd hh:mm:ss'),
        endTime: formatDate(this.createTime[1], 'yyyy-MM-dd hh:mm:ss')
      })
      getPartnerList(query).then(res => {
        this.tableData = res.data.list
        this.pager.totalCounts = res.data.total
      })
    }
    // changeProvince(value) {
    //   console.log(value)
    //   if (!value) return
    //   this.searchForm.city = ''
    //   this.searchForm.distric = ''
    //   var pid = this.provinceList.find(item => item.identity === value).id
    //   return getCityInfo(pid).then(res => (this.cityList = res))
    // },
    // changeCity(value) {
    //   if (!value) return
    //   this.searchForm.distric = ''
    //   let pid = this.cityList.find(item => item.identity === value).id
    //   return getAreaInfo(pid).then(res => (this.areaList = res))
    // },
    // _getProvinceInfo() {
    //   getProvinceInfo().then(res => (this.provinceList = res))
    // }
  }
}
</script>
