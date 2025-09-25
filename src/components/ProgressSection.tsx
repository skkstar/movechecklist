import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface ProgressSectionProps {
  totalItems: number;
  completedItems: number;
  dDay: number;
}

const ProgressSection = ({ totalItems, completedItems, dDay }: ProgressSectionProps) => {
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  
  const getDDayStatus = () => {
    if (dDay > 7) return { text: "여유 있음", color: "text-success", icon: CheckCircle2 };
    if (dDay > 0) return { text: "서둘러야 함", color: "text-warning", icon: AlertCircle };
    return { text: "이사 당일", color: "text-destructive", icon: Clock };
  };

  const status = getDDayStatus();
  const StatusIcon = status.icon;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-6 text-center">
        <div className="text-3xl font-bold text-primary mb-2">
          {dDay > 0 ? `D-${dDay}` : dDay === 0 ? "D-Day" : `D+${Math.abs(dDay)}`}
        </div>
        <div className={`flex items-center justify-center space-x-1 ${status.color}`}>
          <StatusIcon className="h-4 w-4" />
          <span className="text-sm font-medium">{status.text}</span>
        </div>
      </Card>
      
      <Card className="p-6 text-center">
        <div className="text-3xl font-bold text-primary mb-2">
          {progressPercentage}%
        </div>
        <div className="text-sm text-muted-foreground">전체 진행률</div>
        <Progress value={progressPercentage} className="mt-3" />
      </Card>
      
      <Card className="p-6 text-center">
        <div className="text-3xl font-bold text-primary mb-2">
          {completedItems}/{totalItems}
        </div>
        <div className="text-sm text-muted-foreground">완료된 항목</div>
      </Card>
    </div>
  );
};

export default ProgressSection;