import { Home, LogIn, LogOut, User, CheckSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const location = useLocation();
  const { user, signInWithGoogle, signOut, loading } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
          <CheckSquare className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            이사요
          </span>
        </Link>

        <nav className="flex items-center space-x-1">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive("/")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            홈
          </Link>
          <Link
            to="/moving"
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive("/moving")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            이사/청소
          </Link>
          <Link
            to="/furniture"
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive("/furniture")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            가구/가전
          </Link>
          <Link
            to="/blog"
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive("/blog")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            블로그
          </Link>
        </nav>
        
        {/* Auth Section */}
        <div className="flex items-center space-x-2">
          {loading ? (
            <div className="w-8 h-8 bg-muted animate-pulse rounded-full" />
          ) : user ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline text-muted-foreground">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">로그아웃</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={signInWithGoogle}
              className="flex items-center space-x-1"
              size="sm"
            >
              <LogIn className="h-4 w-4" />
              <span>구글 로그인</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;