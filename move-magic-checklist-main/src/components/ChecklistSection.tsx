import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Calendar, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: "preparation" | "moving_day" | "after_moving";
  d_day_range: string;
  completed: boolean;
  has_guide: boolean;
  has_service: boolean;
}

interface ChecklistSectionProps {
  movingDate: string;
}

const ChecklistSection = ({ movingDate }: ChecklistSectionProps) => {
  const { user } = useAuth();
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryInfo = {
    preparation: { title: "이사 사전 준비", emoji: "📦", color: "bg-blue-500" },
    moving_day: { title: "이사 당일", emoji: "📦", color: "bg-orange-500" },
    after_moving: { title: "입주 후 할 일", emoji: "✨", color: "bg-green-500" }
  };

  useEffect(() => {
    loadChecklist();
  }, [user]);

  const loadChecklist = async () => {
    if (!user) {
      // 로그인하지 않은 경우 기본 체크리스트 표시
      setChecklist([
        {
          id: "prep-1",
          title: "이사업체 선정",
          description: "최소 3군데 견적 요청 후 예약 진행",
          category: "preparation",
          d_day_range: "D-60 ~ D-30",
          completed: false,
          has_guide: true,
          has_service: true,
        },
        {
          id: "prep-2",
          title: "입주청소 예약",
          description: "청소업체 미리 비교 예약",
          category: "preparation",
          d_day_range: "D-30 ~ D-20",
          completed: false,
          has_guide: true,
          has_service: true,
        },
        {
          id: "prep-3",
          title: "이사에 필요한 물품 구매",
          description: "박스, 테이프, 커터칼 등 필수 용품 준비",
          category: "preparation",
          d_day_range: "D-20 ~ D-14",
          completed: false,
          has_guide: true,
          has_service: true,
        },
        {
          id: "prep-4",
          title: "인터넷 이전 신청",
          description: "이사 당일 설치될 수 있도록 예약",
          category: "preparation",
          d_day_range: "D-14",
          completed: false,
          has_guide: true,
          has_service: false,
        },
        {
          id: "prep-5",
          title: "대형 폐기물 신고",
          description: "필요한 물품 폐기물 스티커 신청",
          category: "preparation",
          d_day_range: "D-7 ~ D-1",
          completed: false,
          has_guide: true,
          has_service: false,
        },
        {
          id: "prep-6",
          title: "쓰레기봉투 준비",
          description: "청소용 걸레, 봉투 등 마지막 정리용",
          category: "preparation",
          d_day_range: "D-1",
          completed: false,
          has_guide: false,
          has_service: true,
        },
        {
          id: "prep-7",
          title: "귀중품 챙기기",
          description: "현금, 귀중품, 서류는 따로 보관",
          category: "preparation",
          d_day_range: "D-1",
          completed: false,
          has_guide: true,
          has_service: false,
        },
        {
          id: "moving-1",
          title: "관리비/전기/가스/수도 정산",
          description: "출발 전 계량기 사진 필수",
          category: "moving_day",
          d_day_range: "D-Day",
          completed: false,
          has_guide: true,
          has_service: false,
        },
        {
          id: "after-1",
          title: "전기/가스/수도 등록",
          description: "입주 후 사용 등록 필수",
          category: "after_moving",
          d_day_range: "D+1 ~ D+3",
          completed: false,
          has_guide: true,
          has_service: false,
        },
        {
          id: "after-2",
          title: "인터넷 설치",
          description: "기사 방문 설치 확인",
          category: "after_moving",
          d_day_range: "D+1 ~ D+3",
          completed: false,
          has_guide: false,
          has_service: true,
        },
        {
          id: "after-3",
          title: "전입신고",
          description: "주소 변경 신고 (이사 후 14일 이내)",
          category: "after_moving",
          d_day_range: "D+1 ~ D+14",
          completed: false,
          has_guide: true,
          has_service: false,
        },
      ]);
      setLoading(false);
      return;
    }

    // 로그인한 경우 사용자 체크리스트 로드
    const { data, error } = await supabase
      .from('moving_checklists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at');

    if (error) {
      console.error('Error loading checklist:', error);
    } else if (data && data.length > 0) {
      setChecklist(data as ChecklistItem[]);
    } else {
      // 사용자의 첫 체크리스트 생성
      await createUserChecklist();
    }
    setLoading(false);
  };

  const createUserChecklist = async () => {
    if (!user) return;

    const defaultItems = [
      { title: "이사업체 선정", description: "최소 3군데 견적 요청 후 예약 진행", category: "preparation", d_day_range: "D-60 ~ D-30", has_guide: true, has_service: true },
      { title: "입주청소 예약", description: "청소업체 미리 비교 예약", category: "preparation", d_day_range: "D-30 ~ D-20", has_guide: true, has_service: true },
      { title: "이사에 필요한 물품 구매", description: "박스, 테이프, 커터칼 등 필수 용품 준비", category: "preparation", d_day_range: "D-20 ~ D-14", has_guide: true, has_service: true },
      { title: "인터넷 이전 신청", description: "이사 당일 설치될 수 있도록 예약", category: "preparation", d_day_range: "D-14", has_guide: true, has_service: false },
      { title: "대형 폐기물 신고", description: "필요한 물품 폐기물 스티커 신청", category: "preparation", d_day_range: "D-7 ~ D-1", has_guide: true, has_service: false },
      { title: "쓰레기봉투 준비", description: "청소용 걸레, 봉투 등 마지막 정리용", category: "preparation", d_day_range: "D-1", has_guide: false, has_service: true },
      { title: "귀중품 챙기기", description: "현금, 귀중품, 서류는 따로 보관", category: "preparation", d_day_range: "D-1", has_guide: true, has_service: false },
      { title: "관리비/전기/가스/수도 정산", description: "출발 전 계량기 사진 필수", category: "moving_day", d_day_range: "D-Day", has_guide: true, has_service: false },
      { title: "전기/가스/수도 등록", description: "입주 후 사용 등록 필수", category: "after_moving", d_day_range: "D+1 ~ D+3", has_guide: true, has_service: false },
      { title: "인터넷 설치", description: "기사 방문 설치 확인", category: "after_moving", d_day_range: "D+1 ~ D+3", has_guide: false, has_service: true },
      { title: "전입신고", description: "주소 변경 신고 (이사 후 14일 이내)", category: "after_moving", d_day_range: "D+1 ~ D+14", has_guide: true, has_service: false },
    ];

    const itemsToInsert = defaultItems.map(item => ({
      ...item,
      user_id: user.id,
    }));

    const { data, error } = await supabase
      .from('moving_checklists')
      .insert(itemsToInsert)
      .select();

    if (error) {
      console.error('Error creating checklist:', error);
    } else if (data) {
      setChecklist(data as ChecklistItem[]);
    }
  };

  const toggleItem = async (id: string) => {
    if (!user) return;

    const item = checklist.find(item => item.id === id);
    if (!item) return;

    const { error } = await supabase
      .from('moving_checklists')
      .update({ completed: !item.completed })
      .eq('id', id);

    if (error) {
      console.error('Error updating checklist item:', error);
    } else {
      setChecklist(prev =>
        prev.map(item =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    }
  };

  const getItemsByCategory = (category: keyof typeof categoryInfo) => {
    return checklist.filter(item => item.category === category);
  };

  const getCompletedCount = (category: keyof typeof categoryInfo) => {
    return getItemsByCategory(category).filter(item => item.completed).length;
  };

  const getTotalCount = (category: keyof typeof categoryInfo) => {
    return getItemsByCategory(category).length;
  };

  const getDDay = () => {
    if (!movingDate) return 0;
    const today = new Date();
    const moving = new Date(movingDate);
    const diffTime = moving.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const dDay = getDDay();

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-16 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 진행률 표시 */}
      {movingDate && (
        <Card className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {dDay > 0 ? `D-${dDay}` : dDay === 0 ? "D-Day" : `D+${Math.abs(dDay)}`}
              </div>
              <div className="flex items-center justify-center space-x-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">이사일까지</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {Math.round((checklist.filter(item => item.completed).length / checklist.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">전체 진행률</div>
              <Progress 
                value={(checklist.filter(item => item.completed).length / checklist.length) * 100} 
                className="mt-3" 
              />
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {checklist.filter(item => item.completed).length}/{checklist.length}
              </div>
              <div className="text-sm text-muted-foreground">완료된 항목</div>
            </div>
          </div>
        </Card>
      )}

      {/* 카테고리별 체크리스트 */}
      {Object.entries(categoryInfo).map(([category, info]) => {
        const items = getItemsByCategory(category as keyof typeof categoryInfo);
        const completedCount = getCompletedCount(category as keyof typeof categoryInfo);
        const totalCount = getTotalCount(category as keyof typeof categoryInfo);

        return (
          <Card key={category} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${info.color}`}></div>
                <h3 className="text-xl font-semibold">{info.emoji} {info.title}</h3>
                <Badge variant="secondary">
                  {completedCount}/{totalCount}개 완료
                </Badge>
              </div>
              <Progress value={(completedCount / totalCount) * 100} className="w-24" />
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start space-x-4 p-4 rounded-lg border transition-all ${
                    item.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-background border-border hover:bg-muted/50"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="flex-shrink-0 mt-1"
                    disabled={!user}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                        {item.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {item.d_day_range}
                      </Badge>
                    </div>
                    <p className={`text-sm ${item.completed ? "line-through text-muted-foreground" : "text-muted-foreground"}`}>
                      {item.description}
                    </p>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      {item.has_guide && (
                        <Button variant="outline" size="sm">
                          <Info className="h-4 w-4 mr-1" />
                          가이드
                        </Button>
                      )}
                      {item.has_service && (
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          서비스
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      })}

      {!user && (
        <Card className="p-6 text-center border-dashed border-2">
          <p className="text-muted-foreground mb-4">
            로그인하시면 개인 맞춤 체크리스트를 저장하고 관리할 수 있습니다.
          </p>
          <Button>구글 로그인하고 시작하기</Button>
        </Card>
      )}
    </div>
  );
};

export default ChecklistSection;