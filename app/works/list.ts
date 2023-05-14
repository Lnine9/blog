export type Item = {
  title: string;
  description?: string;
  path: string;
  img?: string;
};

export const DOCS: Item[] = [
  {
    title: "重庆市智慧市政设施信息管理系统",
    path: "zhsz",
    description:
      "react + ts + antd + echarts（web端）| springboot + eureka + feign + mybatisplus（后端）",
    img: "https://cdn.lnine9.icu/images/zhsz/1683898260402.jpg?imageView2/0/interlace/1/q/50|imageslim",
  },
  {
    title: "人多多油卡话费销售管理系统",
    path: "rdd",
    description:
      "vue2 + vuex + axios （web端）| springboot + mybatis + mysql（后端）",
    img: "https://cdn.lnine9.icu/images/rdd/cover.png?imageView2/0/interlace/1/q/50|imageslim",
  },
  {
    title: "采购数据挖掘分析整合系统项目",
    path: "spider",
    description: "python + scrapy + django + mysql",
    img: "https://cdn.lnine9.icu/images/spider/1683898002769.png?imageView2/0/interlace/1/q/50|imageslim",
  },
  {
    title: "大家采产品中心",
    path: "djc",
    description: "react + ts + styled-components + dva.js + easymock",
    img: "https://cdn.lnine9.icu/images/djc/1683896562982.jpg?imageView2/0/interlace/1/q/50|imageslim",
  },
  {
    title: "Dollars 实时聊天软件",
    path: "dollars",
    description: "react + antd + styled-components + axios + websocket",
    img: "https://cdn.lnine9.icu/images/dollars/1683896218485.jpg?imageView2/0/interlace/1/q/50|imageslim",
  },
  {
    title: "校园核酸检测助手",
    path: "yqm",
    description:
      "uniapp + vue（小程序端）| springboot + mybatis-plus + mysql（后端）",
    img: "https://cdn.lnine9.icu/images/yqm/cover.png?imageView2/0/interlace/1/q/50|imageslim",
  },
  {
    title: "重庆市地图",
    path: "ChongQingMap",
    description: "react-three-fiber",
    img: "https://cdn.lnine9.icu/components/ChongQingMap.png",
  },
];
