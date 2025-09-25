import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sofa, Refrigerator, Star, Heart, ShoppingCart } from "lucide-react";
import vacuumCleanerImg from "@/assets/vacuum-cleaner.jpg";
import refrigeratorImg from "@/assets/refrigerator.jpg";
import washingMachineImg from "@/assets/washing-machine.jpg";
import airConditionerImg from "@/assets/air-conditioner.jpg";

const Furniture = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // 가구 4개로 축소
  const furnitureItems = [
    {
      id: "table1",
      name: "모던 책상",
      price: 159000,
      originalPrice: 199000,
      rating: 4.9,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&q=80",
      category: "desk",
      brand: "IKEA",
      features: ["원목소재", "수납공간", "모던"]
    },
    {
      id: "chair1",
      name: "모던 다이닝 체어",
      price: 199000,
      originalPrice: 259000,
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop&q=80",
      category: "chair",
      brand: "한샘",
      features: ["4개 세트", "패브릭", "모던"]
    },
    {
      id: "sofa1",
      name: "스칸디나비아 2인 소파",
      price: 299000,
      originalPrice: 399000,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&q=80",
      category: "sofa",
      brand: "한샘",
      features: ["패브릭", "2인용", "스칸디"]
    },
    {
      id: "light1",
      name: "미니멀 펜던트 라이트",
      price: 45000,
      originalPrice: 65000,
      rating: 4.9,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80",
      category: "lighting",
      brand: "필립스",
      features: ["LED", "밝기조절", "미니멀"]
    }
  ];

  // 가전 4개로 축소하고 로컬 이미지 사용
  const applianceItems = [
    {
      id: "fridge1",
      name: "스마트 미니 냉장고",
      price: 359000,
      originalPrice: 429000,
      rating: 4.7,
      reviews: 278,
      image: refrigeratorImg, // 로컬 이미지 사용
      category: "refrigerator",
      brand: "삼성전자",
      features: ["168L", "스마트", "저소음"]
    },
    {
      id: "washing1",
      name: "드럼 세탁기",
      price: 459000,
      originalPrice: 599000,
      rating: 4.6,
      reviews: 189,
      image: washingMachineImg, // 로컬 이미지 사용
      category: "washing",
      brand: "LG전자",
      features: ["9kg", "드럼", "스마트"]
    },
    {
      id: "aircon1",
      name: "벽걸이 에어컨",
      price: 399000,
      originalPrice: 499000,
      rating: 4.8,
      reviews: 334,
      image: airConditionerImg, // 로컬 이미지 사용
      category: "aircon",
      brand: "삼성전자",
      features: ["1.5마력", "벽걸이", "스마트"]
    },
    {
      id: "vacuum1",
      name: "무선 청소기",
      price: 199000,
      originalPrice: 299000,
      rating: 4.7,
      reviews: 267,
      image: vacuumCleanerImg, // 로컬 이미지 사용
      category: "vacuum",
      brand: "다이슨",
      features: ["무선", "강력흡입", "배터리"]
    }
  ];

  const ItemCard = ({ item }: { item: any }) => {
    const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
    const isFavorite = favorites.includes(item.id);
    
    return (
      <Card className="p-4 space-y-4 hover:shadow-lg transition-all group">
        <div className="relative">
          <div className="h-48 bg-muted/30 rounded-lg overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white"
            onClick={() => toggleFavorite(item.id)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            {discount}% 할인
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold text-sm leading-tight">{item.name}</h3>
              <p className="text-xs text-muted-foreground">{item.brand}</p>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{item.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {item.features?.map((feature: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs py-0">
                {feature}
              </Badge>
            ))}
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-primary">
                {item.price.toLocaleString()}원
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {item.originalPrice.toLocaleString()}원
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              후기 {item.reviews.toLocaleString()}개
            </p>
          </div>

          <Button size="sm" className="w-full">
            <ShoppingCart className="h-4 w-4 mr-1" />
            장바구니
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
      {/* 헤더 */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">가구 & 가전</h1>
        <p className="text-xl text-muted-foreground">
          새 집에 필요한 가구와 가전을 특가로 만나보세요
        </p>
      </div>

      {/* 탭 네비게이션 */}
      <Tabs defaultValue="furniture" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="furniture" className="flex items-center space-x-2">
            <Sofa className="h-4 w-4" />
            <span>가구</span>
          </TabsTrigger>
          <TabsTrigger value="appliance" className="flex items-center space-x-2">
            <Refrigerator className="h-4 w-4" />
            <span>가전</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="furniture" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">인기 가구</h2>
            <Badge variant="secondary">
              {furnitureItems.length}개 상품
            </Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {furnitureItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="appliance" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">필수 가전</h2>
            <Badge variant="secondary">
              {applianceItems.length}개 상품
            </Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {applianceItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* 구매 가이드 */}
      <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">🛍️ 구매 가이드</h3>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="space-y-2">
              <div className="font-medium text-primary">1. 공간 측정</div>
              <p className="text-muted-foreground">
                가구 배치 전에 반드시 공간을 측정하세요
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-primary">2. 배송 확인</div>
              <p className="text-muted-foreground">
                배송 가능 지역과 소요 시간을 확인하세요
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-primary">3. 할부 혜택</div>
              <p className="text-muted-foreground">
                무이자 할부와 추가 할인 혜택을 확인하세요
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Furniture;