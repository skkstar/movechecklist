import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBlogPostBySlug, blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">포스트를 찾을 수 없습니다</h1>
          <p className="text-muted-foreground mb-6">
            요청하신 블로그 포스트가 존재하지 않습니다.
          </p>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              블로그로 돌아가기
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 관련 포스트 (같은 카테고리 또는 같은 태그)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && 
      (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 3);

  // Markdown을 간단한 HTML로 변환하는 함수
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-medium mt-4 mb-2">{line.slice(4)}</h3>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-4 mb-1">{line.slice(2)}</li>;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
      });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: URL 복사
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              블로그로 돌아가기
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            <div className="max-w-4xl mx-auto">
              {/* Post Header */}
              <header className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{post.category}</Badge>
                  {post.featured && <Badge variant="outline">추천</Badge>}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {post.title}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-6">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.readTime}분 읽기
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="ml-auto"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    공유
                  </Button>
                </div>

                <Separator className="mb-8" />
              </header>

              {/* Post Content */}
              <div className="prose prose-lg max-w-none mb-12">
                {renderContent(post.content)}
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  태그
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="mb-8" />

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section className="mb-8">
                  <h3 className="text-2xl font-bold mb-6">관련 포스트</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {relatedPost.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg line-clamp-2">
                            <Link 
                              to={`/blog/${relatedPost.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {relatedPost.title}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(relatedPost.publishedAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {relatedPost.readTime}분
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              <Card>
                <CardHeader>
                  <CardTitle>목차</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {post.content
                      .split('\n')
                      .filter(line => line.startsWith('## '))
                      .map((heading, index) => (
                        <a
                          key={index}
                          href={`#heading-${index}`}
                          className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {heading.slice(3)}
                        </a>
                      ))}
                  </nav>
                </CardContent>
              </Card>

              {/* Post Info */}
              <Card>
                <CardHeader>
                  <CardTitle>포스트 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}분 읽기</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="h-4 w-4" />
                    <span>{post.category}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
