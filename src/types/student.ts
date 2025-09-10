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

export interface Course {
    id: string;
    code: string;
    name: string;
    credits: number;
    prerequisites: string[];
    semester: string;
    instructor: string;
    schedule: string;
    location: string;
    enrolled: number;
    capacity: number;
    status: 'available' | 'prerequisite-missing' | 'full' | 'conflict';
    rating?: number;
    difficulty?: 'Dễ' | 'Trung bình' | 'Khó';
    workload?: 'Nhẹ' | 'Trung bình' | 'Nặng';
    description?: string;
    reasons?: string[];
    priority?: 'Cao' | 'Trung bình' | 'Thấp';
}

export interface Semester {
    id: string;
    name: string;
    courses: Course[];
    maxCredits: number;
}

export interface CourseCategory {
    name: string;
    completed: number;
    required: number;
    color: string;
}

export interface SemesterGrade {
    semester: string;
    gpa: number;
    credits: number;
}

export interface Achievement {
    title: string;
    semester: string;
    type: 'scholarship' | 'achievement' | 'academic';
}

export interface Milestone {
    title: string;
    progress: number;
    target: number;
    deadline: string;
}

export interface Alert {
    type: 'warning' | 'info' | 'success';
    message: string;
}
