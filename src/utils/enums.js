export const setIdName = (obj, nameField, enumList, idValue, idField) => {
  const val = idValue.toString(), it = enumList.filter(t => t.value == val)[0];
  if (!it) return;
  obj[nameField] = it.name;
  nameField && (obj[idField] = idValue);
};


export const enumEnableStatus = [{
  name: "启用", value: "1"
}, {
  name: "禁用", value: "0"
}];
export const enumYesNo = [{
  name: "否", value: "0"
}, {
  name: "是", value: "1"
}];
export const enumPublishStatus = [{
  name: "未发布", value: "0"
}, {
  name: "已发布", value: "1"
}];
export const enumPayType = [{
  name: "未知", value: "0"
}, {
  name: "支付宝", value: "1"
}, {
  name: "微信", value: "2"
}, {
  name: "爱心值", value: "3"
}, {
  name: "贡献值", value: "4"
}];
export const enumAuthStatus = [{
  name: "已申请", value: "0"
}, {
  name: "已通过", value: "1"
}, {
  name: "已驳回", value: "2"
}];

export const enumMemberRealAuthStatus = [{
  name: "未实名", value: "0"
}, {
  name: "已申请", value: "1"
}, {
  name: "已驳回", value: "2"
}, {
  name: "已通过", value: "3"
}];
export const enumMoneyType = [{
  name: "爱心值", value: "0"
}, {
  name: "贡献值", value: "1"
}];
export const enumWithdrawalsStatus = [{
  name: "未打款", value: "0"
}, {
  name: "已打款", value: "1"
}, {
  name: "已作废", value: "2"
}];

export const enumProjectProgressStatus = [{
  name: "未开始", value: "0"
}, {
  name: "筹款中", value: "1"
}, {
  name: "已结束", value: "2"
}];


export const enumMoneySourceType = [{
  name: "充值", value: "0"
}, {
  name: "提现", value: "1"
}, {
  name: "转入", value: "2"
}, {
  name: "转出", value: "3"
}, {
  name: "捐赠", value: "4"
}, {
  name: "购买", value: "5"
}, {
  name: "分红", value: "6"
}, {
  name: "提现驳回", value: "7"
}];

export const enumRechargeStatus = [{
  name: "未到账", value: "0"
}, {
  name: "已到账", value: "1"
}, {
  name: "已作废", value: "2"
}];

export const enumNotice = [{
  name: "通知", value: "1"
}, {
  name: "公告", value: "2"
}];

export const enumGender = [{
  name: "未知", value: "0"
}, {
  name: "男", value: "1"
}, {
  name: "女", value: "2"
}];

export const enumMemberTitle = [{
  name: "公民", value: "1"
}, {
  name: "志愿者", value: "2"
}, {
  name: "社工", value: "3"
}, {
  name: "退役社工", value: "4"
}, {
  name: "站长", value: "5"
}, {
  name: "区域站长", value: "6"
}];

export const enumMemberMTitle = [{
  name: "无岗位", value: "0"
}, {
  name: "站长", value: "5"
}, {
  name: "区域站长", value: "6"
}];

export const enumMemberLevel = [{
  name: "P0", value: "0"
}, {
  name: "P1", value: "1"
}, {
  name: "P2", value: "2"
}, {
  name: "P3", value: "3"
}, {
  name: "P4", value: "4"
}, {
  name: "P5", value: "5"
}, {
  name: "P6", value: "6"
}, {
  name: "P7", value: "7"
}, {
  name: "P8", value: "8"
}, {
  name: "P9", value: "9"
}, {
  name: "P10", value: "10"
}, {
  name: "P11", value: "11"
}, {
  name: "P12", value: "12"
}, {
  name: "P13", value: "13"
}, {
  name: "P14", value: "14"
}, {
  name: "P15", value: "15"
}, {
  name: "P16", value: "16"
}, {
  name: "P17", value: "17"
}, {
  name: "P18", value: "18"
}, {
  name: "P19", value: "19"
}, {
  name: "P20", value: "20"
}, {
  name: "P21", value: "21"
}];


export const enumMessageStatus = [{
  name: "未读", value: "0"
}, {
  name: "已读", value: "1"
}];