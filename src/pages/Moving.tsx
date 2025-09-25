import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Sparkles, Wifi, Phone, Star, ExternalLink } from "lucide-react";

const Moving = () => {
  const services = [
    {
      category: "이사업체",
      icon: Truck,
      items: [
        {
          name: "24시 이사센터",
          rating: 4.8,
          reviews: 1234,
          price: "20만원~",
          features: ["포장이사", "보험가입", "24시간 상담"],
          discount: "첫 이용 10% 할인"
        },
        {
          name: "안전이사",
          rating: 4.7,
          reviews: 987,
          price: "18만원~",
          features: ["일반이사", "포장서비스", "무료견적"],
          discount: "이사요 특가 15% 할인"
        },
        {
          name: "빠른이사",
          rating: 4.6,
          reviews: 756,
          price: "16만원~",
          features: ["원룸전문", "당일예약", "저렴한 가격"],
          discount: "학생할인 20%"
        }
      ]
    },
    {
      category: "청소업체",
      icon: Sparkles,
      items: [
        {
          name: "깔끔청소",
          rating: 4.9,
          reviews: 2145,
          price: "8만원~",
          features: ["입주청소", "사전방문", "만족보장"],
          discount: "이사요 회원 20% 할인"
        },
        {
          name: "완벽청소",
          rating: 4.8,
          reviews: 1876,
          price: "7만원~",
          features: ["원룸청소", "당일가능", "친환경세제"],
          discount: "첫 이용 25% 할인"
        },
        {
          name: "프로청소",
          rating: 4.7,
          reviews: 1456,
          price: "9만원~",
          features: ["전문청소", "보험가입", "A/S보장"],
          discount: "정기청소 30% 할인"
        }
      ]
    },
    {
      category: "통신서비스",
      icon: Wifi,
      items: [
        {
          name: "KT 인터넷",
          rating: 4.5,
          reviews: 5432,
          price: "월 2.9만원~",
          features: ["기가인터넷", "무료설치", "공유기제공"],
          discount: "신규가입 3개월 무료"
        },
        {
          name: "SK브로드밴드",
          rating: 4.4,
          reviews: 4321,
          price: "월 3.2만원~",
          features: ["초고속인터넷", "Wi-Fi6", "24시간AS"],
          discount: "이사고객 특가 50% 할인"
        },
        {
          name: "LG U+",
          rating: 4.3,
          reviews: 3210,
          price: "월 2.7만원~",
          features: ["광인터넷", "무료체험", "멀티플랫폼"],
          discount: "결합상품 할인"
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
      {/* 헤더 */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">이사 & 청소 서비스</h1>
        <p className="text-xl text-muted-foreground">
          검증된 업체들과 특별 할인 혜택을 만나보세요
        </p>
      </div>

      {/* 서비스별 섹션 */}
      {services.map((serviceCategory) => {
        const IconComponent = serviceCategory.icon;
        return (
          <div key={serviceCategory.category} className="space-y-6">
            <div className="flex items-center space-x-3">
              <IconComponent className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">{serviceCategory.category}</h2>
              <Badge variant="secondary" className="ml-2">
                {serviceCategory.items.length}개 업체
              </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {serviceCategory.items.map((service, index) => (
                <Card key={index} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{service.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({service.reviews.toLocaleString()}명)
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                      {service.discount}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">시작 가격</span>
                      <span className="text-lg font-bold text-primary">{service.price}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      전화상담
                    </Button>
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      예약하기
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {/* 이용 가이드 */}
      <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">💡 이용 가이드</h3>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="space-y-2">
              <div className="font-medium text-primary">1. 견적 비교</div>
              <p className="text-muted-foreground">
                최소 3곳에서 견적을 받아 비교해보세요
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-primary">2. 리뷰 확인</div>
              <p className="text-muted-foreground">
                실제 후기와 평점을 꼼꼼히 확인하세요
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-primary">3. 할인 혜택</div>
              <p className="text-muted-foreground">
                이사요 회원 특가 할인을 놓치지 마세요
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Moving;