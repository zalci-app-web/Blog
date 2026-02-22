import { Zap } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 md:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground">
            <Zap className="h-3 w-3 text-background" />
          </div>
          <span className="text-sm font-bold text-foreground">Portal Hub</span>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          &copy; 2026 Portal Hub. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            プライバシーポリシー
          </a>
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            お問い合わせ
          </a>
        </nav>
      </div>
    </footer>
  );
}
