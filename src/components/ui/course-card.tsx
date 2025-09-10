import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GripVertical, Clock, MapPin, Users, Star, CheckCircle } from 'lucide-react';
import type { Course } from '@/types/student';
import { getStatusColor, getStatusText, getDifficultyColor, getPriorityColor } from '@/utils/course-utils';

interface CourseCardProps {
    course: Course;
    variant?: 'scheduler' | 'recommendation';
    provided?: any;
    snapshot?: any;
}

export function CourseCard({ course, variant = 'scheduler', provided, snapshot }: CourseCardProps) {
    if (variant === 'recommendation') {
        return (
            <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{course.code}</Badge>
                                {course.priority && (
                                    <Badge className={getPriorityColor(course.priority)}>{course.priority}</Badge>
                                )}
                            </div>
                            <CardTitle className="text-lg">{course.name}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                {course.instructor} • {course.credits} tín chỉ • {course.semester}
                            </p>
                        </div>
                        {course.rating && (
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{course.rating}</span>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {course.description && <p className="text-sm text-foreground">{course.description}</p>}

                    <div className="flex flex-wrap gap-2">
                        {course.difficulty && (
                            <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
                                {course.difficulty}
                            </Badge>
                        )}
                        {course.workload && <Badge variant="outline">Khối lượng: {course.workload}</Badge>}
                    </div>

                    {course.prerequisites.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-foreground">Môn tiên quyết:</p>
                            <div className="flex flex-wrap gap-1">
                                {course.prerequisites.map((prereq, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {prereq}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {course.reasons && course.reasons.length > 0 && (
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
                    )}

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
        );
    }

    // Scheduler variant
    return (
        <div
            ref={provided?.innerRef}
            {...provided?.draggableProps}
            {...provided?.dragHandleProps}
            className={`p-3 border rounded-lg bg-card cursor-move transition-all ${
                snapshot?.isDragging ? 'shadow-lg rotate-2' : 'hover:shadow-md'
            }`}
        >
            <div className="flex items-start gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                            {course.code}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{course.credits} TC</span>
                    </div>
                    <h4 className="font-medium text-sm text-foreground leading-tight mb-2">{course.name}</h4>
                    {course.schedule && course.location && (
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
                    )}
                    <div className="mt-2">
                        <Badge variant="outline" className={`text-xs ${getStatusColor(course.status)}`}>
                            {getStatusText(course.status)}
                        </Badge>
                    </div>
                    {course.prerequisites.length > 0 && (
                        <div className="mt-2">
                            <p className="text-xs text-muted-foreground">
                                Tiên quyết: {course.prerequisites.join(', ')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
