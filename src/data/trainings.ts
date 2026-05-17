export interface Training {
  id: string;
  title: string;
  coverImage: string;
  organizer: string;
  category: string;
  targetAudience: string;
  location: string;
  mode: string;
  startDate: string;
  endDate: string;
  capacity: number;
  enrolled: number;
  price: number;
  status: string;
  description: string;
  schedule: { day: number; topic: string; speaker: string }[];
  requirements: string[];
  contact: {
    name: string;
    phone: string;
    email: string;
  };
}

export const trainings: Training[] = [
  {
    id: "train_001",
    title: "2024年春季高校教师研修班",
    coverImage: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    organizer: "清华大学继续教育学院",
    category: "教师培训",
    targetAudience: "高校教师",
    location: "北京市海淀区",
    mode: "线下",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    capacity: 50,
    enrolled: 35,
    price: 5000,
    status: "报名中",
    description: "本研修班旨在提升高校教师的专业能力和教学水平，邀请知名教育专家授课。",
    schedule: [
      { day: 1, topic: "开班典礼", speaker: "校领导" },
      { day: 2, topic: "现代教育理论", speaker: "王教授" },
      { day: 3, topic: "教学方法创新", speaker: "李教授" }
    ],
    requirements: ["高校在职教师", "本科及以上学历"],
    contact: {
      name: "张老师",
      phone: "010-12345678",
      email: "train@tsinghua.edu.cn"
    }
  },
  {
    id: "train_002",
    title: "人工智能师资培训班",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    organizer: "北京大学人工智能研究院",
    category: "技术培训",
    targetAudience: "计算机专业教师",
    location: "北京市海淀区",
    mode: "线下",
    startDate: "2024-04-10",
    endDate: "2024-04-25",
    capacity: 30,
    enrolled: 28,
    price: 8000,
    status: "报名中",
    description: "系统学习人工智能核心算法，培养AI教学能力。",
    schedule: [
      { day: 1, topic: "AI概论", speaker: "陈院士" },
      { day: 2, topic: "机器学习算法", speaker: "张教授" }
    ],
    requirements: ["计算机相关专业教师", "具备编程基础"],
    contact: {
      name: "刘老师",
      phone: "010-87654321",
      email: "ai@pku.edu.cn"
    }
  },
  {
    id: "train_003",
    title: "数字化教学能力提升计划",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    organizer: "复旦大学教师发展中心",
    category: "教学能力",
    targetAudience: "全体教师",
    location: "上海市杨浦区",
    mode: "线上+线下",
    startDate: "2024-05-01",
    endDate: "2024-05-20",
    capacity: 100,
    enrolled: 67,
    price: 3000,
    status: "报名中",
    description: "提升教师信息化教学能力，掌握数字化教学工具和方法。",
    schedule: [
      { day: 1, topic: "数字化教学概述", speaker: "孙教授" },
      { day: 2, topic: "在线教学平台使用", speaker: "周老师" }
    ],
    requirements: ["高校在职教师"],
    contact: {
      name: "王老师",
      phone: "021-12345678",
      email: "digital@fudan.edu.cn"
    }
  },
  {
    id: "train_004",
    title: "创新创业教育导师培训",
    coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    organizer: "上海交通大学创业学院",
    category: "创业指导",
    targetAudience: "创业导师",
    location: "上海市闵行区",
    mode: "线下",
    startDate: "2024-06-01",
    endDate: "2024-06-10",
    capacity: 40,
    enrolled: 25,
    price: 6000,
    status: "报名中",
    description: "培养创新创业导师，指导学生创业项目。",
    schedule: [
      { day: 1, topic: "创业教育理论", speaker: "刘教授" },
      { day: 2, topic: "项目指导方法", speaker: "徐老师" }
    ],
    requirements: ["有创业经验者优先", "具备指导学生能力"],
    contact: {
      name: "陈老师",
      phone: "021-87654321",
      email: "entrepreneur@sjtu.edu.cn"
    }
  },
  {
    id: "train_005",
    title: "科研论文写作与发表研修班",
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    organizer: "浙江大学学术期刊中心",
    category: "科研能力",
    targetAudience: "青年教师",
    location: "杭州市西湖区",
    mode: "线下",
    startDate: "2024-04-15",
    endDate: "2024-04-22",
    capacity: 60,
    enrolled: 45,
    price: 4500,
    status: "报名中",
    description: "提升科研论文写作能力，掌握高水平期刊发表技巧。",
    schedule: [
      { day: 1, topic: "论文选题与创新", speaker: "赵教授" },
      { day: 2, topic: "学术写作规范", speaker: "钱教授" }
    ],
    requirements: ["博士研究生或青年教师", "有初步研究成果"],
    contact: {
      name: "孙老师",
      phone: "0571-12345678",
      email: "paper@zju.edu.cn"
    }
  },
  {
    id: "train_006",
    title: "实验室安全管理培训",
    coverImage: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80",
    organizer: "南京大学实验室与设备管理处",
    category: "安全培训",
    targetAudience: "实验室管理人员",
    location: "南京市鼓楼区",
    mode: "线下",
    startDate: "2024-03-20",
    endDate: "2024-03-25",
    capacity: 80,
    enrolled: 72,
    price: 2000,
    status: "报名中",
    description: "加强实验室安全管理，预防安全事故发生。",
    schedule: [
      { day: 1, topic: "安全法规解读", speaker: "马老师" },
      { day: 2, topic: "危险化学品管理", speaker: "郑老师" }
    ],
    requirements: ["实验室工作人员", "安全管理负责人"],
    contact: {
      name: "郑老师",
      phone: "025-12345678",
      email: "safety@nju.edu.cn"
    }
  }
];
