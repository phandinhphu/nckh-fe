"use client"

import { useState } from "react"
import { BookOpen, Calendar, CheckCircle, GraduationCap, Target, TrendingUp, AlertCircle, Badge } from "lucide-react"
import { CourseScheduler } from "./course-scheduler"
import { ProgressTracker } from "./progress-trackers"
import { CourseRecommendations } from "./course-recommendations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "@radix-ui/react-progress"

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for demonstration
  const studentInfo = {
    name: "Nguyễn Văn An",
    studentId: "20210001",
    major: "Khoa học Máy tính",
    year: "Năm 3",
    gpa: 3.45,
    completedCredits: 85,
    totalCredits: 140,
    expectedGraduation: "Tháng 6, 2025",
  }

  const upcomingCourses = [
    {
      id: 1,
      code: "CS301",
      name: "Cấu trúc dữ liệu và giải thuật",
      credits: 3,
      semester: "HK1 2024",
      status: "registered",
    },
    { id: 2, code: "CS302", name: "Hệ quản trị cơ sở dữ liệu", credits: 3, semester: "HK1 2024", status: "registered" },
    { id: 3, code: "CS303", name: "Mạng máy tính", credits: 3, semester: "HK1 2024", status: "waitlist" },
  ]

  const alerts = [
    { type: "warning", message: "Môn CS201 là tiên quyết cho CS301. Hãy đảm bảo hoàn thành trước khi đăng ký." },
    { type: "info", message: "Đăng ký môn học cho HK2 2024 sẽ mở vào ngày 15/11/2024." },
    { type: "success", message: "Bạn đã hoàn thành 60% chương trình đào tạo!" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Hệ thống Lập kế hoạch học tập</h1>
                <p className="text-sm text-muted-foreground">Trường Đại học ABC</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{studentInfo.name}</p>
                <p className="text-xs text-muted-foreground">
                  {studentInfo.studentId} - {studentInfo.major}
                </p>
              </div>
              <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Tổng quan</span>
            </TabsTrigger>
            <TabsTrigger value="scheduler" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Lập lịch</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Tiến độ</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Gợi ý</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Alerts Section */}
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${
                    alert.type === "warning"
                      ? "bg-orange-50 border-orange-200 text-orange-800"
                      : alert.type === "success"
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-blue-50 border-blue-200 text-blue-800"
                  }`}
                >
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">GPA hiện tại</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{studentInfo.gpa}</div>
                  <p className="text-xs text-muted-foreground">+0.12 so với kỳ trước</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tín chỉ hoàn thành</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {studentInfo.completedCredits}/{studentInfo.totalCredits}
                  </div>
                  <Progress value={(studentInfo.completedCredits / studentInfo.totalCredits) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Môn đã đăng ký</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{upcomingCourses.length}</div>
                  <p className="text-xs text-muted-foreground">Học kỳ 1, 2024</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Dự kiến tốt nghiệp</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-primary">{studentInfo.expectedGraduation}</div>
                  <p className="text-xs text-muted-foreground">Đúng kế hoạch</p>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Môn học sắp tới
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <Badge>{course.code}</Badge>
                          <h3 className="font-medium text-foreground">{course.name}</h3>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{course.credits} tín chỉ</span>
                          <span>{course.semester}</span>
                        </div>
                      </div>
                      <Badge
                       
                        className={course.status === "registered" ? "bg-primary" : ""}
                      >
                        {course.status === "registered" ? "Đã đăng ký" : "Chờ xử lý"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduler">
            <CourseScheduler />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressTracker studentInfo={studentInfo} />
          </TabsContent>

          <TabsContent value="recommendations">
            <CourseRecommendations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
