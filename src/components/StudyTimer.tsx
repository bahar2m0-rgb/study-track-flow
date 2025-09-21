import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, Square, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudyTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [studySessions, setStudySessions] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const subjects = [
    "ریاضی",
    "فیزیک", 
    "شیمی",
    "زبان انگلیسی",
    "ادبیات فارسی",
    "تاریخ",
    "جغرافیا",
    "علوم اجتماعی"
  ];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (!selectedSubject) {
      toast({
        title: "درس انتخاب کنید",
        description: "ابتدا یک درس برای مطالعه انتخاب کنید",
        variant: "destructive",
      });
      return;
    }
    
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setStudySessions(sessions => sessions + 1);
          setTotalStudyTime(total => total + (25 * 60 - prev));
          toast({
            title: "تبریک! 🎉",
            description: "یک جلسه مطالعه با موفقیت تمام شد",
            className: "celebrate",
          });
          return 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const stopTimer = () => {
    const studiedTime = (25 * 60) - timeLeft;
    if (studiedTime > 60) { // Only count if studied more than 1 minute
      setTotalStudyTime(total => total + studiedTime);
      toast({
        title: "زمان مطالعه ثبت شد",
        description: `${Math.floor(studiedTime / 60)} دقیقه برای درس ${selectedSubject} ثبت شد`,
      });
    }
    resetTimer();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Timer Card */}
      <Card className="shadow-medium border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            تایمر مطالعه
          </CardTitle>
          <CardDescription className="text-lg">
            تکنیک پومودورو برای تمرکز بهتر
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Subject Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">انتخاب درس:</label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="درس مورد نظر را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Timer Display */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-64 h-64">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  className="text-primary transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold font-mono persian-numbers">
                    {formatTime(timeLeft)}
                  </div>
                  {selectedSubject && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {selectedSubject}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex justify-center gap-4">
            {!isRunning ? (
              <Button 
                onClick={startTimer} 
                size="lg"
                className="bg-gradient-primary hover:opacity-90 shadow-medium px-8"
              >
                <Play className="w-5 h-5 mr-2" />
                شروع
              </Button>
            ) : (
              <Button 
                onClick={pauseTimer} 
                size="lg"
                variant="outline"
                className="shadow-soft px-8"
              >
                <Pause className="w-5 h-5 mr-2" />
                توقف
              </Button>
            )}
            
            <Button 
              onClick={resetTimer} 
              size="lg"
              variant="outline"
              className="shadow-soft"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              ریست
            </Button>
            
            <Button 
              onClick={stopTimer} 
              size="lg"
              variant="secondary"
              className="shadow-soft"
            >
              <Square className="w-5 h-5 mr-2" />
              پایان جلسه
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-soft border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-primary">
              {studySessions}
            </CardTitle>
            <CardDescription>جلسات مطالعه امروز</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="shadow-soft border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-accent">
              {Math.floor(totalStudyTime / 60)}
            </CardTitle>
            <CardDescription>دقیقه مطالعه امروز</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="shadow-soft border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-warning">
              {selectedSubject || "---"}
            </CardTitle>
            <CardDescription>درس فعلی</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default StudyTimer;