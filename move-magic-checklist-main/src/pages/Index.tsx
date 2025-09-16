import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Home, Target } from "lucide-react";
import ChecklistSection from "@/components/ChecklistSection";

const Index = () => {
  const [movingDate, setMovingDate] = useState<string>("");

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 14); // 최소 14일 후

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
      {/* 히어로 섹션 */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
          <Home className="h-5 w-5 text-primary" />
          <span className="text-primary font-medium">체계적인 이사 준비</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
          스마트한 이사 준비
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          D-Day 기준으로 자동 생성되는 체크리스트로<br />
          놓치기 쉬운 이사 준비를 완벽하게 관리하세요
        </p>
      </div>

      {/* 이사 날짜 설정 */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>이사 날짜 설정</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              날짜를 설정하면 더 정확한 일정 관리가 가능합니다
            </p>
          </div>
          {movingDate && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMovingDate("")}
            >
              날짜 변경
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="moving-date">이사 예정일</Label>
            <Input
              id="moving-date"
              type="date"
              value={movingDate}
              onChange={(e) => setMovingDate(e.target.value)}
              min={minDate.toISOString().split('T')[0]}
            />
          </div>
          {movingDate && (
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {(() => {
                  const today = new Date();
                  const moving = new Date(movingDate);
                  const diffTime = moving.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays > 0 ? `D-${diffDays}` : diffDays === 0 ? "D-Day" : `D+${Math.abs(diffDays)}`;
                })()}
              </div>
              <div className="text-sm text-muted-foreground">이사일까지</div>
            </div>
          )}
        </div>
      </Card>

      {/* 체크리스트 */}
      <ChecklistSection movingDate={movingDate} />

      {/* 추가 정보 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 space-y-4">
          <Target className="h-8 w-8 text-primary" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">맞춤 가이드</h3>
            <p className="text-sm text-muted-foreground">
              각 항목별로 상세한 가이드와 팁을 제공합니다. 
              처음 이사하시는 분도 안심하고 준비하세요.
            </p>
          </div>
        </Card>
        
        <Card className="p-6 space-y-4">
          <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold">💼</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">제휴 서비스</h3>
            <p className="text-sm text-muted-foreground">
              이사업체, 청소업체, 인터넷 등 필요한 서비스를
              쉽고 빠르게 연결해드립니다.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
