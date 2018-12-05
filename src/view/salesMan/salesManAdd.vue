<template>
  <div>
    <h3 style="margin-bottom: 10px">{{ isEdit ? '业务员编辑' : '业务员添加' }}</h3>

    <Card>
      <divide-line placement="bottom" class="mb20">基础信息</divide-line>
      <salesMan-baseInfo
        ref="baseInfo"
        :baseInfo="baseInfo"></salesMan-baseInfo>
      <!-- <divide-line placement="bottom" class="mb20">结算信息</divide-line>
      <salesMan-settleInfo
        ref="settleInfo"
        :settleInfo="settleInfo"></salesMan-settleInfo> -->
    </Card>
    <!-- <Row type="flex" justify="end" class="mt30">
      <Button v-if="isEdit" @click="update" type="success" class="w120">确认修改</Button>
      <Button v-else @click="submit" type="success" class="w120">保存</Button>
    </Row> -->
  </div>
</template>

<script>
import divideLine from '_c/divideLine/divide-line'
import proCityArea from '_c/proCityArea'
import salesManBaseInfo from './components/salesManBaseInfo'
import salesManSettleInfo from './components/salesManSettleInfo'
// import { getSalesManInfo, addSalesMan, updateSalesMan } from '@/api/salesMan'

export default {
  name: 'salesManAdd',
  data() {
    return {
      isEdit: false,
      baseInfo: {}, // 业务员i基础信息
      settleInfo: {} // 结算信息
    }
  },
  created() {
    let id = this.$route.query.id
    if (id) {
      this.isEdit = true
      this.baseInfo.id = id
      // this._getSalesManInfo(id)
    }
    // this._getProvinceInfo()
  },
  methods: {
    // submit() {
    //   Promise.all([
    //     this.$refs['baseInfo'].submit(),
    //     this.$refs['settleInfo'].submit()
    //   ]).then(([baseInfo, settleInfo]) => {
    //     console.log(baseInfo, settleInfo)
    //   })
    //   false && addSalesMan(this.partner).then(res => this.$router.push({ name: 'salesManList' }))
    // },
    // update() {
    //   debugger
    //   false && updateSalesMan(this.partner).then(res => this.$router.push({ name: 'salesManList' }))
    // },
    // _getSalesManInfo(id) {
    //   getSalesManInfo({ id }).then(res => {
    //     console.log(res)
    //   })
    // }
  },
  components: {
    divideLine,
    proCityArea,
    salesManBaseInfo,
    salesManSettleInfo
  }
}
</script>
