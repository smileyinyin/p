<template>
  <div>
    <bread-crumb :data="[
      {path: '/partnerList', title: '直属渠道合伙人管理'},
      {title: title}
    ]"></bread-crumb>

    <Card>
      <Form :label-width="120">
        <Row :gutter="20">
          <i-col span="12">
            <formItem label="合伙人名称">
              {{ partner.name }}
            </formItem>
            <formItem label="合伙人手机号">
              {{ partner.mobile }}
            </formItem>
            <formItem label="联系地址">
              {{ partner.address }}
            </formItem>
            <formItem label="身份证号">{{ partner.identity_card }}</formItem>
            <formItem label="开户名">{{ partner.account_name }}</formItem>
            <formItem label="开户总行">{{ partner.bank_name }}</formItem>
            <formItem label="开户支行">{{ partner.bank_branch_name }}</formItem>
            <formItem label="银行卡号">{{ partner.bank_front_number }}</formItem>
          </i-col>
          <i-col span="12">
            <!-- <formItem label="合伙人类型">
              {{ partner.roleName }}
            </formItem> -->
            <formItem label="POS分润比例">
              {{ partner.posRate }}
            </formItem>
            <formItem label="商户商品分润比例">
              {{ partner.goodsRate }}
            </formItem>
            <formItem label="供应链商品分润比例">
              {{ partner.online_profit_rate }}
            </formItem>
            <formItem label="添加时间">
              {{ formatCreateTime }}
            </formItem>
            <formItem label="身份证照">
              <upload-img v-if="frontImg" viewOnly v-model="frontImg"></upload-img>
              <upload-img v-if="backImg" viewOnly v-model="backImg"></upload-img>
            </formItem>
            <formItem label="银行卡正面图">
              <upload-img v-if="bankFrontImg" viewOnly v-model="bankFrontImg"></upload-img>
            </formItem>
          </i-col>
        </Row>
        <!-- <formItem label="允许提现">
          {{ partner.settleType === 2 ? '允许提现' : '不允许提现' }}
        </formItem> -->

        <!-- <formItem label="更新时间">
          {{ formatUpdateTime }}
        </formItem> -->
      </Form>
    </Card>
    <Row type="flex" justify="end" class="mt30 ml30 mr30">
      <Button v-if="partner.status === 3" type="success" class="w120" @click="active(2)">启用</Button>
      <Button v-else-if="partner.status === 2" type="error" class="w120" @click="active(3)">禁用</Button>
      <template v-else-if="partner.status === 1">
        <Button type="success" class="w120 mr20" @click="active(2)">审核通过</Button>
        <Button type="error" class="w120" @click="active(4)">审核不通过</Button>
      </template>
      <template v-else-if="partner.status === 4">
        <Button type="primary" class="w120" @click="update">修改业务员信息</Button>
        <!-- <Button type="error" style="width:200px" @click="del">删除合伙人信息</Button> -->
      </template>
    </Row>
  </div>
</template>

<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import uploadImg from '_c/uploadImg/uploadImg'
import { getPartnerInfo, activePartner } from '@/api/partner'
import { formatDate } from '@/libs/util'

export default {
  name: 'channelPartnerCheckDirectly',
  data() {
    return {
      partner: {
        id: '',
        name: '',
        roleName: '',
        mobile: '',
        address: '',
        posRate: '',
        goodsRate: '',
        online_profit_rate: '',
        settleType: 2,
        status: 1,
        createTime: '',
        // updatTime: ''
        bank_front_img: '',
        account_name: '',
        bank_branch_name: '',
        bank_front_number: '',
        bank_name: '',
        identity_back_img: '',
        identity_front_img: '',
        identity_card: ''
      }
    }
  },
  created() {
    let id = this.$route.query.id
    this.partner.id = id
    this._getInfo(id)
  },
  computed: {
    bankFrontImg() {
      if (this.partner.bank_front_img) {
        return [{ url: this.partner.bank_front_img }]
      }
      return null
    },
    frontImg() {
      if (this.partner.identity_front_img) {
        return [{ url: this.partner.identity_front_img }]
      }
      return null
    },
    backImg() {
      if (this.partner.identity_back_img) {
        return [{ url: this.partner.identity_back_img }]
      }
      return null
    },
    title() {
      let status = this.partner.status
      if (status === 1) {
        return '合伙人审核'
      } else {
        return '合伙人详情'
      }
    },
    formatCreateTime() {
      if (!this.partner.createTime) {
        return ''
      }
      return formatDate(new Date(this.partner.createTime), 'yyyy年MM月dd日 hh:mm:ss')
    },
    formatUpdateTime() {
      if (!this.partner.updatTime) {
        return ''
      }
      return formatDate(new Date(this.partner.updatTime), 'yyyy年MM月dd日 hh:mm:ss')
    }
  },
  methods: {
    active(status) {
      activePartner({ status, id: this.partner.id }).then(res => this.$router.push({ name: 'channelPartnerList' }))
    },
    update() {
      this.$router.push({ name: 'channelPartnerAdd', query: { id: this.partner.id } })
    },
    del() {},
    _getInfo(id) {
      getPartnerInfo({ id }).then(res => {
        let data = res.data
        this.partner.status = data.status
        this.partner.name = data.username
        this.partner.roleName = data.roleName
        this.partner.mobile = data.mobile
        this.partner.address = data.province + data.city + data.district
        this.partner.posRate = data.pos_profit_rate
        this.partner.goodsRate = data.offline_profit_rate
        this.partner.online_profit_rate = data.online_profit_rate
        this.partner.createTime = data.time

        this.partner.bank_front_img = data.bank_front_img
        this.partner.account_name = data.account_name
        this.partner.bank_branch_name = data.bank_branch_name
        this.partner.bank_front_number = data.bank_front_number
        this.partner.bank_name = data.bank_name
        this.partner.identity_back_img = data.identity_back_img
        this.partner.identity_front_img = data.identity_front_img
        this.partner.identity_card = data.identity_card
      })
    }
  },
  components: { breadCrumb, uploadImg }
}
</script>
