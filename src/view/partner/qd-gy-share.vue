
<template>
     <div class="settle">
        <Card>
        <p slot="title">
        合伙人分润
        </p>
      <div>
        <div style="width:100%">
          <div class="tr">
             <Input  placeholder="请输入交易流水号" style="width: 120px" v-model="orderSonUuid" clearable/>
           <Input  placeholder="请输入合伙人" style="width: 120px;margin-left:10px;" v-model="userName" clearable/>
           <Input  placeholder="请输入合伙人类型" style="width: 120px;margin-left:10px;" v-model="roleName" clearable/>
            <!-- <Select clearable style="width:100px;margin-left:10px;" v-model="status">
                            <Option value="0" key="0">城市合伙人</Option>
                            <Option value="1" key="1">渠道合伙人  </Option>
             </Select> -->
           <Input placeholder="请输入商家名称" style="width:120px;margin-left:10px;" v-model="storeName" clearable/>
           <Input placeholder="请输会员手机号" style="width:120px;margin-left:10px;" v-model="mobile" clearable/>
           <Input placeholder="请输商品名称" style="width:120px;margin-left:10px;" v-model="goodsName" clearable/>
            <label style="margin-left:10px">
                        <DatePicker  type="daterange" placement="bottom-end" placeholder="请选择核销时间" style="width:  120px; " v-model="date"></DatePicker>
                          </label>

             <Button type="primary"
             icon="search" @click="getAll" style="margin-left:10px">
                        查询
              </Button>
          </div>

          </div>
               <div class="tr" style="margin-top:20px;">
                 <Table  :columns="params" :data="data" stripe border></Table>
                 <br>
                  <Page :total="totalCounts" show-sizer
              :page-size="pageSize" :current.sync="currentPage"
              @on-change="getpage"
              @on-page-size-change="changePageSize"
        > </Page>
                </div>

      </div>

        </Card>
       </div>
</template>
<script>
import { findProfitByRole } from '@/api/jy-water'
import { formatDate } from '@/libs/util'
export default {
  name: 'settle',
  data() {
    return {
      // 订单号
      orderSonUuid: '',
      // 渠道合伙人
      userName: '',
      // 商家名称
      storeName: '',
      // 会员手机号
      mobile: '',
      // 商品名称
      goodsName: '',
      // 合伙人类型
      roleName: '',
      currentPage: 1,
      pageSize: 20,
      totalCounts: 0,
      date: '',
      params: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '订单号',
          key: 'order_son_uuid'
        },
        {
          title: '合伙人名称',
          key: 'userName'
        },
        {
          title: '合伙人类型',
          key: 'roleName'
        },
        {
          title: '供应商',
          key: 'goods_name'
        },

        {
          title: '会员手机号',
          key: 'mobile'
        },
        {
          title: '商品',
          key: 'storeName'
        },
        {
          title: '商品数',
          key: 'number'
        },
        {
          title: '应收',
          key: 'deal_price'
        },
        {
          title: '实收',
          key: 'real_price'
        },
        {
          title: '利润',
          key: 'total_profit'
        },
        {
          title: '返利',
          key: 'profit'
        },
        {
          title: '核销时间',
          key: 'create_time',
          render: (h, params) => {
            return h(
              'span',
              null,
              formatDate(
                new Date(params.row.create_time),
                'yyyy-MM-dd hh:mm:ss'
              )
            )
          }
        }
      ],
      data: []
    }
  },
  created() {
    this.getAll()
    // this.updataArray()
  },
  methods: {
    getpage(page) {
      this.currentPage = page
      this.getAll()
    },
    changePageSize(size) {
      this.pageSize = size
      this.getAll()
    },
    getAll() {
      let that = this
      let starttime = formatDate(this.date[0], 'yyyy-MM-dd hh:mm:ss')
      let endtime = formatDate(this.date[1], 'yyyy-MM-dd hh:mm:ss')
      findProfitByRole({
        type: 2,
        merchatType: 0,
        // userId: 2,
        roleId: 1,
        // 订单号
        order_son_uuid: this.order_son_uuid,
        // 渠道合伙人
        userName: this.userName,
        // 商家名称
        storeName: this.storeName,
        // 会员手机号
        mobile: this.mobile,
        // 商品名称
        name: this.name,
        // 合伙人类型
        roleName: this.roleName,
        startTime: starttime,
        endTime: endtime,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data) {
          that.data = res.data.list
          that.totalCounts = res.data.total
        } else {
          that.data = []
          that.totalCounts = 0
        }
        // that.updateArray()
      })
    }
    // updateArray() {
    //   this.data.forEach(item => {
    //     if (item.status === 0) {
    //       item.chstatus = '城市合伙人'
    //     } else if (item.status === 1) {
    //       item.chstatus = '渠道合伙人'
    //     }
    //   })
    // }
  }
}
</script>
