import { useState } from "react";
import { StudentDashboard } from "@/components/student-dashboard";
import { ProgressTracker } from "@/components/progress-trackers";
import { CourseScheduler } from "@/components/course-scheduler";
import { CourseRecommendations } from "@/components/course-recommendations";

export interface StudentInfo {
  name: string;
  studentId: string;
  major: string;
  year: string;
  gpa: number;
  completedCredits: number;
  totalCredits: number;
  expectedGraduation: string;
}

const student: StudentInfo = {
  name: "Nguyễn Văn A",
  studentId: "SV2021001",
  major: "Công nghệ thông tin",
  year: "Năm 3",
  gpa: 3.45,
  completedCredits: 80,
  totalCredits: 130,
  expectedGraduation: "2025-06-30",
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <StudentDashboard/>;
      case "progress":
        return <ProgressTracker studentInfo={student} />;
      case "scheduler":
        return <CourseScheduler />;
      case "recommendations":
        return <CourseRecommendations />;
      default:
        return <StudentDashboard  />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-primary">
              Hệ thống Lập kế hoạch Học tập
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Xin chào, <strong>{student.name}</strong>
              </span>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow mb-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 py-3">
            <button
              onClick={() => setCurrentPage("dashboard")}
              className={`px-4 py-2 rounded-lg ${
                currentPage === "dashboard"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage("progress")}
              className={`px-4 py-2 rounded-lg ${
                currentPage === "progress"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Tiến độ học tập
            </button>
            <button
              onClick={() => setCurrentPage("scheduler")}
              className={`px-4 py-2 rounded-lg ${
                currentPage === "scheduler"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Kế hoạch học tập
            </button>
            <button
              onClick={() => setCurrentPage("recommendations")}
              className={`px-4 py-2 rounded-lg ${
                currentPage === "recommendations"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Gợi ý môn học
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
}
