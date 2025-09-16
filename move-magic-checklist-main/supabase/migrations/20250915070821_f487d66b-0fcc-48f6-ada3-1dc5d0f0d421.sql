-- Create a table for moving checklists
CREATE TABLE public.moving_checklists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('preparation', 'moving_day', 'after_moving')),
  d_day_range TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  has_guide BOOLEAN DEFAULT false,
  has_service BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.moving_checklists ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own checklists" 
ON public.moving_checklists 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own checklists" 
ON public.moving_checklists 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own checklists" 
ON public.moving_checklists 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own checklists" 
ON public.moving_checklists 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_moving_checklists_updated_at
BEFORE UPDATE ON public.moving_checklists
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default checklist items
INSERT INTO public.moving_checklists (user_id, title, description, category, d_day_range, has_guide, has_service) VALUES
-- 이사 사전 준비
('00000000-0000-0000-0000-000000000000', '이사업체 선정', '최소 3군데 견적 요청 후 예약 진행', 'preparation', 'D-60 ~ D-30', true, true),
('00000000-0000-0000-0000-000000000000', '입주청소 예약', '청소업체 미리 비교 예약', 'preparation', 'D-30 ~ D-20', true, true),
('00000000-0000-0000-0000-000000000000', '이사에 필요한 물품 구매', '박스, 테이프, 커터칼 등 필수 용품 준비', 'preparation', 'D-20 ~ D-14', true, true),
('00000000-0000-0000-0000-000000000000', '인터넷 이전 신청', '이사 당일 설치될 수 있도록 예약', 'preparation', 'D-14', true, false),
('00000000-0000-0000-0000-000000000000', '대형 폐기물 신고', '필요한 물품 폐기물 스티커 신청', 'preparation', 'D-7 ~ D-1', true, false),
('00000000-0000-0000-0000-000000000000', '쓰레기봉투 준비', '청소용 걸레, 봉투 등 마지막 정리용', 'preparation', 'D-1', false, true),
('00000000-0000-0000-0000-000000000000', '귀중품 챙기기', '현금, 귀중품, 서류는 따로 보관', 'preparation', 'D-1', true, false),
-- 이사 당일
('00000000-0000-0000-0000-000000000000', '관리비/전기/가스/수도 정산', '출발 전 계량기 사진 필수', 'moving_day', 'D-Day', true, false),
-- 입주 후 할 일
('00000000-0000-0000-0000-000000000000', '전기/가스/수도 등록', '입주 후 사용 등록 필수', 'after_moving', 'D+1 ~ D+3', true, false),
('00000000-0000-0000-0000-000000000000', '인터넷 설치', '기사 방문 설치 확인', 'after_moving', 'D+1 ~ D+3', false, true),
('00000000-0000-0000-0000-000000000000', '전입신고', '주소 변경 신고 (이사 후 14일 이내)', 'after_moving', 'D+1 ~ D+14', true, false);