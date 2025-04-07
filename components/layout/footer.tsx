import Link from "next/link";
import { text } from "@/data/en";
import { cn } from "@/lib/utils";
import { Github, Mail, Twitter, Shield, Lock, Info } from "lucide-react";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t bg-muted/40 py-6 lg:py-8",
        className
      )}
    >
      <div className="  grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-gov-700 to-gov-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">GF</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-gov-700 to-gov-500 bg-clip-text text-transparent">
              {text.app.name}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {text.footer.description}
          </p>
          <div className="flex space-x-3">
            <Link
              href={text.footer.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href={text.footer.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href={`mailto:${text.footer.social.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium mb-2">{text.footer.sections.platform.title}</h3>
          <ul className="space-y-2 text-sm">
            {text.footer.sections.platform.links.map((link) => (
              <li key={link.text}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-base font-medium mb-2">{text.footer.sections.resources.title}</h3>
          <ul className="space-y-2 text-sm">
            {text.footer.sections.resources.links.map((link) => (
              <li key={link.text}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-base font-medium mb-2">{text.footer.sections.legal.title}</h3>
          <ul className="space-y-2 text-sm">
            {text.footer.sections.legal.links.map((link) => (
              <li key={link.text}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="  mt-8 pt-6 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {text.app.name}. {text.footer.copyright}
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              <span>{text.footer.compliance.secure}</span>
            </div>
            <div className="flex items-center">
              <Lock className="h-4 w-4 mr-1" />
              <span>{text.footer.compliance.privacy}</span>
            </div>
            <div className="flex items-center">
              <Info className="h-4 w-4 mr-1" />
              <span>{text.footer.compliance.transparency}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}