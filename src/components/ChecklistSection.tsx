import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Calendar, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import GuideModal from "./GuideModal";

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
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [selectedGuideItem, setSelectedGuideItem] = useState<{ id: string; title: string } | null>(null);

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
      // 로그인하지 않은 경우 빈 체크리스트
      setChecklist([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // 로그인된 사용자의 체크리스트를 데이터베이스에서 가져오기
      const { data, error } = await supabase
        .from('checklist_items')
        .select('*')
        .eq('user_id', user.id)
        .order('category', { ascending: true });

      if (error) {
        console.error('Error loading checklist:', error);
        // 에러 시 기본 체크리스트 생성
        await createDefaultChecklist();
      } else if (data && data.length > 0) {
        setChecklist(data);
      } else {
        // 데이터가 없으면 기본 체크리스트 생성
        await createDefaultChecklist();
      }
    } catch (error) {
      console.error('Error in loadChecklist:', error);
      await createDefaultChecklist();
    } finally {
      setLoading(false);
    }
  };

  const createDefaultChecklist = async () => {
    const defaultItems: Omit<ChecklistItem, 'id'>[] = [
      {
        title: "이사업체 선정",
        description: "최소 3군데 견적 요청 후 예약 진행",
        category: "preparation",
        d_day_range: "D-20 ~ D-15",
        completed: false,
        has_guide: true,
        has_service: true,
      },
      {
        title: "입주청소 예약",
        description: "청소업체 미리 비교 예약",
        category: "preparation",
        d_day_range: "D-15 ~ D-10",
        completed: false,
        has_guide: true,
        has_service: true,
      },
      {
        title: "이사에 필요한 물품 구매",
        description: "박스, 테이프, 커터칼 등 필수 용품 준비",
        category: "preparation",
        d_day_range: "D-10 ~ D-7",
        completed: false,
        has_guide: true,
        has_service: true,
      },
      {
        title: "인터넷 이전 신청",
        description: "이사 당일 설치될 수 있도록 예약",
        category: "preparation",
        d_day_range: "D-7 ~ D-5",
        completed: false,
        has_guide: true,
        has_service: false,
      },
      {
        title: "대형 폐기물 신고",
        description: "필요한 물품 폐기물 스티커 신청",
        category: "preparation",
        d_day_range: "D-5 ~ D-2",
        completed: false,
        has_guide: true,
        has_service: false,
      },
      {
        title: "쓰레기봉투 준비",
        description: "청소용 걸레, 봉투 등 마지막 정리용",
        category: "preparation",
        d_day_range: "D-2 ~ D-1",
        completed: false,
        has_guide: false,
        has_service: true,
      },
      {
        title: "귀중품 챙기기",
        description: "현금, 귀중품, 서류는 따로 보관",
        category: "preparation",
        d_day_range: "D-1",
        completed: false,
        has_guide: true,
        has_service: false,
      },
      {
        title: "관리비/전기/가스/수도 정산",
        description: "출발 전 계량기 사진 필수",
        category: "moving_day",
        d_day_range: "D-Day",
        completed: false,
        has_guide: true,
        has_service: false,
      },
      {
        title: "전기/가스/수도 등록",
        description: "입주 후 사용 등록 필수",
        category: "after_moving",
        d_day_range: "D+1 ~ D+3",
        completed: false,
        has_guide: true,
        has_service: false,
      },
      {
        title: "인터넷 설치",
        description: "기사 방문 설치 확인",
        category: "after_moving",
        d_day_range: "D+1 ~ D+3",
        completed: false,
        has_guide: false,
        has_service: true,
      },
      {
        title: "전입신고",
        description: "주소 변경 신고 (이사 후 14일 이내)",
        category: "after_moving",
        d_day_range: "D+1 ~ D+14",
        completed: false,
        has_guide: true,
        has_service: false,
      }
    ];

    if (user) {
      try {
        const { data, error } = await supabase
          .from('checklist_items')
          .insert(
            defaultItems.map(item => ({
              ...item,
              user_id: user.id
            }))
          )
          .select();

        if (error) {
          console.error('Error creating default checklist:', error);
          setChecklist(defaultItems.map((item, index) => ({ ...item, id: `default-${index}` })));
        } else {
          setChecklist(data || []);
        }
      } catch (error) {
        console.error('Error in createDefaultChecklist:', error);
        setChecklist(defaultItems.map((item, index) => ({ ...item, id: `default-${index}` })));
      }
    }
  };

  const toggleItem = async (itemId: string) => {
    const updatedChecklist = checklist.map(item => 
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updatedChecklist);

    if (user) {
      try {
        const item = updatedChecklist.find(i => i.id === itemId);
        if (item) {
          await supabase
            .from('checklist_items')
            .update({ completed: item.completed })
            .eq('id', itemId);
        }
      } catch (error) {
        console.error('Error updating checklist item:', error);
      }
    }
  };

  const openGuideModal = (itemId: string, title: string) => {
    setSelectedGuideItem({ id: itemId, title });
    setGuideModalOpen(true);
  };

  const getProgressByCategory = (category: keyof typeof categoryInfo) => {
    const categoryItems = checklist.filter(item => item.category === category);
    const completedItems = categoryItems.filter(item => item.completed);
    return categoryItems.length > 0 ? (completedItems.length / categoryItems.length) * 100 : 0;
  };

  const getOverallProgress = () => {
    if (checklist.length === 0) return 0;
    const completedItems = checklist.filter(item => item.completed);
    return (completedItems.length / checklist.length) * 100;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600">체크리스트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (checklist.length === 0) {
    return (
      <Card className="p-8 bg-white rounded-container shadow-lg text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">체크리스트가 준비되지 않았습니다</h3>
            <p className="text-slate-600">
              이사 예정일을 설정하면<br />
              맞춤형 체크리스트가 생성됩니다.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8">

      {/* 카테고리별 체크리스트 */}
      {Object.entries(categoryInfo).map(([categoryKey, categoryData]) => {
        const categoryItems = checklist.filter(item => item.category === categoryKey);
        const progress = getProgressByCategory(categoryKey as keyof typeof categoryInfo);
        
        if (categoryItems.length === 0) return null;

        return (
          <Card key={categoryKey} className="p-6 bg-white rounded-container shadow-lg">
            <div className="space-y-6">
              {/* 카테고리 헤더 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${categoryData.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-2xl">{categoryData.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{categoryData.title}</h3>
                    <p className="text-sm text-slate-600">
                      {categoryItems.filter(item => item.completed).length} / {categoryItems.length} 완료
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-500">
                    {Math.round(progress)}%
                  </div>
                  <Progress value={progress} className="w-24 h-2" />
                </div>
              </div>

              {/* 체크리스트 아이템들 */}
              <div className="space-y-3">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center space-x-4 p-4 rounded-lg border transition-all ${
                      item.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-slate-50 border-slate-200 hover:bg-purple-50'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        item.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-slate-300 hover:border-purple-500'
                      }`}
                    >
                      {item.completed && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-medium ${
                          item.completed ? 'text-green-800 line-through' : 'text-slate-800'
                        }`}>
                          {item.title}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {item.d_day_range}
                        </Badge>
                      </div>
                      <p className={`text-sm mt-1 ${
                        item.completed ? 'text-green-600' : 'text-slate-600'
                      }`}>
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {item.has_guide && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openGuideModal(item.id, item.title)}
                          className="text-purple-500 hover:text-purple-600"
                        >
                          <Info className="w-4 h-4" />
                        </Button>
                      )}
                      {item.has_service && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        );
      })}

      {/* 가이드 모달 */}
      <GuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        itemId={selectedGuideItem?.id}
        title={selectedGuideItem?.title}
      />
    </div>
  );
};

export default ChecklistSection;