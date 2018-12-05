<template>
  <div>
    <h3 style="margin-bottom: 10px">业务员详情</h3>

    <Card>
      <Form :label-width="120">
        <formItem label="业务员名称">{{ salesMan.partnerName }}</formItem>
        <formItem label="所属合伙人">{{ salesMan.parentName }}</formItem>
        <formItem label="手机号">{{ salesMan.mobile }}</formItem>
        <!-- <formItem label="隶属合伙人">{{ salesMan.parentId }}</formItem> -->
        <!-- <formItem label="联系地址">{{ salesMan.address }}</formItem> -->
        <!-- <formItem label="允许提现">{{ salesMan.settleType === 2 ? '允许提现' : '不允许提现' }}
        </formItem> -->
        <formItem label="POS分润比例">{{ salesMan.posProfitRate }}</formItem>
        <!-- <formItem label="商户商品分润比例">{{ salesMan.goodsRate }}</formItem> -->
        <!-- <formItem label="供应链商品分润比例">{{ salesMan.name }}
        </formItem> -->
        <!-- <formItem label="添加时间">{{ formatCreateTime }}</formItem>
        <formItem label="更新时间">{{ formatUpdateTime }}</formItem> -->
      </Form>
      <!-- <Row type="flex" justify="end">
        <Button v-if="salesMan.status === 3" type="primary" style="width:200px" @click="active(2)">启用</Button>
        <Button v-else-if="salesMan.status === 2" type="primary" style="width:200px" @click="active(3)">禁用</Button>
        <template v-else-if="salesMan.status === 1">
          <Button type="primary" style="width:200px" @click="active(2)">审核通过</Button>
          <Button type="error" style="width:200px" @click="active(4)">审核不通过</Button>
        </template>
        <template v-else-if="salesMan.status === 4">
          <Button type="primary" style="width:200px" @click="update">修改业务员信息</Button>
        </template>
      </Row> -->
    </Card>
  </div>
</template>

<script>
import { getPartnerInfo } from '@/api/partner'
// import { formatDate } from '@/libs/util'

export default {
  name: 'salesManCheck',
  data() {
    return {
      salesMan: {
        id: '',
        username: '',
        partnerName: '',
        mobile: '',
        parentId: '',
        posProfitRate: '',
        settleType: 2,
        status: 1
      }
    }
  },
  created() {
    let id = this.$route.query.id
    this.salesMan.id = id
    this._getInfo(id)
  },
  computed: {
    // formatCreateTime() {
    //   if (!this.salesMan.createTime) {
    //     return ''
    //   }
    //   return formatDate(new Date(this.salesMan.createTime), 'yyyy年MM月dd日 hh:mm:ss')
    // },
    // formatUpdateTime() {
    //   if (!this.salesMan.updatTime) {
    //     return ''
    //   }
    //   return formatDate(new Date(this.salesMan.updatTime), 'yyyy年MM月dd日 hh:mm:ss')
    // }
  },
  methods: {
    // active(status) {
    //   activeSalesMan({ status, id: this.salesMan.id }).then(res => this.$router.push({ name: 'salesManList' }))
    // },
    update() {
      this.$router.push({ name: 'salesManAdd', query: { id: this.salesMan.id } })
    },
    del() {},
    _getInfo(id) {
      getPartnerInfo({ id }).then(res => {
        let data = res.data
        this.salesMan.username = data.username
        this.salesMan.partnerName = data.partnerName
        this.salesMan.parentName = data.parentName
        this.salesMan.mobile = data.mobile
        // this.salesMan.parentId = data.parentId
        this.salesMan.posProfitRate = data.posProfitRate
      })
    }
  }
}
</script>
