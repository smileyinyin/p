<template>
  <!-- <div>门店列表 {{ $route.params.id }}</div> -->
  <div class="store-list">
    <bread-crumb :data="[
      {path: '/merchantList', title: '商户管理'},
      {title: '门店管理'}
    ]"></bread-crumb>

    <Card>
      <Button type="primary" @click="addStore" icon="plus" class="btn-add mb20" v-if="merchant && merchant.mold !== 0">新增门店</Button>
      <Table border :columns="columns" :data="tableData"></Table>
      <Row type="flex" justify="end" align="middle" class="mt10">
        <Page :total="pager.totalCounts" show-sizer
              :page-size="pager.pageSize" :current.sync="pager.currentPage"
              @on-change="getStoreList"
              @on-page-size-change="changePageSize"
        > </Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import { mapMutations } from 'vuex'/* eslint-disable */
import { getStoreList, getStoresActive } from '@/api/merchant'

export default {
  name: 'storeList',
  data() {
    return {
      merchant: '', // 所属的商户对象
      pager: {
        pageSize: 20,
        currentPage: 1,
        totalCounts: 0
      },
      columns: [
        {
          title: '门店ID',
          key: 'id'
        },
        {
          title: '门店名称',
          key: 'name'
        },
        {
          title: '门店地址',
          key: 'addressDetail'
        },
        {
          title: '门店电话',
          key: 'storesTelephone'
        },
        {
          title: '商品数',
          key: 'goodsNumber',
          render: (h, params) => {
            return h(
              'span',
              {
                // class: 'link',
                on: {
                  click: () => this.goStoreList(params.row)
                }
              },
              params.row.goodsNumber
            )
          }
        },
        {
          title: '会员数目',
          key: 'memberNumber',
          render: (h, params) => {
            return h(
              'span',
              {
                // class: 'link',
                on: {
                  click: () => this.goMemberList(params.row)
                }
              },
              params.row.memberNumber
            )
          }
        },
        {
          title: 'POS数目',
          key: 'posNumber',
          render: (h, params) => {
            return h(
              'span',
              {
                // class: 'link',
                on: {
                  click: () => this.goPosList(params.row)
                }
              },
              params.row.posNumber
            )
          }
        },
        {
          title: '状态',
          key: 'status', // 1启用  2 停用
          render: (h, params) => {
            return h('span', null, params.row.status === 1 ? '启用' : '停用')
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          render: (h, params) => {
            var status = params.row.status
            var btn = [
              h(
                'Button',
                {
                  props: { size: 'small', type: 'info' },
                  style: { marginRight: '5px' },
                  on: {
                    click: () => {
                      this.setStore(params.row)
                      this.$router.push({ name: 'storeAdd' })
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: { type: status === 2 ? 'primary' : 'error', size: 'small' },
                  style: { marginRight: '5px' },
                  on: {
                    click: () => {
                      this.useOrStop(params.row.id, status)
                    }
                  }
                },
                status === 2 ? '启用' : '停用'
              ),
              // h(
              //   'Button',
              //   {
              //     props: { type: 'warning', size: 'small' },
              //     style: { marginRight: '5px' },
              //     on: {
              //       click: () => {
              //         this.setStore(params.row)
              //         this.$router.push({ name: 'storeAdd' })
              //       }
              //     }
              //   },
              //   '修改'
              // ),
              h(
                'Button',
                {
                  props: { type: 'success', size: 'small' },
                  style: { marginRight: '5px' },
                  on: {
                    click: () => {
                      this.$router.push({ name: 'posList', params: { fromStore: true } })
                    }
                  }
                },
                '进件'
              )
            ]
            return h('div', btn)
          }
        }
      ],
      tableData: []
    }
  },
  created() {
    this.merchant = this.$store.state.merchant.merchant
    if (!this.merchant) {
      this.$router.replace({ name: 'merchantList' })
      return
    }
    this.getStoreList()
  },
  methods: {
    ...mapMutations([
      'setStore'
    ]),
    addStore() {
      this.setStore(null)
      this.$router.push({ name: 'storeAdd' })
    },
    getStoreList() {
      let query = Object.assign({}, this.pager, { merchantId: this.merchant.id })
      getStoreList(query).then(res => {
        this.tableData = res.data
        this.pager.totalCounts = res.totalCounts
      })
    },
    useOrStop(makertId, marketStatus) {
      // TODO
      this.$Notice.info({
        title: '暂不支持',
        desc: '<p>暂不支持此功能，敬请期待:)</p><br/>'
      })
      // TODO
      // if (marketStatus === 1) {
      //   console.log('即将 停用。。。')
      //   this.$Modal.confirm({
      //     title: '确认停用',
      //     content: '<p>确定要停用吗？</p><br/>',
      //     onOk: () => {
      //       getStoresActive({ makertId, marketStatus: 2 }).then(res => {
      //         this.getStoreList()
      //       })
      //     }
      //   })
      // } else if (marketStatus === 2) {
      //   this.$Modal.confirm({
      //     title: '确认启用',
      //     content: '<p>确定要启用吗？</p><br/>',
      //     onOk: () => {
      //       getStoresActive({ makertId, marketStatus: 1 }).then(res => {
      //         this.getStoreList()
      //       })
      //     }
      //   })
      //   console.log('即将 启用。。。')
      // }
    },
    goStoreList() {},
    goMemberList() {},
    goPosList() {},
    changePageSize(size) {
      this.pager.size = size
      this.getStoreList()
    }
  },
  components: { breadCrumb }
}
</script>

<style lang="less" scoped>
.store-list {
  /deep/ .link {
    padding: 5px;
    cursor: pointer;
    color: #2d8cf0;
  }
}
</style>
