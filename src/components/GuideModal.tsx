import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Lightbulb, ExternalLink } from "lucide-react";
import { guideData, GuideData } from "@/lib/guideData";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  itemTitle: string;
}

const GuideModal = ({ isOpen, onClose, itemId, itemTitle }: GuideModalProps) => {
  const guide = guideData[itemId] as GuideData | undefined;

  if (!guide) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{itemTitle} 가이드</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-muted-foreground">가이드 정보가 준비되지 않았습니다.</p>
            <Button onClick={onClose} className="mt-4">
              닫기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{guide.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 설명 */}
          <div>
            <p className="text-muted-foreground leading-relaxed">
              {guide.description}
            </p>
          </div>

          {/* 단계별 가이드 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              단계별 가이드
            </h3>
            <div className="space-y-2">
              {guide.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="mt-0.5 min-w-[2rem] text-center">
                    {index + 1}
                  </Badge>
                  <p className="text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 팁 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
              유용한 팁
            </h3>
            <div className="space-y-2">
              {guide.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 주의사항 */}
          {guide.warnings && guide.warnings.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                주의사항
              </h3>
              <div className="space-y-2">
                {guide.warnings.map((warning, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{warning}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 관련 링크 */}
          {guide.links && guide.links.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <ExternalLink className="h-5 w-5 mr-2 text-blue-600" />
                관련 링크
              </h3>
              <div className="space-y-2">
                {guide.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose}>
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuideModal;

