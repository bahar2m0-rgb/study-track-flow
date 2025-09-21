import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Clock, Trophy, Target, TrendingUp, Calendar } from "lucide-react";

const StudyDashboard = () => {
  // Mock data - در نسخه واقعی از دیتابیس می‌آید
  const weeklyData = [
    { day: "شنبه", minutes: 120 },
    { day: "یکشنبه", minutes: 95 },
    { day: "دوشنبه", minutes: 180 },
    { day: "سه‌شنبه", minutes: 75 },
    { day: "چهارشنبه", minutes: 200 },
    { day: "پنج‌شنبه", minutes: 150 },
    { day: "جمعه", minutes: 90 },
  ];

  const subjectProgress = [
    { subject: "ریاضی", hours: 24, goal: 30, color: "bg-primary" },
    { subject: "فیزیک", hours: 18, goal: 25, color: "bg-accent" },
    { subject: "شیمی", hours: 15, goal: 20, color: "bg-warning" },
    { subject: "انگلیسی", hours: 12, goal: 15, color: "bg-secondary" },
  ];

  const achievements = [
    { title: "هفته پرتلاش", icon: Trophy, description: "7 روز متوالی مطالعه" },
    { title: "تمرکز طلایی", icon: Target, description: "5 ساعت مطالعه بدون وقفه" },
    { title: "صعود رتبه", icon: TrendingUp, description: "بالاترین رتبه این ماه" },
  ];

  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="shadow-soft border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">مطالعه امروز</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3.2 ساعت</div>
            <p className="text-xs text-muted-foreground">+20% از دیروز</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">هدف هفتگی</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">18/25 ساعت</div>
            <Progress value={72} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">رتبه این هفته</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">#12</div>
            <p className="text-xs text-muted-foreground">از 245 نفر</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">روز‌های متوالی</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">7 روز</div>
            <p className="text-xs text-muted-foreground">رکورد جدید!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Chart */}
        <Card className="shadow-medium border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              آمار هفتگی
            </CardTitle>
            <CardDescription>زمان مطالعه در 7 روز گذشته</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium">{data.day}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="h-4 bg-gradient-primary rounded-full relative overflow-hidden flex-1 mr-2">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${(data.minutes / maxMinutes) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium persian-numbers">
                        {data.minutes} دقیقه
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject Progress */}
        <Card className="shadow-medium border-0">
          <CardHeader>
            <CardTitle>پیشرفت دروس</CardTitle>
            <CardDescription>وضعیت اهداف ماهانه</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {subjectProgress.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{subject.subject}</span>
                    <span className="text-sm text-muted-foreground persian-numbers">
                      {subject.hours}/{subject.goal} ساعت
                    </span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={(subject.hours / subject.goal) * 100} 
                      className="h-3"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-white persian-numbers">
                        %{Math.round((subject.hours / subject.goal) * 100)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="shadow-medium border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-warning" />
            دستاوردهای اخیر
          </CardTitle>
          <CardDescription>موفقیت‌های به دست آمده</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border shadow-soft"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-medium">
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Month Summary */}
      <Card className="shadow-medium border-0">
        <CardHeader>
          <CardTitle>خلاصه ماه جاری</CardTitle>
          <CardDescription>عملکرد کلی در ماه گذشته</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary persian-numbers">89</div>
              <div className="text-sm text-muted-foreground">ساعت مطالعه</div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                +15% رشد
              </Badge>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-accent persian-numbers">23</div>
              <div className="text-sm text-muted-foreground">روز فعال</div>
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                رکورد!
              </Badge>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-warning persian-numbers">156</div>
              <div className="text-sm text-muted-foreground">جلسه مطالعه</div>
              <Badge variant="secondary" className="bg-warning/10 text-warning">
                پایدار
              </Badge>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-secondary persian-numbers">4.2</div>
              <div className="text-sm text-muted-foreground">میانگین روزانه</div>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                عالی
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyDashboard;