import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BookOpen, Clock, Target, Award } from 'lucide-react';
import type { StudentInfo } from '@/types/student';
import { mockCourseCategories, mockSemesterGrades, mockAchievements, mockUpcomingMilestones } from '@/data/mock-data';

interface ProgressTrackerProps {
    studentInfo: StudentInfo;
}

export function ProgressTracker({ studentInfo }: ProgressTrackerProps) {
    const courseCategories = mockCourseCategories;
    const semesterGrades = mockSemesterGrades;
    const achievements = mockAchievements;
    const upcomingMilestones = mockUpcomingMilestones;

    return (
        <div className="space-y-6">
            {/* Overall Progress */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tiến độ tổng thể</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">
                            {Math.round((studentInfo.completedCredits / studentInfo.totalCredits) * 100)}%
                        </div>
                        <Progress
                            value={(studentInfo.completedCredits / studentInfo.totalCredits) * 100}
                            className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                            {studentInfo.completedCredits}/{studentInfo.totalCredits} tín chỉ
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">GPA tích lũy</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">{studentInfo.gpa}</div>
                        <div className="flex items-center mt-2">
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full"
                                    style={{ width: `${(studentInfo.gpa / 4) * 100}%` }}
                                />
                            </div>
                            <span className="text-xs text-muted-foreground ml-2">4.0</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            Xếp loại: {studentInfo.gpa >= 3.6 ? 'Giỏi' : studentInfo.gpa >= 3.2 ? 'Khá' : 'Trung bình'}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Thời gian còn lại</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">3</div>
                        <p className="text-xs text-muted-foreground">học kỳ</p>
                        <p className="text-xs text-muted-foreground mt-2">Dự kiến: {studentInfo.expectedGraduation}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Course Categories Progress */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Tiến độ theo khối kiến thức
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {courseCategories.map((category, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-foreground">{category.name}</h3>
                                    <span className="text-sm text-muted-foreground">
                                        {category.completed}/{category.required} tín chỉ
                                    </span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-3">
                                    <div
                                        className={`h-3 rounded-full ${category.color} transition-all duration-300`}
                                        style={{
                                            width: `${Math.min((category.completed / category.required) * 100, 100)}%`,
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>
                                        {Math.round((category.completed / category.required) * 100)}% hoàn thành
                                    </span>
                                    <span>
                                        {category.required - category.completed > 0
                                            ? `Còn ${category.required - category.completed} tín chỉ`
                                            : 'Đã hoàn thành'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Semester Performance */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Kết quả học tập theo học kỳ
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {semesterGrades.map((grade, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 border border-border rounded-lg"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-primary">{grade.gpa}</div>
                                        <div className="text-xs text-muted-foreground">GPA</div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-foreground">{grade.semester}</h3>
                                        <p className="text-sm text-muted-foreground">{grade.credits} tín chỉ</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {grade.gpa >= 3.5 && (
                                        <Badge variant="default" className="bg-green-100 text-green-800">
                                            Xuất sắc
                                        </Badge>
                                    )}
                                    {grade.gpa >= 3.2 && grade.gpa < 3.5 && <Badge variant="secondary">Khá</Badge>}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Thành tích đạt được
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Award className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-foreground">{achievement.title}</h3>
                                    <p className="text-sm text-muted-foreground">{achievement.semester}</p>
                                </div>
                                <Badge variant="outline">
                                    {achievement.type === 'scholarship'
                                        ? 'Học bổng'
                                        : achievement.type === 'achievement'
                                          ? 'Thành tích'
                                          : 'Học tập'}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Upcoming Milestones */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Mục tiêu sắp tới
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {upcomingMilestones.map((milestone, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-foreground">{milestone.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">{milestone.deadline}</span>
                                        <Badge variant="outline">
                                            {milestone.progress === 0 ? 'Chưa bắt đầu' : 'Đang thực hiện'}
                                        </Badge>
                                    </div>
                                </div>
                                <Progress value={(milestone.progress / milestone.target) * 100} />
                                <p className="text-xs text-muted-foreground">
                                    {milestone.progress}/{milestone.target} -{' '}
                                    {Math.round((milestone.progress / milestone.target) * 100)}% hoàn thành
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
