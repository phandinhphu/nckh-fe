"use client"

import { useState } from "react"
import { Lightbulb, Clock, Star, BookOpen, Target, AlertCircle, CheckCircle, Badge } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"

interface Course {
  id: string
  code: string
  name: string
  credits: number
  instructor: string
  rating: number
  difficulty: "Dễ" | "Trung bình" | "Khó"
  workload: "Nhẹ" | "Trung bình" | "Nặng"
  prerequisites: string[]
  description: string
  reasons: string[]
  semester: string
  priority: "Cao" | "Trung bình" | "Thấp"
}

export function CourseRecommendations() {
  const [selectedCategory, setSelectedCategory] = useState("next-semester")

  // Mock recommendation data
  const nextSemesterRecommendations: Course[] = [
    {
      id: "cs401",
      code: "CS401",
      name: "Trí tuệ nhân tạo",
      credits: 3,
      instructor: "PGS. Nguyễn Văn AI",
      rating: 4.5,
      difficulty: "Khó",
      workload: "Nặng",
      prerequisites: ["CS301", "MATH301"],
      description: "Khóa học cung cấp kiến thức cơ bản về AI, machine learning và các ứng dụng thực tế.",
      reasons: [
        "Phù hợp với xu hướng công nghệ hiện tại",
        "Bạn đã hoàn thành các môn tiên quyết",
        "Giảng viên có kinh nghiệm và đánh giá cao",
      ],
      semester: "HK2 2024",
      priority: "Cao",
    },
    {
      id: "cs402",
      code: "CS402",
      name: "Phát triển ứng dụng Web",
      credits: 3,
      instructor: "TS. Trần Thị Web",
      rating: 4.2,
      difficulty: "Trung bình",
      workload: "Trung bình",
      prerequisites: ["CS302"],
      description: "Học cách xây dựng ứng dụng web hiện đại với các framework phổ biến.",
      reasons: [
        "Kỹ năng thực tế cao, dễ tìm việc",
        "Có nhiều project thực hành",
        "Kết nối tốt với thị trường lao động",
      ],
      semester: "HK2 2024",
      priority: "Cao",
    },
    {
      id: "cs403",
      code: "CS403",
      name: "Bảo mật thông tin",
      credits: 3,
      instructor: "TS. Lê Văn Security",
      rating: 4.0,
      difficulty: "Khó",
      workload: "Nặng",
      prerequisites: ["CS303"],
      description: "Tìm hiểu về các kỹ thuật bảo mật, mã hóa và an toàn thông tin.",
      reasons: ["Lĩnh vực có nhu cầu cao", "Mức lương hấp dẫn", "Kiến thức quan trọng cho mọi lập trình viên"],
      semester: "HK2 2024",
      priority: "Trung bình",
    },
  ]

  const careerPathRecommendations: Course[] = [
    {
      id: "cs501",
      code: "CS501",
      name: "Machine Learning nâng cao",
      credits: 3,
      instructor: "PGS. Phạm Thị ML",
      rating: 4.7,
      difficulty: "Khó",
      workload: "Nặng",
      prerequisites: ["CS401", "MATH401"],
      description: "Khóa học chuyên sâu về machine learning và deep learning.",
      reasons: [
        "Phù hợp với định hướng AI/ML",
        "Chuẩn bị cho nghiên cứu sau đại học",
        "Kỹ năng được săn đón nhất hiện tại",
      ],
      semester: "HK1 2025",
      priority: "Cao",
    },
    {
      id: "cs502",
      code: "CS502",
      name: "Kiến trúc phần mềm",
      credits: 3,
      instructor: "TS. Hoàng Văn Arch",
      rating: 4.3,
      difficulty: "Trung bình",
      workload: "Trung bình",
      prerequisites: ["CS402"],
      description: "Học cách thiết kế và xây dựng hệ thống phần mềm lớn.",
      reasons: [
        "Cần thiết cho vị trí senior developer",
        "Kiến thức nền tảng cho system design",
        "Hỗ trợ tốt cho việc phỏng vấn",
      ],
      semester: "HK1 2025",
      priority: "Cao",
    },
  ]

  const electiveRecommendations: Course[] = [
    {
      id: "bus301",
      code: "BUS301",
      name: "Khởi nghiệp công nghệ",
      credits: 2,
      instructor: "ThS. Nguyễn Startup",
      rating: 4.1,
      difficulty: "Dễ",
      workload: "Nhẹ",
      prerequisites: [],
      description: "Tìm hiểu về khởi nghiệp, lập kế hoạch kinh doanh và quản lý startup.",
      reasons: ["Kỹ năng mềm quan trọng", "Mở rộng tư duy kinh doanh", "Networking với cộng đồng startup"],
      semester: "HK2 2024",
      priority: "Thấp",
    },
    {
      id: "eng301",
      code: "ENG301",
      name: "Tiếng Anh chuyên ngành IT",
      credits: 2,
      instructor: "ThS. Smith John",
      rating: 3.9,
      difficulty: "Trung bình",
      workload: "Nhẹ",
      prerequisites: ["ENG201"],
      description: "Phát triển kỹ năng tiếng Anh chuyên ngành công nghệ thông tin.",
      reasons: ["Cần thiết cho môi trường làm việc quốc tế", "Hỗ trợ đọc tài liệu kỹ thuật", "Tăng cơ hội việc làm"],
      semester: "HK2 2024",
      priority: "Trung bình",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ":
        return "bg-green-100 text-green-800"
      case "Trung bình":
        return "bg-yellow-100 text-yellow-800"
      case "Khó":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Cao":
        return "bg-red-100 text-red-800"
      case "Trung bình":
        return "bg-yellow-100 text-yellow-800"
      case "Thấp":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderCourseCard = (course: Course) => (
    <Card key={course.id} className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge >{course.code}</Badge>
              <Badge className={getPriorityColor(course.priority)}>{course.priority}</Badge>
            </div>
            <CardTitle className="text-lg">{course.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {course.instructor} • {course.credits} tín chỉ • {course.semester}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground">{course.description}</p>

        <div className="flex flex-wrap gap-2">
          <Badge className={getDifficultyColor(course.difficulty)}>
            {course.difficulty}
          </Badge>
          <Badge >Khối lượng: {course.workload}</Badge>
        </div>

        {course.prerequisites.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Môn tiên quyết:</p>
            <div className="flex flex-wrap gap-1">
              {course.prerequisites.map((prereq, index) => (
                <Badge key={index}  className="text-xs">
                  {prereq}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Lý do gợi ý:</p>
          <ul className="space-y-1">
            {course.reasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            Thêm vào kế hoạch
          </Button>
          <Button size="sm" variant="outline">
            Xem chi tiết
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Gợi ý môn học thông minh
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Dựa trên tiến độ học tập, sở thích và mục tiêu nghề nghiệp của bạn
          </p>
        </CardHeader>
      </Card>

      {/* Recommendation Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="next-semester" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Học kỳ tới</span>
            <span className="sm:hidden">HK tới</span>
          </TabsTrigger>
          <TabsTrigger value="career-path" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Định hướng nghề nghiệp</span>
            <span className="sm:hidden">Nghề nghiệp</span>
          </TabsTrigger>
          <TabsTrigger value="electives" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Môn tự chọn</span>
            <span className="sm:hidden">Tự chọn</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="next-semester" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Gợi ý cho học kỳ 2, 2024</CardTitle>
              <p className="text-sm text-muted-foreground">
                Các môn học phù hợp với tiến độ hiện tại và có thể đăng ký ngay
              </p>
            </CardHeader>
          </Card>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {nextSemesterRecommendations.map(renderCourseCard)}
          </div>
        </TabsContent>

        <TabsContent value="career-path" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Định hướng AI/Machine Learning</CardTitle>
              <p className="text-sm text-muted-foreground">
                Các môn học giúp phát triển chuyên môn theo định hướng nghề nghiệp
              </p>
            </CardHeader>
          </Card>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{careerPathRecommendations.map(renderCourseCard)}</div>
        </TabsContent>

        <TabsContent value="electives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Môn tự chọn đề xuất</CardTitle>
              <p className="text-sm text-muted-foreground">
                Các môn học bổ trợ giúp phát triển kỹ năng mềm và mở rộng kiến thức
              </p>
            </CardHeader>
          </Card>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{electiveRecommendations.map(renderCourseCard)}</div>
        </TabsContent>
      </Tabs>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Lời khuyên khi chọn môn học
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Cân bằng khối lượng học tập</h4>
              <p className="text-sm text-muted-foreground">
                Không nên đăng ký quá nhiều môn khó trong cùng một học kỳ. Hãy kết hợp môn khó với môn dễ.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Ưu tiên môn tiên quyết</h4>
              <p className="text-sm text-muted-foreground">
                Hoàn thành các môn tiên quyết sớm để có nhiều lựa chọn hơn trong các học kỳ sau.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Tham khảo đánh giá</h4>
              <p className="text-sm text-muted-foreground">
                Đọc đánh giá của sinh viên khóa trước về giảng viên và nội dung môn học.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Linh hoạt với kế hoạch</h4>
              <p className="text-sm text-muted-foreground">
                Sẵn sàng điều chỉnh kế hoạch dựa trên tình hình thực tế và cơ hội mới.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
