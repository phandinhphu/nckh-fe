import { useState } from 'react';
import { StudentDashboard } from '@/components/student-dashboard';
import { ProgressTracker } from '@/components/progress-trackers';
import { CourseScheduler } from '@/components/course-scheduler';
import { CourseRecommendations } from '@/components/course-recommendations';
import AppRouter from './routes/AppRouter';

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
    name: 'Nguyễn Văn A',
    studentId: 'SV2021001',
    major: 'Công nghệ thông tin',
    year: 'Năm 3',
    gpa: 3.45,
    completedCredits: 80,
    totalCredits: 130,
    expectedGraduation: '2025-06-30',
};

export default function App() {
    const [currentPage, setCurrentPage] = useState<string>('dashboard');

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <StudentDashboard />;
            case 'progress':
                return <ProgressTracker studentInfo={student} />;
            case 'scheduler':
                return <CourseScheduler />;
            case 'recommendations':
                return <CourseRecommendations />;
            default:
                return <StudentDashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <AppRouter />
        </div>
    );
}
