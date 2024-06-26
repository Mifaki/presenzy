import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { Menu, ShieldHalf } from "lucide-react";
import { Link } from "@inertiajs/react";
import { MenuItemProp } from "@/types";

const MobileMenu = ({ links }: { links: MenuItemProp[] }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold mb-4"
                    >
                        <ShieldHalf className="h-8 w-8 text-gray-500" />

                        <span>Presenzy</span>
                    </Link>
                    {links.map((link, index) => {
                        return (
                            <Link
                                key={index}
                                href={link.href}
                                className="mx-[-0.65rem] flex items-center gap-2 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                {link.icon}
                                {link.title}
                            </Link>
                        );
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
