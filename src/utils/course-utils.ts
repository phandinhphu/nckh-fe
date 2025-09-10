import type { Course } from '@/types/student';

export const getStatusColor = (status: Course['status']) => {
    switch (status) {
        case 'available':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'prerequisite-missing':
            return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'full':
            return 'bg-red-100 text-red-800 border-red-200';
        case 'conflict':
            return 'bg-purple-100 text-purple-800 border-purple-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export const getStatusText = (status: Course['status']) => {
    switch (status) {
        case 'available':
            return 'Có thể đăng ký';
        case 'prerequisite-missing':
            return 'Thiếu tiên quyết';
        case 'full':
            return 'Đã đầy';
        case 'conflict':
            return 'Trung lịch';
        default:
            return 'Không xác định';
    }
};

export const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
        case 'Dễ':
            return 'bg-green-100 text-green-800';
        case 'Trung bình':
            return 'bg-yellow-100 text-yellow-800';
        case 'Khó':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const getPriorityColor = (priority?: string) => {
    switch (priority) {
        case 'Cao':
            return 'bg-red-100 text-red-800';
        case 'Trung bình':
            return 'bg-yellow-100 text-yellow-800';
        case 'Thấp':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const filterCourses = (courses: Course[], searchTerm: string, selectedFilter: string) => {
    return courses.filter((course) => {
        const matchesSearch =
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.code.toLowerCase().includes(searchTerm.toLowerCase());

        if (selectedFilter === 'all') return matchesSearch;
        if (selectedFilter === 'available') return matchesSearch && course.status === 'available';
        if (selectedFilter === 'prerequisites') return matchesSearch && course.status === 'prerequisite-missing';

        return matchesSearch;
    });
};

export const getTotalCredits = (courses: Course[]) => {
    return courses.reduce((total, course) => total + course.credits, 0);
};
