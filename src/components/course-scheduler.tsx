import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { Search, Plus, AlertTriangle } from 'lucide-react';
import { CourseCard } from '@/components/ui/course-card';
import { mockAvailableCourses, mockSemesters } from '@/data/mock-data';
import { filterCourses, getTotalCredits } from '@/utils/course-utils';
import type { Course, Semester } from '@/types/student';

export function CourseScheduler() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const [availableCourses] = useState<Course[]>(mockAvailableCourses);
    const [semesters, setSemesters] = useState<Semester[]>(mockSemesters);

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const course = availableCourses.find((c) => c.id === draggableId);
        if (!course) return;

        setSemesters((prev) => {
            const newSemesters = [...prev];

            if (source.droppableId !== 'available-courses') {
                const sourceSemester = newSemesters.find((s) => s.id === source.droppableId);
                if (sourceSemester) {
                    sourceSemester.courses.splice(source.index, 1);
                }
            }

            if (destination.droppableId !== 'available-courses') {
                const destSemester = newSemesters.find((s) => s.id === destination.droppableId);
                if (destSemester) {
                    destSemester.courses.splice(destination.index, 0, course);
                }
            }

            return newSemesters;
        });
    };

    const filteredCourses = filterCourses(availableCourses, searchTerm, selectedFilter);

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
                                    variant={selectedFilter === 'all' ? 'default' : 'outline'}
                                    onClick={() => setSelectedFilter('all')}
                                    size="sm"
                                >
                                    Tất cả
                                </Button>
                                <Button
                                    variant={selectedFilter === 'available' ? 'default' : 'outline'}
                                    onClick={() => setSelectedFilter('available')}
                                    size="sm"
                                >
                                    Có thể đăng ký
                                </Button>
                                <Button
                                    variant={selectedFilter === 'prerequisites' ? 'default' : 'outline'}
                                    onClick={() => setSelectedFilter('prerequisites')}
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
                                            snapshot.isDraggingOver ? 'bg-muted/50' : ''
                                        }`}
                                    >
                                        {filteredCourses.map((course, index) => (
                                            <Draggable key={course.id} draggableId={course.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <CourseCard
                                                        course={course}
                                                        variant="scheduler"
                                                        provided={provided}
                                                        snapshot={snapshot}
                                                    />
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
                            const totalCredits = getTotalCredits(semester.courses);
                            const isOverLimit = totalCredits > semester.maxCredits;

                            return (
                                <Card key={semester.id}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg">{semester.name}</CardTitle>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`text-sm font-medium ${
                                                        isOverLimit ? 'text-destructive' : 'text-muted-foreground'
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
                                                        snapshot.isDraggingOver
                                                            ? 'border-primary bg-primary/5'
                                                            : 'border-border bg-muted/20'
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
                                                                <Draggable
                                                                    key={course.id}
                                                                    draggableId={course.id}
                                                                    index={index}
                                                                >
                                                                    {(provided, snapshot) => (
                                                                        <CourseCard
                                                                            course={course}
                                                                            variant="scheduler"
                                                                            provided={provided}
                                                                            snapshot={snapshot}
                                                                        />
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
                            );
                        })}
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
}
