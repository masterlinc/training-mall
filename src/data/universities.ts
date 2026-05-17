export interface University {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  location: string;
  description: string;
}

export const universities: University[] = [
  {
    id: "uni_001",
    name: "清华大学",
    shortName: "清华",
    logo: "https://images.unsplash.com/photo-1541336032412-2048a678540d?w=400&q=80",
    location: "北京",
    description: "中国著名高等学府，坐落于北京西北郊风景秀丽的清华园。"
  },
  {
    id: "uni_002",
    name: "北京大学",
    shortName: "北大",
    logo: "https://images.unsplash.com/photo-1565018054866-968d574d18a1?w=400&q=80",
    location: "北京",
    description: "中国最著名的综合性大学之一，位于北京市海淀区。"
  },
  {
    id: "uni_003",
    name: "复旦大学",
    shortName: "复旦",
    logo: "https://images.unsplash.com/photo-1587394244808-a5fc9049153f?w=400&q=80",
    location: "上海",
    description: "上海市重点综合性大学，国家双一流建设高校。"
  },
  {
    id: "uni_004",
    name: "上海交通大学",
    shortName: "上交",
    logo: "https://images.unsplash.com/photo-1569424804376-44eb2c9cc7ba?w=400&q=80",
    location: "上海",
    description: "中国历史最悠久、享誉海内外的著名高等学府之一。"
  },
  {
    id: "uni_005",
    name: "浙江大学",
    shortName: "浙大",
    logo: "https://images.unsplash.com/photo-1566888596782-c7d41d3e3f1f?w=400&q=80",
    location: "杭州",
    description: "浙江省最著名的高等学府，国家双一流重点建设高校。"
  },
  {
    id: "uni_006",
    name: "南京大学",
    shortName: "南大",
    logo: "https://images.unsplash.com/photo-1564442098904-96b552c34e73?w=400&q=80",
    location: "南京",
    description: "江苏省重点大学，中国现代科学的发祥地之一。"
  },
  {
    id: "uni_007",
    name: "同济大学",
    shortName: "同济",
    logo: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&q=80",
    location: "上海",
    description: "教育部直属全国重点大学，国家双一流建设高校。"
  },
  {
    id: "uni_008",
    name: "中国美术学院",
    shortName: "国美",
    logo: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&q=80",
    location: "杭州",
    description: "中国第一所国立高等美术院校，美术学学科位居全国第一。"
  }
];

export const categories = [
  { id: "ai", name: "人工智能", icon: "Brain", color: "from-purple-500 to-indigo-500" },
  { id: "data", name: "数据分析", icon: "BarChart3", color: "from-blue-500 to-cyan-500" },
  { id: "blockchain", name: "区块链", icon: "Blocks", color: "from-emerald-500 to-teal-500" },
  { id: "cloud", name: "云计算", icon: "Cloud", color: "from-sky-500 to-blue-500" },
  { id: "security", name: "网络安全", icon: "Shield", color: "from-red-500 to-orange-500" },
  { id: "product", name: "产品管理", icon: "Package", color: "from-pink-500 to-rose-500" },
  { id: "design", name: "设计", icon: "Palette", color: "from-violet-500 to-purple-500" },
  { id: "business", name: "创业管理", icon: "Rocket", color: "from-amber-500 to-yellow-500" }
];

export const stats = {
  totalUniversities: 8,
  totalCourses: 128,
  totalStudents: 25680,
  totalCertificates: 8934
};
