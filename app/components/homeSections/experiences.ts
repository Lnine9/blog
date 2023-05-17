export type Experience = {
  date: string;
  title: string;
  desc?: string;
  img: string;
};

export const experiences: Experience[] = [
  {
    date: "2020/09",
    title: "大学",
    img: "/LOGO_LARGE_LIGHT.png",
    desc: "初入大学，选择了喜欢的专业，虽然生活并不是多么丰富多彩，但三年里学到了许多东西。",
  },
  {
    date: "2021/06",
    title: "团队",
    img: "/LOGO_LARGE_DARK.png",
    desc: "进入鹰眼团队实验室，并参与项目开发。生活开始忙碌但充实，学到了许多技术，了解到软件开发的流程。",
  },
  {
    date: "2022/05",
    title: "玉玉",
    img: "/LOGO_LARGE_LIGHT.png",
    desc: "持续久坐学习与工作导致腰伤，卧床几个月，抑郁了许久。持续疼痛近一年，无法正常生活、学习。人生最低谷",
  },
  {
    date: "2022/08",
    title: "坚持",
    img: "/LOGO_LARGE_DARK.png",
    desc: "同时负责两个项目，带着伤病在宿舍趴着工作，虽然疼痛但却是最充实的时光。两个月的坚持，顺利完成项目交接。",
  },
  {
    date: "2023/05",
    title: "转变",
    img: "/LOGO_LARGE_LIGHT.png",
    desc: "伤病后人生观念转变了许多，健康才是一切。一年的时间里坚持锻炼、自律生活，伤病稳定了许多，精神状态比之前更好了。",
  },
];
