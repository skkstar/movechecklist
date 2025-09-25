import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Target, CheckCircle, Clock, Users, X, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import ChecklistSection from "@/components/ChecklistSection";

const Index = () => {
  const [movingDate, setMovingDate] = useState<string>("");
  const [showChecklistTutorial, setShowChecklistTutorial] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 14); // 최소 14일 후

  // 로컬 스토리지에서 튜토리얼 확인 상태 가져오기
  useEffect(() => {
    const seen = localStorage.getItem('checklist-tutorial-seen');
    setHasSeenTutorial(seen === 'true');
  }, []);

  // 이사날짜가 입력되고 로그인된 상태일 때 튜토리얼 표시
  useEffect(() => {
    if (movingDate && user && !hasSeenTutorial) {
      const timer = setTimeout(() => {
        setShowChecklistTutorial(true);
      }, 2000); // 2초 후 표시
      return () => clearTimeout(timer);
    }
  }, [movingDate, user, hasSeenTutorial]);

  // 디버깅용 로그
  useEffect(() => {
    console.log('Tutorial state:', { movingDate, user: !!user, hasSeenTutorial, showChecklistTutorial });
  }, [movingDate, user, hasSeenTutorial, showChecklistTutorial]);

  // 튜토리얼 닫기 핸들러
  const handleCloseTutorial = () => {
    setShowChecklistTutorial(false);
    setHasSeenTutorial(true);
    localStorage.setItem('checklist-tutorial-seen', 'true');
  };

  // 체크리스트 시작하기 핸들러
  const handleStartChecklist = () => {
    setShowChecklistTutorial(false);
    setHasSeenTutorial(true);
    localStorage.setItem('checklist-tutorial-seen', 'true');
    // 체크리스트 섹션으로 스크롤
    const checklistElement = document.getElementById('checklist-section');
    if (checklistElement) {
      checklistElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { label: "완료된 체크리스트", value: "1,234", icon: CheckCircle },
    { label: "평균 준비 기간", value: "30일", icon: Clock },
    { label: "만족한 사용자", value: "98%", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 space-y-12 max-w-7xl">
        {/* 히어로 섹션 */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            스마트한 이사 준비
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            D-Day 기준으로 자동 생성되는 체크리스트로<br />
            놓치기 쉬운 이사 준비를 완벽하게 관리하세요
          </p>
          
          {/* 통계 */}
          <div className="flex justify-center items-center space-x-8 pt-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <IconComponent className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 체크리스트 튜토리얼 */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-slate-600">단계별로 체크하며 완벽한 이사 준비를 해보세요</p>
          </div>
          
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
                    <div className="text-2xl font-bold text-primary">D-30</div>
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
                  <div className="text-xl font-bold text-primary">75%</div>
                  <div className="text-slate-600 text-sm">전체 진행률</div>
                  <div className="w-20 h-2 bg-slate-200 rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full animate-pulse" style={{width: '75%'}}></div>
                  </div>
                </div>

                {/* 체크리스트 미리보기 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-xs font-medium text-green-800">이사업체 선정</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-600 text-xs">완료</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 border-2 border-slate-300 rounded animate-pulse"></div>
                      <span className="text-xs font-medium text-slate-600">인터넷 이전 신청</span>
                    </div>
                    <Badge variant="outline" className="bg-slate-50 text-slate-600 text-xs">진행중</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {!user && (
            <div className="text-center">
              <Button onClick={signInWithGoogle} size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                로그인하고 체크리스트 시작하기
              </Button>
            </div>
          )}
        </div>

        {/* 이사 날짜 설정 - 로그인 후에만 표시 */}
        {user && (
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-slate-800">이사 날짜 설정</h2>
                </div>
                <p className="text-slate-600">
                  날짜를 설정하면 더 정확한 일정 관리가 가능합니다
                </p>
              </div>
              
              <div className="max-w-md mx-auto space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="moving-date" className="text-slate-700 font-medium">이사 예정일</Label>
                  <Input
                    id="moving-date"
                    type="date"
                    value={movingDate}
                    onChange={(e) => setMovingDate(e.target.value)}
                    min={minDate.toISOString().split('T')[0]}
                    className="h-12 text-center text-lg"
                  />
                </div>
                
                {movingDate && (
                  <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl border border-primary/20">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {(() => {
                        const today = new Date();
                        const moving = new Date(movingDate);
                        const diffTime = moving.getTime() - today.getTime();
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        return diffDays > 0 ? `D-${diffDays}` : diffDays === 0 ? "D-Day" : `D+${Math.abs(diffDays)}`;
                      })()}
                    </div>
                    <div className="text-slate-600 font-medium">이사일까지</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMovingDate("")}
                      className="mt-3 text-slate-500 hover:text-slate-700"
                    >
                      날짜 변경
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* 체크리스트 */}
        {user && movingDate ? (
          <div id="checklist-section">
            <ChecklistSection movingDate={movingDate} />
          </div>
        ) : user && !movingDate ? (
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mx-auto">
                <Calendar className="h-8 w-8 text-orange-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-800">이사날짜를 설정해주세요</h3>
                <p className="text-slate-600">
                  이사 예정일을 입력하시면<br />
                  맞춤형 체크리스트가 생성됩니다.
                </p>
              </div>
            </div>
          </Card>
        ) : null}


        {/* 추가 정보 */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">맞춤 가이드</h3>
                <p className="text-sm text-slate-600">
                  각 항목별로 상세한 가이드와 팁을 제공합니다. 
                  처음 이사하시는 분도 안심하고 준비하세요.
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                <span className="text-primary font-bold text-xl">💼</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">제휴 서비스</h3>
                <p className="text-sm text-slate-600">
                  이사업체, 청소업체, 인터넷 등 필요한 서비스를
                  쉽고 빠르게 연결해드립니다.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 체크리스트 튜토리얼 팝업 */}
      <Dialog open={showChecklistTutorial} onOpenChange={setShowChecklistTutorial}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-slate-800">
                🎉 체크리스트가 준비되었습니다!
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseTutorial}
                className="p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="text-base text-slate-600">
              이사날짜에 맞는 개인 맞춤 체크리스트가 생성되었습니다.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* 체크리스트 미리보기 */}
            <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">이사 사전 준비</h3>
                <Badge variant="secondary">0/7개 완료</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 bg-white/80 rounded-lg">
                  <div className="w-4 h-4 border-2 border-slate-300 rounded"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">이사업체 선정</p>
                    <p className="text-xs text-slate-500">최소 3군데 견적 요청 후 예약 진행</p>
                  </div>
                  <Badge variant="outline" className="text-xs">D-60 ~ D-30</Badge>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white/80 rounded-lg">
                  <div className="w-4 h-4 border-2 border-slate-300 rounded"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">입주청소 예약</p>
                    <p className="text-xs text-slate-500">청소업체 미리 비교 예약</p>
                  </div>
                  <Badge variant="outline" className="text-xs">D-30 ~ D-20</Badge>
                </div>
              </div>
            </div>

            {/* 기능 소개 */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">개인 맞춤 관리</h4>
                  <p className="text-sm text-slate-600">체크리스트가 개인 계정에 저장됩니다</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">D-Day 기준 관리</h4>
                  <p className="text-sm text-slate-600">이사날짜에 맞는 일정으로 관리됩니다</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={handleCloseTutorial}>
              나중에 보기
            </Button>
            <Button onClick={handleStartChecklist} className="flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>체크리스트 시작하기</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
