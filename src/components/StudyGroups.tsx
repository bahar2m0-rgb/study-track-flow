import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Search, Star, Clock, TrendingUp, Plus, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudyGroups = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const studyGroups = [
    {
      id: 1,
      name: "گروه کنکور ریاضی 1403",
      description: "آماده‌سازی برای کنکور ریاضی با تمرکز روی مباحث کلیدی",
      members: 34,
      maxMembers: 50,
      level: "پیشرفته",
      subject: "ریاضی",
      avgStudyTime: 4.2,
      isJoined: true,
      rank: 2,
      weeklyGoal: 25,
      currentWeekly: 18,
      topMembers: [
        { name: "علی احمدی", hours: 23, avatar: "" },
        { name: "سارا محمدی", hours: 21, avatar: "" },
        { name: "شما", hours: 18, avatar: "", isCurrentUser: true },
      ]
    },
    {
      id: 2,
      name: "فیزیک دبیرستان",
      description: "حل مسائل فیزیک و تقویت مفاهیم پایه",
      members: 28,
      maxMembers: 40,
      level: "متوسط",
      subject: "فیزیک",
      avgStudyTime: 3.1,
      isJoined: false,
      weeklyGoal: 20,
    },
    {
      id: 3,
      name: "انگلیسی مکالمه",
      description: "تقویت مهارت مکالمه و واژگان انگلیسی",
      members: 19,
      maxMembers: 25,
      level: "مبتدی",
      subject: "انگلیسی",
      avgStudyTime: 2.8,
      isJoined: false,
      weeklyGoal: 15,
    },
    {
      id: 4,
      name: "شیمی آلی کاربردی",
      description: "مطالعه عمیق شیمی آلی برای داوطلبان علوم پزشکی",
      members: 42,
      maxMembers: 60,
      level: "پیشرفته",
      subject: "شیمی",
      avgStudyTime: 5.1,
      isJoined: true,
      rank: 5,
      weeklyGoal: 30,
      currentWeekly: 22,
    }
  ];

  const joinGroup = (groupId: number) => {
    toast({
      title: "درخواست عضویت ارسال شد",
      description: "بعد از تایید مدیر گروه، به گروه اضافه می‌شوید",
    });
  };

  const leaveGroup = (groupId: number) => {
    toast({
      title: "از گروه خارج شدید",
      description: "می‌توانید دوباره درخواست عضویت دهید",
      variant: "destructive",
    });
  };

  const filteredGroups = studyGroups.filter(group =>
    group.name.includes(searchTerm) || group.subject.includes(searchTerm)
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case "مبتدی": return "bg-secondary text-secondary-foreground";
      case "متوسط": return "bg-warning text-warning-foreground";
      case "پیشرفته": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            گروه‌های مطالعاتی
          </h1>
          <p className="text-muted-foreground mt-2">
            با دیگران مطالعه کنید و انگیزه خود را حفظ کنید
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-medium">
          <Plus className="w-4 h-4 mr-2" />
          ایجاد گروه جدید
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="جستجوی گروه‌ها..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10 shadow-soft"
        />
      </div>

      {/* My Groups */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          گروه‌های من
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {studyGroups.filter(group => group.isJoined).map((group) => (
            <Card key={group.id} className="shadow-medium border-0 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {group.name}
                      <Crown className="w-4 h-4 text-warning" />
                    </CardTitle>
                    <CardDescription className="mt-2">{group.description}</CardDescription>
                  </div>
                  <Badge className={getLevelColor(group.level)}>
                    {group.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>رتبه شما: #{group.rank}</span>
                  <span className="persian-numbers">{group.currentWeekly}/{group.weeklyGoal} ساعت</span>
                </div>
                
                {/* Top Members */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">برترین اعضا این هفته:</h4>
                  <div className="space-y-2">
                    {group.topMembers?.map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                          </div>
                          <span className={`text-sm ${member.isCurrentUser ? 'font-bold text-primary' : ''}`}>
                            {member.name}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground persian-numbers">
                          {member.hours} ساعت
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => leaveGroup(group.id)}
                    className="flex-1"
                  >
                    خروج از گروه
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex-1">مشاهده جزئیات</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{group.name}</DialogTitle>
                        <DialogDescription>{group.description}</DialogDescription>
                      </DialogHeader>
                      {/* Group details content */}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Groups */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">گروه‌های قابل عضویت</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.filter(group => !group.isJoined).map((group) => (
            <Card key={group.id} className="shadow-soft border-0 hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <CardDescription className="mt-2">{group.description}</CardDescription>
                  </div>
                  <Badge className={getLevelColor(group.level)}>
                    {group.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {group.members}/{group.maxMembers} عضو
                    </span>
                    <Badge variant="outline">{group.subject}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      میانگین مطالعه
                    </span>
                    <span className="persian-numbers">{group.avgStudyTime} ساعت/روز</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      هدف هفتگی
                    </span>
                    <span className="persian-numbers">{group.weeklyGoal} ساعت</span>
                  </div>
                </div>

                <Button 
                  className="w-full shadow-soft"
                  onClick={() => joinGroup(group.id)}
                  disabled={group.members >= group.maxMembers}
                >
                  {group.members >= group.maxMembers ? "گروه پر است" : "درخواست عضویت"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyGroups;