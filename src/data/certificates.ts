export interface Certificate {
  id: string;
  title: string;
  type: string;
  holder: {
    name: string;
    studentId: string;
    university: string;
  };
  issuer: {
    name: string;
    department: string;
  };
  course: {
    id: string;
    name: string;
  };
  issueDate: string;
  expiryDate: string | null;
  verifyCode: string;
  status: string;
  description: string;
  template: string;
}

export const certificates: Certificate[] = [
  {
    id: "cert_001",
    title: "人工智能导论结业证书",
    type: "结业证书",
    holder: {
      name: "李明",
      studentId: "2021001234",
      university: "北京大学"
    },
    issuer: {
      name: "清华大学",
      department: "计算机科学与技术系"
    },
    course: {
      id: "course_001",
      name: "人工智能导论"
    },
    issueDate: "2024-02-01",
    expiryDate: null,
    verifyCode: "THU-AI-2024-001",
    status: "有效",
    description: "该学员已成功完成人工智能导论课程全部学习内容，经考核合格，特发此证。",
    template: "elegant"
  },
  {
    id: "cert_002",
    title: "数据科学专业证书",
    type: "专业证书",
    holder: {
      name: "王芳",
      studentId: "2020032156",
      university: "复旦大学"
    },
    issuer: {
      name: "北京大学",
      department: "数据科学学院"
    },
    course: {
      id: "course_002",
      name: "数据科学与Python编程"
    },
    issueDate: "2024-01-20",
    expiryDate: null,
    verifyCode: "PKU-DS-2024-012",
    status: "有效",
    description: "该学员已掌握数据科学核心技能，具备独立完成数据分析项目的能力。",
    template: "modern"
  },
  {
    id: "cert_003",
    title: "区块链技术认证证书",
    type: "技术认证",
    holder: {
      name: "张伟",
      studentId: "2022010897",
      university: "上海交通大学"
    },
    issuer: {
      name: "复旦大学",
      department: "金融科技学院"
    },
    course: {
      id: "course_003",
      name: "区块链技术原理与应用"
    },
    issueDate: "2024-03-05",
    expiryDate: null,
    verifyCode: "FDU-BC-2024-008",
    status: "有效",
    description: "该学员已完成区块链技术全部课程，具备区块链应用开发能力。",
    template: "tech"
  },
  {
    id: "cert_004",
    title: "云计算架构师证书",
    type: "技术认证",
    holder: {
      name: "刘洋",
      studentId: "2019003456",
      university: "浙江大学"
    },
    issuer: {
      name: "上海交通大学",
      department: "电子信息学院"
    },
    course: {
      id: "course_004",
      name: "云计算与分布式系统"
    },
    issueDate: "2024-02-28",
    expiryDate: "2027-02-28",
    verifyCode: "SJT-CLOUD-2024-015",
    status: "有效",
    description: "该学员已具备云架构设计与分布式系统开发的专业能力。",
    template: "professional"
  },
  {
    id: "cert_005",
    title: "网络安全工程师证书",
    type: "安全认证",
    holder: {
      name: "陈静",
      studentId: "2021025678",
      university: "南京大学"
    },
    issuer: {
      name: "浙江大学",
      department: "网络空间安全学院"
    },
    course: {
      id: "course_005",
      name: "网络安全基础"
    },
    issueDate: "2024-03-10",
    expiryDate: null,
    verifyCode: "ZJU-NS-2024-003",
    status: "有效",
    description: "该学员已掌握网络安全基础知识，具备安全防护能力。",
    template: "secure"
  },
  {
    id: "cert_006",
    title: "产品经理能力证书",
    type: "能力证书",
    holder: {
      name: "赵磊",
      studentId: "2020019876",
      university: "同济大学"
    },
    issuer: {
      name: "同济大学",
      department: "经济与管理学院"
    },
    course: {
      id: "course_006",
      name: "产品经理实战"
    },
    issueDate: "2024-02-15",
    expiryDate: null,
    verifyCode: "TJU-PM-2024-007",
    status: "有效",
    description: "该学员已具备产品规划、设计与管理的基本能力。",
    template: "creative"
  }
];
