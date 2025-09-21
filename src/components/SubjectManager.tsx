import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Plus, Edit, Trash2, Clock, Target, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubjectManager = () => {
  const [selectedMonth, setSelectedMonth] = useState("current");
  const { toast } = useToast();

  const subjects = [
    {
      id: 1,
      name: "ریاضی",
      color: "bg-primary",
      totalHours: 45,
      goalHours: 60,
      sessionsCount: 23,
      avgSessionLength: 117, // minutes
      lastStudied: "2 ساعت پیش",
      weeklyHours: [8, 6, 9, 7, 8, 5, 6], // last 7 days
      monthlyProgress: 75,
      topics: ["حد و پیوستگی", "مشتق", "تابع", "هندسه"]
    },
    {
      id: 2,
      name: "فیزیک",
      color: "bg-accent",
      totalHours: 32,
      goalHours: 45,
      sessionsCount: 18,
      avgSessionLength: 106,
      lastStudied: "1 روز پیش",
      weeklyHours: [5, 4, 6, 5, 7, 3, 2],
      monthlyProgress: 71,
      topics: ["مکانیک", "الکتریسیته", "نوسان", "موج"]
    },
    {
      id: 3,
      name: "شیمی",
      color: "bg-warning",
      totalHours: 28,
      goalHours: 40,
      sessionsCount: 15,
      avgSessionLength: 112,
      lastStudied: "3 روز پیش",
      weeklyHours: [4, 3, 5, 4, 6, 2, 4],
      monthlyProgress: 70,
      topics: ["شیمی آلی", "اسید و باز", "ترمودینامیک", "کینتیک"]
    },
    {
      id: 4,
      name: "زبان انگلیسی",
      color: "bg-secondary",
      totalHours: 22,
      goalHours: 30,
      sessionsCount: 20,
      avgSessionLength: 66,
      lastStudied: "5 ساعت پیش",
      weeklyHours: [3, 4, 2, 3, 4, 3, 3],
      monthlyProgress: 73,
      topics: ["Grammar", "Vocabulary", "Reading", "Listening"]
    }
  ];

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}س ${mins}د` : `${mins} دقیقه`;
  };

  const addSubject = () => {
    toast({
      title: "درس جدید اضافه شد",
      description: "درس جدید با موفقیت به لیست اضافه شد",
    });
  };

  const months = [
    { value: "current", label: "ماه جاری" },
    { value: "last", label: "ماه گذشته" },
    { value: "2months", label: "2 ماه پیش" },
    { value: "3months", label: "3 ماه پیش" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            مدیریت دروس
          </h1>
          <p className="text-muted-foreground mt-2">
            دروس خود را سازماندهی کنید و پیشرفت را پیگیری کنید
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary shadow-medium">
                <Plus className="w-4 h-4 mr-2" />
                درس جدید
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>اضافه کردن درس جدید</DialogTitle>
                <DialogDescription>اطلاعات درس جدید را وارد کنید</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="نام درس" />
                <Input placeholder="هدف ساعت مطالعه (ماهانه)" type="number" />
                <Button onClick={addSubject} className="w-full">
                  اضافه کردن
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="shadow-soft border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">کل دروس</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary persian-numbers">{subjects.length}</div>
            <p className="text-xs text-muted-foreground">درس فعال</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">کل ساعت مطالعه</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent persian-numbers">
              {subjects.reduce((sum, subject) => sum + subject.totalHours, 0)}
            </div>
            <p className="text-xs text-muted-foreground">ساعت این ماه</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">میانگین پیشرفت</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning persian-numbers">
              {Math.round(subjects.reduce((sum, subject) => sum + subject.monthlyProgress, 0) / subjects.length)}%
            </div>
            <p className="text-xs text-muted-foreground">از اهداف ماهانه</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">جلسات مطالعه</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary persian-numbers">
              {subjects.reduce((sum, subject) => sum + subject.sessionsCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">جلسه این ماه</p>
          </CardContent>
        </Card>
      </div>

      {/* Subjects Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.id} className="shadow-medium border-0 hover:shadow-strong transition-smooth">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-16 ${subject.color} rounded-full`}></div>
                  <div>
                    <CardTitle className="text-xl">{subject.name}</CardTitle>
                    <CardDescription>آخرین مطالعه: {subject.lastStudied}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>پیشرفت ماهانه</span>
                  <span className="persian-numbers">{subject.totalHours}/{subject.goalHours} ساعت</span>
                </div>
                <Progress value={subject.monthlyProgress} className="h-3" />
                <div className="text-center text-sm text-muted-foreground persian-numbers">
                  %{subject.monthlyProgress}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-primary persian-numbers">
                    {subject.sessionsCount}
                  </div>
                  <div className="text-xs text-muted-foreground">جلسه مطالعه</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-accent persian-numbers">
                    {formatMinutes(subject.avgSessionLength)}
                  </div>
                  <div className="text-xs text-muted-foreground">میانگین جلسه</div>
                </div>
              </div>

              {/* Weekly Chart */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  7 روز اخیر
                </h4>
                <div className="flex items-end gap-1 h-16">
                  {subject.weeklyHours.map((hours, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className={`w-full ${subject.color} rounded-t opacity-80 transition-all hover:opacity-100`}
                        style={{ height: `${(hours / Math.max(...subject.weeklyHours)) * 100}%` }}
                      ></div>
                      <span className="text-xs text-muted-foreground persian-numbers">
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">سرفصل‌های مطالعه شده:</h4>
                <div className="flex flex-wrap gap-2">
                  {subject.topics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button 
                  className="flex-1 shadow-soft" 
                  size="sm"
                >
                  شروع مطالعه
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 shadow-soft" 
                  size="sm"
                >
                  مشاهده جزئیات
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectManager;