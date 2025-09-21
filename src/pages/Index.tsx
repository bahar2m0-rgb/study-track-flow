import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Trophy, BookOpen, Timer, BarChart3 } from "lucide-react";
import StudyTimer from "@/components/StudyTimer";
import StudyDashboard from "@/components/StudyDashboard";
import StudyGroups from "@/components/StudyGroups";
import SubjectManager from "@/components/SubjectManager";

const Index = () => {
  const [activeTab, setActiveTab] = useState("timer");

  return (
    <div className="min-h-screen bg-background font-persian" dir="rtl">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            پلتفرم مطالعه هوشمند
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            زمان مطالعه خود را ثبت کنید، با دوستان رقابت کنید و پیشرفت خود را پیگیری کنید
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm text-lg px-8 py-3"
            >
              شروع مطالعه
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-3"
            >
              مشاهده گروه‌ها
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-1 py-4">
            {[
              { id: "timer", label: "تایمر مطالعه", icon: Timer },
              { id: "dashboard", label: "داشبورد", icon: BarChart3 },
              { id: "subjects", label: "دروس من", icon: BookOpen },
              { id: "groups", label: "گروه‌های مطالعاتی", icon: Users },
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? "default" : "ghost"}
                onClick={() => setActiveTab(id)}
                className="flex items-center gap-2 px-6 py-3 text-base transition-spring"
              >
                <Icon className="w-5 h-5" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "timer" && <StudyTimer />}
        {activeTab === "dashboard" && <StudyDashboard />}
        {activeTab === "subjects" && <SubjectManager />}
        {activeTab === "groups" && <StudyGroups />}
      </div>

      {/* Features Section */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">ویژگی‌های کلیدی</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: "ثبت زمان دقیق",
                description: "زمان مطالعه خود را با کرنومتر دقیق ثبت کنید"
              },
              {
                icon: Trophy,
                title: "رقابت سالم",
                description: "با دوستان و سایر کاربران رقابت کنید"
              },
              {
                icon: Users,
                title: "گروه‌های مطالعاتی",
                description: "در گروه‌های مطالعاتی عضو شوید"
              },
              {
                icon: BarChart3,
                title: "آمار پیشرفت",
                description: "پیشرفت خود را با نمودارهای جذاب ببینید"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center shadow-soft hover:shadow-medium transition-smooth border-0">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Notice */}
      <div className="py-12 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">آماده شروع هستید؟</h3>
          <p className="text-lg mb-6 opacity-90">
            برای استفاده از تمام امکانات پلتفرم، ابتدا پرداخت کارت به کارت خود را انجام دهید
          </p>
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-3"
          >
            پرداخت و شروع
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;