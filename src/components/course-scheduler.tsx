"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Search, Plus, GripVertical, Clock, Users, MapPin, AlertTriangle, Badge } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface Course {
  id: string
  code: string
  name: string
  credits: number
  prerequisites: string[]
  semester: string
  instructor: string
  schedule: string
  location: string
  enrolled: number
  capacity: number
  status: "available" | "prerequisite-missing" | "full" | "conflict"
}

interface Semester {
  id: string
  name: string
  courses: Course[]
  maxCredits: number
}

export function CourseScheduler() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Mock data
  const [availableCourses] = useState<Course[]>([
    {
      id: "cs301",
      code: "CS301",
      name: "Cấu trúc dữ liệu và giải thuật",
      credits: 3,
      prerequisites: ["CS201", "MATH201"],
      semester: "HK1 2024",
      instructor: "TS. Nguyễn Văn A",
      schedule: "T2, T4: 7:30-9:30",
      location: "Phòng 301-A1",
      enrolled: 45,
      capacity: 50,
      status: "available",
    },
    {
      id: "cs302",
      code: "CS302",
      name: "Hệ quản trị cơ sở dữ liệu",
      credits: 3,
      prerequisites: ["CS201"],
      semester: "HK1 2024",
      instructor: "PGS. Trần Thị B",
      schedule: "T3, T5: 9:30-11:30",
      location: "Phòng 302-A1",
      enrolled: 50,
      capacity: 50,
      status: "full",
    },
    {
      id: "cs303",
      code: "CS303",
      name: "Mạng máy tính",
      credits: 3,
      prerequisites: ["CS202"],
      semester: "HK1 2024",
      instructor: "TS. Lê Văn C",
      schedule: "T2, T4: 13:30-15:30",
      location: "Phòng 303-A1",
      enrolled: 30,
      capacity: 45,
      status: "prerequisite-missing",
    },
    {
      id: "math301",
      code: "MATH301",
      name: "Xác suất thống kê",
      credits: 3,
      prerequisites: ["MATH201"],
      semester: "HK1 2024",
      instructor: "TS. Phạm Thị D",
      schedule: "T3, T6: 7:30-9:30",
      location: "Phòng 201-B1",
      enrolled: 35,
      capacity: 40,
      status: "available",
    },
  ])

  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: "hk1-2024",
      name: "Học kỳ 1, 2024",
      courses: [],
      maxCredits: 24,
    },
    {
      id: "hk2-2024",
      name: "Học kỳ 2, 2024",
      courses: [],
      maxCredits: 24,
    },
    {
      id: "hk1-2025",
      name: "Học kỳ 1, 2025",
      courses: [],
      maxCredits: 24,
    },
  ])

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    // If dropped in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Find the course being moved
    const course = availableCourses.find((c) => c.id === draggableId)
    if (!course) return

    // Update semesters
    setSemesters((prev) => {
      const newSemesters = [...prev]

      // Remove from source if it's a semester
      if (source.droppableId !== "available-courses") {
        const sourceSemester = newSemesters.find((s) => s.id === source.droppableId)
        if (sourceSemester) {
          sourceSemester.courses.splice(source.index, 1)
        }
      }

      // Add to destination if it's a semester
      if (destination.droppableId !== "available-courses") {
        const destSemester = newSemesters.find((s) => s.id === destination.droppableId)
        if (destSemester) {
          destSemester.courses.splice(destination.index, 0, course)
        }
      }

      return newSemesters
    })
  }

  const filteredCourses = availableCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedFilter === "all") return matchesSearch
    if (selectedFilter === "available") return matchesSearch && course.status === "available"
    if (selectedFilter === "prerequisites") return matchesSearch && course.status === "prerequisite-missing"

    return matchesSearch
  })

  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "prerequisite-missing":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "full":
        return "bg-red-100 text-red-800 border-red-200"
      case "conflict":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: Course["status"]) => {
    switch (status) {
      case "available":
        return "Có thể đăng ký"
      case "prerequisite-missing":
        return "Thiếu tiên quyết"
      case "full":
        return "Đã đầy"
      case "conflict":
        return "Trung lịch"
      default:
        return "Không xác định"
    }
  }

  const getTotalCredits = (semesterId: string) => {
    const semester = semesters.find((s) => s.id === semesterId)
    return semester?.courses.reduce((total, course) => total + course.credits, 0) || 0
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Tìm kiếm và lọc môn học</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm môn học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("all")}
                  size="sm"
                >
                  Tất cả
                </Button>
                <Button
                  variant={selectedFilter === "available" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("available")}
                  size="sm"
                >
                  Có thể đăng ký
                </Button>
                <Button
                  variant={selectedFilter === "prerequisites" ? "default" : "outline"}
                  onClick={() => setSelectedFilter("prerequisites")}
                  size="sm"
                >
                  Thiếu tiên quyết
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Available Courses */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Môn học khả dụng</CardTitle>
              <p className="text-sm text-muted-foreground">{filteredCourses.length} môn học</p>
            </CardHeader>
            <CardContent>
              <Droppable droppableId="available-courses">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`space-y-3 min-h-[200px] p-2 rounded-lg transition-colors ${
                      snapshot.isDraggingOver ? "bg-muted/50" : ""
                    }`}
                  >
                    {filteredCourses.map((course, index) => (
                      <Draggable key={course.id} draggableId={course.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 border rounded-lg bg-card cursor-move transition-all ${
                              snapshot.isDragging ? "shadow-lg rotate-2" : "hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <GripVertical className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge  className="text-xs">
                                    {course.code}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{course.credits} TC</span>
                                </div>
                                <h4 className="font-medium text-sm text-foreground leading-tight mb-2">
                                  {course.name}
                                </h4>
                                <div className="space-y-1 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{course.schedule}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{course.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    <span>
                                      {course.enrolled}/{course.capacity}
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <Badge className={`text-xs ${getStatusColor(course.status)}`}>
                                    {getStatusText(course.status)}
                                  </Badge>
                                </div>
                                {course.prerequisites.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs text-muted-foreground">
                                      Tiên quyết: {course.prerequisites.join(", ")}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </CardContent>
          </Card>

          {/* Semester Planning */}
          <div className="lg:col-span-3 space-y-6">
            {semesters.map((semester) => {
              const totalCredits = getTotalCredits(semester.id)
              const isOverLimit = totalCredits > semester.maxCredits

              return (
                <Card key={semester.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{semester.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${
                            isOverLimit ? "text-destructive" : "text-muted-foreground"
                          }`}
                        >
                          {totalCredits}/{semester.maxCredits} tín chỉ
                        </span>
                        {isOverLimit && <AlertTriangle className="h-4 w-4 text-destructive" />}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Droppable droppableId={semester.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`min-h-[150px] p-4 border-2 border-dashed rounded-lg transition-colors ${
                            snapshot.isDraggingOver ? "border-primary bg-primary/5" : "border-border bg-muted/20"
                          }`}
                        >
                          {semester.courses.length === 0 ? (
                            <div className="flex items-center justify-center h-32 text-muted-foreground">
                              <div className="text-center">
                                <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Kéo thả môn học vào đây</p>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {semester.courses.map((course, index) => (
                                <Draggable key={course.id} draggableId={course.id} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`p-4 bg-card border rounded-lg cursor-move transition-all ${
                                        snapshot.isDragging ? "shadow-lg rotate-1" : "hover:shadow-md"
                                      }`}
                                    >
                                      <div className="flex items-start gap-2">
                                        <GripVertical className="h-4 w-4 text-muted-foreground mt-1" />
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-2">
                                            <Badge >{course.code}</Badge>
                                            <span className="text-sm text-muted-foreground">{course.credits} TC</span>
                                          </div>
                                          <h4 className="font-medium text-foreground mb-2">{course.name}</h4>
                                          <div className="space-y-1 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                              <Clock className="h-3 w-3" />
                                              <span>{course.schedule}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                              <MapPin className="h-3 w-3" />
                                              <span>{course.location}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </div>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </DragDropContext>
  )
}
