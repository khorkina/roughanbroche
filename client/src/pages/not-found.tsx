import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-[0.2em] mb-6">404</h1>
        <p className="text-xl tracking-widest uppercase mb-8 text-muted-foreground">
          Page Not Found
        </p>
        <Link href="/">
          <Button
            size="lg"
            className="px-8 py-6 text-sm tracking-widest uppercase"
            data-testid="button-back-home"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Collection
          </Button>
        </Link>
      </div>
    </div>
  );
}
