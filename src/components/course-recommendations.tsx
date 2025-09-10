import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, Clock, BookOpen, Target, AlertCircle } from 'lucide-react';
import { CourseCard } from '@/components/ui/course-card';
import {
    mockNextSemesterRecommendations,
    mockCareerPathRecommendations,
    mockElectiveRecommendations,
} from '@/data/mock-data';

export function CourseRecommendations() {
    const [selectedCategory, setSelectedCategory] = useState('next-semester');

    const nextSemesterRecommendations = mockNextSemesterRecommendations;
    const careerPathRecommendations = mockCareerPathRecommendations;
    const electiveRecommendations = mockElectiveRecommendations;

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
                        {nextSemesterRecommendations.map((course) => (
                            <CourseCard key={course.id} course={course} variant="recommendation" />
                        ))}
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {careerPathRecommendations.map((course) => (
                            <CourseCard key={course.id} course={course} variant="recommendation" />
                        ))}
                    </div>
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {electiveRecommendations.map((course) => (
                            <CourseCard key={course.id} course={course} variant="recommendation" />
                        ))}
                    </div>
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
                                Không nên đăng ký quá nhiều môn khó trong cùng một học kỳ. Hãy kết hợp môn khó với môn
                                dễ.
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
    );
}
