export default {
  title: '分公司系统操作说明',
  section: [
    {
      title: '登录',
      content: '输入上下网总公司分配的账号密码，进行登录，一般会用您的手机号作为登录账号。首次登录，默认密码：123456。您可以登录后自行修改。',
      img: 'http://img.sxwhome.com/FmSPzpiwuNsHcpxShudwe31yWVXv?imageMogr2/format/jpg'
    },
    {
      title: '会员管理',
      content: '您在登录后，左边列表的第一个功能就是会员管理，这个会员的来源就是凡是通过上下网pos支付时输入手机号的用户即为会员。您可以所属的分公司会员信息。',
      img: 'http://img.sxwhome.com/FsllzLk3bwrad0reLe3KLKv4hnna?imageMogr2/format/jpg'
    },
    {
      title: '商户管理',
      content: '商户管理是一个专门用于管理了建立商户及门店的模块。您可以查看珊瑚名称、创建和更新时间，管理商户的营业状态。',
      img: 'http://img.sxwhome.com/Fht7JKZ_7dk8BPN79DpyNX8EWFbG?imageMogr2/format/jpg',
      children: [
        {
          type: 'subSection',
          title: '1、添加商户',
          content: '点击左上角的绿色按钮“添加商户“，选择商户类型。小微商户代表该商户没有工商信息。普通商户代表该商户有工商信息。',
          img: 'http://img.sxwhome.com/FqZ1zd376PpRJVa8lMvX_AINkg9O?imageMogr2/format/jpg'
        },

        {
          type: 'list',
          title: '选择“小微商户“。需要填写基本信息、法人信息、结算信息。',
          content: [
            '基本信息：商户名、商户简称、商家地址、经纬度、行业类别、经营类别、商户服务、商户简介、商户详情、门店lOGO、经营内容照、门头照、收银台照。',
            '法人信息：法人名称、法人身份证号、身份证有效期、法人联系电话、法人身份证正反面、法人手持身份证照。',
            '结算信息：账户类型默认对私、开户名、身份证号、身份证有效期、身份证正反面、银行卡正面、开户账户、开区地区、开户支行、预留手机、协议找、商户信息表。备注：同法人不需要填写开户名、身份证号、身份证正反面、身份证有效期。'
          ]
        },
        {
          type: 'list',
          title: '选择“普通商户“，商户类型选择：个体。需要填写基本信息、工商信息、法人信息、结算信息。',
          content: [
            '基本信息：商户名、商户简称、商家地址、行业类别、经营类型、经纬度、商户简介、商户服务、商户详情、经营内容照、门店LOGO、门头照、收银台照。',
            '工商信息：营业执照名称、营业执照图、营业执照号、营业执照有效期。',
            '法人信息：法人名称、法人身份证号、法人身份证正反面图、身份证有效期、法人联系电话。',
            `结算信息：账户类型对公，开户名、开户许可证、开户名、开户账户、开户地区、开户支行、协议照、预留手机、商户信息表。
                      账户类型对私且同法人，开户名、身份证号、身份证正反面、身份证有效期、开户账户、开户地区、开户支行、银行卡正反面、预留手机、商户信息照、协议照。
                      账户类型对私且不同法人，开户名、身份证号、身份证正反面、身份证有效期、开户账户、开户地区、开户支行、银行卡正反面、预留手机、商户信息照、授权结算书、协议照。`
          ]
        },

        {
          type: 'subSection',
          title: '2、添加账号信息',
          content: '选择新增的商户，点击账号信息下的“未添加“，进入账号绑定界面。需要填写登录手机号、选择所属的城市合伙人代理、选择所属的渠道合伙人代理、选择所属的业务员代理。'
        },

        {
          type: 'list',
          content: [
            '情况1，城市合伙人发展的商户，只需选择对应的城市合伙人。',
            '情况2，城市合伙人的业务员发展的商户，许选择对应的城市合伙人和对应的业务员。',
            '情况3，渠道合伙人发展的商户，需要选择发展该渠道合伙人的城市合伙人和发展该商户的渠道合伙人。',
            '情况4，渠道合伙人的业务员发展的商户，需要选择发展该商户的业务员，和业务员所属的渠道合伙人以及该渠道发展的城市合伙人。'
          ]
        },

        {
          type: 'content',
          content: [
            '查看：查看门店信息。',
            '停业：停止该商户门店登录上下网合伙人系统，以及门店的上下网POS机使用。'
          ],
          img: [
            'http://img.sxwhome.com/Fkgu8UJLxB8a180BBJVpta0E0RhK?imageMogr2/format/jpg',
            'http://img.sxwhome.com/FhBKtv2V2GLQg5RJB-OHkQtBDU5s?imageMogr2/format/jpg'
          ]
        },

        {
          type: 'subSection',
          title: '3、门店管理',
          content: [
            '添加门店功能只针对商户类型为“连锁店“的商户。在需要添加门店的商户信息中，点击“门店数”，进入该商户的门店管理。点击“添加门店”按钮，添加门店。',
            '添加门店需填写：门店商户名称、门店LOGO、门头照、收银台照、门店联系人、联系人邮箱、联系人电话、门店简介、门店详情、门店服务、营业时间、门店地区、门店地址、经纬度。'
          ]
        },

        {
          type: 'content',
          content: [
            '查看：查看该明天信息。',
            '停用：停止该门店登录到上下网合伙人系统，以及门店的上下网POS机使用。',
            '进件：对该门店进行进件操作。'
          ],
          img: [
            'http://img.sxwhome.com/Fkgu8UJLxB8a180BBJVpta0E0RhK?imageMogr2/format/jpg',
            'http://img.sxwhome.com/FsQB4-r35tXo_Cu1p7Ozaoe36KJo?imageMogr2/format/jpg'
          ]
        }
      ]
    },
    {
      title: '用户管理',
      content: '',
      children: [
        {
          type: 'subSection',
          title: '1. 城市合伙人',
          content: [
            '添加城市合伙人需要填写以下信息：用户名、合伙人名称、手机号、所在地、身份证号、法人身份证正反面、开户名、开户总行、开户支行、银行卡号、银行卡正面图。',
            '查看：查看该城市合伙人信息',
            '禁用：停止该城市合伙人登录到上下网合伙人系统'
          ]
        },
        {
          type: 'subSection',
          title: '2. 渠道合伙人',
          content: [
            '添加渠道合伙人需要填写以下信息：用户名、法人身份证、合伙人名称、手机号、所在地、所属城市合伙人、身份证号、开户名、开户总行、开户支行、银行卡号、银行卡正面。',
            '查看：查看该渠道合伙人信息。',
            '禁用：停止该渠道合伙人登录到上下网合伙人系统。'
          ],
          img: [
            'http://img.sxwhome.com/FgD7k1tE3JAN33Bhd-8b-kOcMSTp?imageMogr2/format/jpg',
            'http://img.sxwhome.com/FtShQcGiA6MdP9m20yspAl0vB-Fp?imageMogr2/format/jpg'
          ]
        },
        {
          type: 'subSection',
          title: '3. 业务员',
          content: [
            '添加业务员需要填写一下信息：隶属合伙人、业务员姓名、POS分润比例、业务员手机号。',
            '查看：查看业务员信息。',
            '禁用：禁止业务员登录到上下网合伙人系统。'
          ],
          img: [
            'http://img.sxwhome.com/FsTQ_CsXo7sqcELhYoxelQUchstL?imageMogr2/format/jpg',
            'http://img.sxwhome.com/FutBBKKu-C-xIteHbZ6ih8tcqepP?imageMogr2/format/jpg'
          ]
        }
      ]
    },
    {
      title: '机具管理',
      content: '',
      children: [
        {
          type: 'subSection',
          title: '1. 商户进件',
          content: [
            '新增进件，需要选择商户和门店（商户和门店信息来源于商户管理）。',
            '需要确认账户类型、商户小票名称、购买政策、借记卡费率、封顶金额、贷记卡费率、扫码基准费率、银联二维码费率、银联二维码标准费率、上传协议照、上传商户信息表。'
          ]
        },

        {
          type: 'list',
          content: [
            '情况1，账号类型为对公：输入开户名、开户支行、银行卡号、开户许可证',
            '情况2，账号类型为对私且是同法人：输入银行卡号、银行卡正面',
            '情况3，账号类型为对私且非同法人：输入结算人姓名、结算人身份证号、结算人身份证有效期、结算人身份证正反面、开户名、开户支行、开户银行卡号、授权结算书，银行卡正面照。'
          ]
        },

        {
          type: 'content',
          content: [
            '查看：查看进件信息',
            '编辑：对进件失败的进件信息进行修改并重新提交进件',
            '审核详情：查看进件审核不通过的原因',
            '激活：对已进件成功的商户资料和POS机进行绑定，需要填写：CSN号、激活码、终端号。'
          ],
          img: [
            'http://img.sxwhome.com/FrmnAEm2-l7kbiiGdsmoislybGcd?imageMogr2/format/jpg',
            'http://img.sxwhome.com/FoeqFsoUfDEg1q2LIBT2eDHFQvwL?imageMogr2/format/jpg',
            'http://img.sxwhome.com/FtoYxH5lKeAeOkAea9qj50d4Kglx?imageMogr2/format/jpg'
          ]
        },

        {
          type: 'subSection',
          title: '2. 终端列表',
          content: [
            '展示所有已进件成功的POS机，可用于查看POS机的使用状态。',
            '购买政策：表明POS机的购买政策',
            '是否达标：表明该 购买政策下，这台POS的流水是否达到政策的标准',
            '是否转正：表明该POS是否满足转正条件',
            '进件人：表明该POS的进件人员是谁'
          ],
          img: [
            'http://img.sxwhome.com/Fh4P4b8FnA1M4_SFM4pGRx4vl26-?imageMogr2/format/jpg'
          ]
        }
      ]
    },
    {
      title: '财务管理',
      content: '',
      children: [
        {
          type: 'subSection',
          title: '1. 代理结算',
          content: [
            '可查看城市合伙人和渠道合伙人的月结算单，每月最后一天23：59：59生成。可查看结算金额，审核票据等',
            '审核：审核合伙人的结算票据信息，审核通过可以打款，审核不通过，等待合伙人重新修改票据信息',
            '打款：对已审核通过的票据信息，将打款信息上传。合伙人能看到打款信息。'
          ],
          img: [
            'http://img.sxwhome.com/FlGhsGYB8SmQ6_PyXDEi_2i3SRj3?imageMogr2/format/jpg'
          ]
        },
        {
          type: 'subSection',
          title: '2. 交易记录',
          content: [
            '查看分公司下，所有的商户的所有POS的交易数据。'
          ],
          img: [
            'http://img.sxwhome.com/FuCNfJy67IoaEN9pDq5et975S1CT?imageMogr2/format/jpg'
          ]
        }
      ]
    },
    {
      title: '修改密码',
      content: [
        '通过原密码修改登录密码。',
        '账号的初始密码为：123456。为使用安全可进行密码修改。'
      ],
      img: [
        'http://img.sxwhome.com/FkZ_7_alhPqBHyn38CRCovuronYB?imageMogr2/format/jpg'
      ]
    },
    {
      title: '银行管理',
      content: [
        '管理员登录上下网分公司运营平台，点击银行卡活动模块，选择银行管理页面，点击新建按钮，如下图所示：',
        '按提示填写必填信息，点击提交，即可创建一个银行登录账号，可用于登录银行智能营销平台。登录默认密码为123456。'
      ],
      img: 'http://img.sxwhome.com/FjP4IiX49etDKt6xkTcBOusq96QV?imageMogr2/format/jpg'
    },
    {
      title: '门店管理',
      content: '',
      children: [
        {
          type: 'subSection',
          title: '添加门店',
          content: [
            '对银行进行授权门店信息，授权成功之后，银行可以在活动创建时在授权门店',
            '列表中选择参加活动的门店。',
            '添加门店有两种方式：',
            '1、进入门店管理页面，如图',
            '点击新增按钮，弹出新增门店页面，填写完必填信息，点击保存银行和门店绑定完成。'
          ],
          img: [
            'http://img.sxwhome.com/FunDSfPovtKb4NgMRQBplABSEiWY?imageMogr2/format/jpg'
          ]
        },
        {
          type: 'content',
          content: [
            '2、批量新增门店。',
            '点击导出模板，所有字段必填，填写完毕再点击批量导入按钮。',
            '注意：活动审核通过之后，门店与银行绑定信息系统自行清除。'
          ]
        }
      ]
    },
    {
      title: '活动管理',
      content: [
        '可以查看所有银行添加的活动信息，并对活动设置补贴信息。'
      ],
      children: [
        {
          type: 'subSection',
          title: '查看活动详情',
          content: [
            '进入活动管理页面，点击详情，页面跳转至活动详情页。'
          ],
          img: 'http://img.sxwhome.com/FrGLQv_yw2jS1fcl_rdxiUIwu-DF?imageMogr2/format/jpg'
        },
        {
          type: 'subSection',
          title: '设置门店补贴',
          content: [
            '点击银行卡活动模块，选择活动管理页面。',
            '选择活动状态为已上线或活动中的活动（最佳设置状态为已上线的活动），点击佣金按钮，如下图所示：'
          ],
          img: 'http://img.sxwhome.com/Fun195tJDY5vK8-ahT5No0suufSF?imageMogr2/format/jpg'
        },
        {
          type: 'content',
          content: [
            '填写每个门店可获得的补贴比例，默认值为0%。',
            '门店获得补贴是指持卡人获得优惠金额，门店结算后可以从中获得的补贴比例。'
          ]
        }
      ]
    },
    {
      title: '交易列表',
      content: '',
      children: [
        {
          type: 'content',
          content: [
            '点击菜单：交易管理-交易列表',
            '展示所有成功参与营销活动的交易记录。',
            '如下图所示：'
          ],
          img: 'http://img.sxwhome.com/FgLawmdNoUYU16ZJWWjp5lcxOgsX?imageMogr2/format/jpg'
        },
        {
          type: 'list',
          content: [
            '支付金额：持卡人实际支付金额。',
            '银行补贴：银行应发放的补贴金额。',
            '门店获得补贴：门店可以获得的补贴金额。',
            '总金额：交易总金额，为商户输入pos的金额。'
          ]
        }
      ]
    },
    {
      title: '活动对账',
      content: '',
      children: [
        {
          type: 'content',
          content: [
            '点击菜单：交易管理-活动对账',
            '账单生成规则：在次月1号生成上个月的活动交易总额，以活动为单位，有多个活动就会有多个账单。',
            '如下图所示：'
          ],
          img: 'http://img.sxwhome.com/Fu8xG9vgacMjzw87i29XRT6-Ab8m?imageMogr2/format/jpg'
        },
        {
          type: 'content',
          content: [
            '下拉框可以选择银行对账单或商户对账单。默认展示银行对账单。',
            '选择一条记录，点击下载按钮，系统会自动下载Excel文档，内容为上个月该活动所有交易记录。'
          ]
        }
      ]
    }
  ]
}
