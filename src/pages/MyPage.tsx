import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, CheckCircle, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ChecklistSection from "@/components/ChecklistSection";

const MyPage = () => {
  const [movingDate, setMovingDate] = useState<string>("");
  const { user } = useAuth();

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 20); // 최소 20일 후

  // D-Day 계산 함수
  const calculateDDay = (movingDate: string) => {
    const today = new Date();
    const targetDate = new Date(movingDate);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `D-${diffDays}`;
    } else if (diffDays === 0) {
      return 'D-Day';
    } else {
      return `D+${Math.abs(diffDays)}`;
    }
  };

  // 로컬 스토리지에서 이사날짜 가져오기
  useEffect(() => {
    const savedDate = localStorage.getItem('moving-date');
    if (savedDate) {
      setMovingDate(savedDate);
    }
  }, []);

  // 이사날짜 저장
  useEffect(() => {
    if (movingDate) {
      localStorage.setItem('moving-date', movingDate);
    }
  }, [movingDate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-slate-600">로그인이 필요합니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
        {/* 헤더 */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              안녕하세요, {user.user_metadata?.full_name || user.email?.split('@')[0]}님!
            </h1>
            <p className="text-slate-600">이사 준비를 시작해보세요</p>
          </div>
        </div>

        {/* 이사 날짜 설정 - 날짜 선택 전에만 표시 */}
        {!movingDate && (
          <Card className="p-8 bg-white rounded-container shadow-lg">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="h-6 w-6 text-purple-500" />
                  <h2 className="text-2xl font-bold text-slate-800">이사 날짜 설정</h2>
                </div>
                <p className="text-sm text-slate-600">
                  20일 이후부터 설정 가능합니다
                </p>
              </div>
              
              <div className="max-w-md mx-auto space-y-4">
                <div className="space-y-2">
                  <Input
                    id="moving-date"
                    type="date"
                    value={movingDate}
                    onChange={(e) => setMovingDate(e.target.value)}
                    min={minDate.toISOString().split('T')[0]}
                    className="h-12 text-center text-lg rounded-input"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* D-Day와 진행률을 나란히 표시 - D-Day 비율 축소 */}
        {movingDate && (
          <div className="grid gap-6 md:grid-cols-4">
            {/* D-Day 섹션 - 축소된 버전 (1/4 비율) */}
            <Card className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-container shadow-lg md:col-span-1">
              <div className="flex flex-col justify-center h-full space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  <h2 className="text-lg font-bold text-slate-800">이사 D-Day</h2>
                </div>
                <div className="text-lg font-bold text-slate-800 text-center">{movingDate} <span className="text-purple-600">({calculateDDay(movingDate)})</span></div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMovingDate("")}
                  className="text-slate-500 hover:text-slate-700"
                >
                  날짜 변경
                </Button>
              </div>
            </Card>

            {/* 진행률 섹션 - 막대만 표시 (3/4 비율) */}
            <Card className="p-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-container shadow-lg md:col-span-3">
              <div className="flex flex-col justify-center h-full space-y-4">
                <h2 className="text-xl font-bold text-slate-800 text-center">전체 진행률</h2>
                
                {/* 진행률 바와 완료 정보 */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-700">진행률</span>
                    <span className="text-2xl font-bold text-purple-600">0%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden border border-slate-300">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 min-w-[2px]" style={{width: '0%'}} />
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-slate-600">0개 완료 / 11개 전체</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

          {/* 날짜 선택 전: 홈화면 튜토리얼 */}
          {!movingDate && (
            <div className="space-y-6">
              {/* 3단계 한 화면에 표시 */}
              <div className="grid gap-6 md:grid-cols-3">
                
                {/* 1단계: 이사날짜 설정 */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-xl flex items-center justify-center mx-auto">
                      <Calendar className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-800">1단계: 이사날짜 설정</h3>
                      <p className="text-sm text-slate-600">이사 예정일을 입력하면 자동으로 체크리스트가 생성됩니다</p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl border border-primary/20">
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-primary">D-20</div>
                        <div className="text-slate-600 text-sm">이사일까지</div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 2단계: 체크리스트 생성 */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mx-auto">
                      <Target className="h-8 w-8 text-green-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-800">2단계: 체크리스트 생성</h3>
                      <p className="text-sm text-slate-600">이사날짜에 맞는 개인 맞춤 체크리스트가 자동 생성됩니다</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg mb-1">📦</div>
                        <div className="font-semibold text-blue-800 text-sm">이사 사전 준비</div>
                        <div className="text-xs text-blue-600">7개 항목</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-lg mb-1">🚚</div>
                        <div className="font-semibold text-orange-800 text-sm">이사 당일</div>
                        <div className="text-xs text-orange-600">1개 항목</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg mb-1">✨</div>
                        <div className="font-semibold text-green-800 text-sm">입주 후 할 일</div>
                        <div className="text-xs text-green-600">3개 항목</div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 3단계: 체크리스트 관리 */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <div className="space-y-4">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-purple-500" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">3단계: 체크리스트 관리</h3>
                      <p className="text-sm text-slate-600">단계별로 체크하며 진행률을 실시간으로 확인하세요</p>
                    </div>
                    
                    {/* 진행률 표시 */}
                    <div className="text-center space-y-2">
                      <div className="text-xl font-bold text-primary">0%</div>
                      <div className="text-slate-600 text-sm">전체 진행률</div>
                      <div className="w-20 h-2 bg-slate-200 rounded-full mx-auto overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full" style={{width: '0%'}}></div>
                      </div>
                    </div>

                    {/* 체크리스트 미리보기 */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 border-2 border-slate-300 rounded"></div>
                          <span className="text-xs font-medium text-slate-600">이사업체 선정</span>
                        </div>
                        <Badge variant="outline" className="bg-slate-50 text-slate-600 text-xs">대기중</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 border-2 border-slate-300 rounded"></div>
                          <span className="text-xs font-medium text-slate-600">인터넷 이전 신청</span>
                        </div>
                        <Badge variant="outline" className="bg-slate-50 text-slate-600 text-xs">대기중</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* 날짜 선택 후: 체크리스트 */}
          {movingDate && (
            <div id="checklist-section">
              <ChecklistSection movingDate={movingDate} />
            </div>
          )}
      </div>
    </div>
  );
};

export default MyPage;
