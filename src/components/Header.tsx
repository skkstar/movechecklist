import { Home, LogIn, LogOut, User, CheckSquare, UserCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const location = useLocation();
  const { user, signInWithGoogle, signOut, loading } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
          <CheckSquare className="h-6 w-6 text-purple-500" />
          <span className="text-purple-500 font-semibold">
            이사요
          </span>
        </Link>

             <nav className="flex items-center space-x-1">
               <Link
                 to="/"
                 className={`px-4 py-2 rounded-button font-semibold text-sm transition-colors ${
                   isActive("/")
                     ? "bg-purple-500 text-white"
                     : "text-purple-500 hover:bg-purple-100"
                 }`}
               >
                 홈
               </Link>
               {user && (
                 <Link
                   to="/mypage"
                   className={`px-4 py-2 rounded-button font-semibold text-sm transition-colors ${
                     isActive("/mypage")
                       ? "bg-purple-500 text-white"
                       : "text-purple-500 hover:bg-purple-100"
                   }`}
                 >
                   마이페이지
                 </Link>
               )}
               <Link
                 to="/moving"
                 className={`px-4 py-2 rounded-button font-semibold text-sm transition-colors ${
                   isActive("/moving")
                     ? "bg-purple-500 text-white"
                     : "text-purple-500 hover:bg-purple-100"
                 }`}
               >
                 이사/청소
               </Link>
               <Link
                 to="/furniture"
                 className={`px-4 py-2 rounded-button font-semibold text-sm transition-colors ${
                   isActive("/furniture")
                     ? "bg-purple-500 text-white"
                     : "text-purple-500 hover:bg-purple-100"
                 }`}
               >
                 가구/가전
               </Link>
               <Link
                 to="/blog"
                 className={`px-4 py-2 rounded-button font-semibold text-sm transition-colors ${
                   isActive("/blog")
                     ? "bg-purple-500 text-white"
                     : "text-purple-500 hover:bg-purple-100"
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
                className="flex items-center space-x-1 border-purple-500 text-purple-500 hover:bg-purple-100 rounded-button font-semibold"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">로그아웃</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={signInWithGoogle}
              className="flex items-center space-x-1 bg-purple-500 hover:bg-purple-600 text-white rounded-button font-semibold"
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