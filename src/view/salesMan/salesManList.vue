<template>
  <div>
    <h3 style="margin-bottom:10px">业务员管理</h3>

    <Card>
      <Row type="flex" :gutter="10" justify="space-between" class="mb20">
        <i-col style="flex:1">
          <Button type="primary" class="btn-add" @click="addSalesMan" icon="plus">添加业务员</Button>
        </i-col>
        <!-- <i-col span="8">
          <formItem label="业务员状态">
            <Select v-model="searchForm.status" clearable>
              <Option :value="1">待认证</Option>
              <Option :value="2">已激活</Option>
              <Option :value="3">已禁用</Option>
            </Select>
          </formItem>
        </i-col> -->
        <i-col>
          <Input v-model="searchForm.mobile" placeholder="输入业务员账号（手机号码）" clearable/>
        </i-col>
        <i-col>
          <Button type="success" @click="getPartnerList">查询</Button>
        </i-col>
      </Row>
      <Table :data="tableData" :columns="columns" border></Table>
      <Row type="flex" justify="end" style="margin-top: 20px">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.currentPage"
              @on-page-size-change="changePageSize" @on-change="changePage"
        > </Page>
      </Row>
    </Card>
  </div>
</template>

<script>/* eslint-disable */
import { getPartnerList, activePartner } from '@/api/partner'
import { formatDate } from '@/libs/util'

export default {
  name: 'salesManList',
  data() {
    return {
      searchForm: {
        mobile: '',
        status: '',
        roleId: 3
      },
      pager: {
        currentPage: 1,
        pageSize: 20,
        totalCounts: 0
      },
      columns: [
        {
          type: 'index',
          width: 60,
          title: '序号',
          align: 'center'
        },
        {
          title: '账号',
          key: 'mobile'
        },
        {
          title: '姓名',
          key: 'partnerName'
        },
        {
          title: '添加时间',
          key: 'time',
          render: (h, params) => {
            return h('span', null, formatDate(new Date(params.row.time), 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        // {
        //   title: '地址',
        //   key: 'address'
        // },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            let status = params.row.status
            let str = ''
            let color = ''
            switch (status) {
              case 1:
                str = '待审核'
                color = '#BFBFBF'
                break
              case 2:
                str = '已启用'
                color = '#0099FF'
                break
              case 3:
                str = '已禁用'
                color = '#FF0000'
                break
              case 4:
                str = '审核不通过'
                color = '#FF0000'
                break
              default:
                break
            }
            return h('span', [
              h('Icon', {
                props: { type: 'record' },
                style: { color: color }
              }),
              h('span', null, str)
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          render: (h, params) => {
            let status = params.row.status
            let str = ''
            let type = 'primary'
            if (status === 1) {
              // str = '审核'
            } else if (status === 2) {
              str = '禁用'
              type = 'error'
            } else if (status === 3) {
              str = '启用'
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: { marginRight: '5px' },
                on: {
                  click: () => { this.$router.push({ name: 'salesManCheck', query: { id: params.row.id } }) }
                }
              }, '查看'),
              params.row.status ===3&&h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => { // 编辑
                    this.eidt(params.row.id)
                  }
                }
              }, '编辑'),
              str && h('Button', {
                props: {
                  type: type,
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => { // 激活、禁用、审核
                    this.active(params.row)
                  }
                }
              }, str),
              false && h('Button', { // 删除先不做了
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tableData: [
        // {
        //   'id': 1,
        //   'mobile': 123,
        //   'name': '大牛A',
        //   'createTime': '2018-07-05',
        //   'address': '北京市海淀区西二旗',
        //   'status': 1
        // },
        // {
        //   'id': 2,
        //   'mobile': 123,
        //   'name': '大牛A',
        //   'createTime': '2018-07-05',
        //   'address': '上海市浦东新区世纪大道',
        //   'status': 2
        // },
        // {
        //   'id': 3,
        //   'mobile': 123,
        //   'name': '大牛A',
        //   'createTime': '2018-07-05',
        //   'address': '深圳市南山区深南大道',
        //   'status': 3
        // }
      ]
    }
  },
  created() {
    this.getPartnerList()
  },
  methods: {
    eidt(id) {
      this.$router.push({ name: 'salesManAdd', query: { id } })
    },
    active(row) {
      // if (row.status === 1) {
      //   this.$router.push({ name: 'salesManCheck', query: { id: row.id } })
      //   return
      // }
      // activePartner({ status: row.status === 2 ? 3 : 2, id: row.id }).then(res => {
      //   this.getPartnerList()
      // })
      // TODO
      this.$Notice.info({
        title: '暂不支持',
        desc: '<p>暂不支持此功能，敬请期待:)</p><br/>'
      })
      // TODO
    },
    remove(id) {
      deleteSalesMan({ id }).catch(err => console.log(err))
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
      let query = Object.assign({}, this.pager, this.searchForm)
      getPartnerList(query).then(res => {
        this.tableData = res.data.list
        this.pager.totalCounts = res.data.total
      })
    },
    addSalesMan() {
      this.$router.push({ name: 'salesManAdd' })
    }
  }
}
</script>
