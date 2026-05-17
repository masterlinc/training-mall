export interface Course {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  university: string;
  instructor: {
    name: string;
    avatar: string;
    title: string;
  };
  category: string;
  certificateType: string;
  price: number;
  originalPrice: number;
  rating: number;
  studentCount: number;
  duration: string;
  level: string;
  tags: string[];
  description: string;
  syllabus: { chapter: number; title: string; duration: string }[];
  reviews: { user: string; rating: number; comment: string; date: string }[];
  createdAt: string;
}

export const courses: Course[] = [
  {
    id: "course_001",
    title: "人工智能导论",
    subtitle: "从基础到实践",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    university: "清华大学",
    instructor: {
      name: "张教授",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
      title: "计算机系教授"
    },
    category: "人工智能",
    certificateType: "结业证书",
    price: 299,
    originalPrice: 599,
    rating: 4.8,
    studentCount: 1256,
    duration: "32课时",
    level: "初级",
    tags: ["AI", "机器学习", "入门"],
    description: "本课程系统介绍人工智能的基本概念、核心算法和应用场景，帮助学员建立AI思维框架。",
    syllabus: [
      { chapter: 1, title: "人工智能概述", duration: "2课时" },
      { chapter: 2, title: "机器学习基础", duration: "4课时" },
      { chapter: 3, title: "深度学习入门", duration: "6课时" }
    ],
    reviews: [
      { user: "李同学", rating: 5, comment: "课程很实用", date: "2024-01-15" }
    ],
    createdAt: "2024-01-01"
  },
  {
    id: "course_002",
    title: "数据科学与Python编程",
    subtitle: "数据分析师的必修课",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    university: "北京大学",
    instructor: {
      name: "王教授",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      title: "数据科学学院副教授"
    },
    category: "数据分析",
    certificateType: "专业证书",
    price: 399,
    originalPrice: 799,
    rating: 4.9,
    studentCount: 2341,
    duration: "48课时",
    level: "中级",
    tags: ["Python", "数据分析", "可视化"],
    description: "掌握Python数据科学工具链，从数据处理到可视化分析。",
    syllabus: [
      { chapter: 1, title: "Python基础回顾", duration: "4课时" },
      { chapter: 2, title: "NumPy与Pandas", duration: "8课时" }
    ],
    reviews: [],
    createdAt: "2024-01-15"
  },
  {
    id: "course_003",
    title: "区块链技术原理与应用",
    subtitle: "探索Web3未来",
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    university: "复旦大学",
    instructor: {
      name: "陈教授",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      title: "金融科技学院教授"
    },
    category: "区块链",
    certificateType: "结业证书",
    price: 499,
    originalPrice: 899,
    rating: 4.7,
    studentCount: 876,
    duration: "36课时",
    level: "中级",
    tags: ["区块链", "加密货币", "智能合约"],
    description: "深入理解区块链核心技术，探索数字经济的未来方向。",
    syllabus: [
      { chapter: 1, title: "区块链基础", duration: "4课时" },
      { chapter: 2, title: "共识机制", duration: "6课时" }
    ],
    reviews: [],
    createdAt: "2024-02-01"
  },
  {
    id: "course_004",
    title: "云计算与分布式系统",
    subtitle: "企业级架构设计",
    coverImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    university: "上海交通大学",
    instructor: {
      name: "刘教授",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
      title: "电子信息学院教授"
    },
    category: "云计算",
    certificateType: "技术认证",
    price: 599,
    originalPrice: 999,
    rating: 4.9,
    studentCount: 1523,
    duration: "40课时",
    level: "高级",
    tags: ["云架构", "分布式", "微服务"],
    description: "掌握现代云原生架构，设计高可用分布式系统。",
    syllabus: [
      { chapter: 1, title: "云计算概述", duration: "2课时" },
      { chapter: 2, title: "容器技术", duration: "6课时" }
    ],
    reviews: [],
    createdAt: "2024-02-15"
  },
  {
    id: "course_005",
    title: "网络安全基础",
    subtitle: "攻防实战演练",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    university: "浙江大学",
    instructor: {
      name: "赵教授",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
      title: "网络空间安全学院教授"
    },
    category: "网络安全",
    certificateType: "安全认证",
    price: 349,
    originalPrice: 699,
    rating: 4.6,
    studentCount: 987,
    duration: "28课时",
    level: "初级",
    tags: ["Web安全", "渗透测试", "密码学"],
    description: "学习网络安全基础知识，提升安全意识和防护能力。",
    syllabus: [
      { chapter: 1, title: "网络安全概述", duration: "2课时" },
      { chapter: 2, title: "常见漏洞分析", duration: "4课时" }
    ],
    reviews: [],
    createdAt: "2024-03-01"
  },
  {
    id: "course_006",
    title: "产品经理实战",
    subtitle: "从需求到落地",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    university: "同济大学",
    instructor: {
      name: "周老师",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      title: "资深产品总监"
    },
    category: "产品管理",
    certificateType: "能力证书",
    price: 449,
    originalPrice: 849,
    rating: 4.8,
    studentCount: 1654,
    duration: "35课时",
    level: "中级",
    tags: ["产品设计", "需求分析", "项目管理"],
    description: "系统学习产品经理核心技能，掌握产品从0到1的方法论。",
    syllabus: [
      { chapter: 1, title: "产品经理职责", duration: "2课时" },
      { chapter: 2, title: "需求分析方法", duration: "4课时" }
    ],
    reviews: [],
    createdAt: "2024-03-10"
  },
  {
    id: "course_007",
    title: "UI/UX设计原则",
    subtitle: "用户体验设计入门",
    coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    university: "中国美术学院",
    instructor: {
      name: "林老师",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
      title: "设计学院副教授"
    },
    category: "设计",
    certificateType: "结业证书",
    price: 299,
    originalPrice: 549,
    rating: 4.7,
    studentCount: 2134,
    duration: "30课时",
    level: "初级",
    tags: ["UI设计", "UX设计", "Figma"],
    description: "学习现代UI/UX设计理念，掌握设计工具和流程。",
    syllabus: [
      { chapter: 1, title: "设计基础理论", duration: "3课时" },
      { chapter: 2, title: "用户研究方法", duration: "4课时" }
    ],
    reviews: [],
    createdAt: "2024-03-15"
  },
  {
    id: "course_008",
    title: "创新创业管理",
    subtitle: "从0到1的创业之路",
    coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    university: "南京大学",
    instructor: {
      name: "孙教授",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
      title: "商学院教授"
    },
    category: "创业",
    certificateType: "创业证书",
    price: 399,
    originalPrice: 749,
    rating: 4.5,
    studentCount: 756,
    duration: "25课时",
    level: "中级",
    tags: ["创业", "商业计划", "融资"],
    description: "系统学习创业知识，了解商业模式的构建与验证。",
    syllabus: [
      { chapter: 1, title: "创业思维", duration: "2课时" },
      { chapter: 2, title: "商业模式画布", duration: "3课时" }
    ],
    reviews: [],
    createdAt: "2024-03-20"
  }
];
