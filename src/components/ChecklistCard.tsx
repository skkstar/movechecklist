import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Info } from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  dDay: number;
  category: "준비" | "신청" | "정리" | "확인";
  completed: boolean;
  hasGuide?: boolean;
  hasService?: boolean;
}

interface ChecklistCardProps {
  item: ChecklistItem;
  onToggle: (id: string) => void;
}

const ChecklistCard = ({ item, onToggle }: ChecklistCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "준비": return "bg-blue-100 text-blue-800";
      case "신청": return "bg-green-100 text-green-800";
      case "정리": return "bg-orange-100 text-orange-800";
      case "확인": return "bg-purple-100 text-purple-800";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getDDayText = (dDay: number) => {
    if (dDay > 0) return `D-${dDay}`;
    if (dDay === 0) return "D-Day";
    return `D+${Math.abs(dDay)}`;
  };

  return (
    <Card className={`p-4 transition-all hover:shadow-md ${
      item.completed ? "bg-success/5 border-success/30" : ""
    }`}>
      <div className="flex items-start space-x-3">
        <Checkbox
          checked={item.completed}
          onCheckedChange={() => onToggle(item.id)}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-semibold ${
              item.completed ? "line-through text-muted-foreground" : ""
            }`}>
              {item.title}
            </h3>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className={getCategoryColor(item.category)}>
                {item.category}
              </Badge>
              <Badge variant="outline" className="font-mono">
                {getDDayText(item.dDay)}
              </Badge>
            </div>
          </div>
          
          <p className={`text-sm mb-3 ${
            item.completed ? "line-through text-muted-foreground" : "text-muted-foreground"
          }`}>
            {item.description}
          </p>
          
          <div className="flex items-center space-x-2">
            {item.hasGuide && (
              <Button variant="outline" size="sm" className="text-xs">
                <Info className="h-3 w-3 mr-1" />
                가이드
              </Button>
            )}
            {item.hasService && (
              <Button variant="outline" size="sm" className="text-xs">
                <ExternalLink className="h-3 w-3 mr-1" />
                서비스 연결
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChecklistCard;