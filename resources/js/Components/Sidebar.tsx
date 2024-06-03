import { Link, usePage } from "@inertiajs/react";
import { ShieldHalf } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/Components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { MenuItemProp } from "@/types";

type Props = {
    links: MenuItemProp[];
    isCollapsed?: boolean;
};

type MenuItemProps = {
    link: MenuItemProp;
    isActive?: boolean;
};

const CollapsedMenuItem = ({ link, isActive }: MenuItemProps) => {
    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Link
                    href={link.href}
                    className={cn(
                        buttonVariants({
                            variant: isActive ? "default" : "ghost",
                            size: "icon",
                        }),
                        "h-9 w-9",
                        link.variant === "default" &&
                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                >
                    {link.icon}
                    <span className="ml-2 sr-only">{link.title}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
            </TooltipContent>
        </Tooltip>
    );
};

const ExpandedMenuItem = ({ link, isActive }: MenuItemProps) => {
    return (
        <Link
            href={link.href}
            className={cn(
                buttonVariants({ variant: isActive ? "default" : "ghost" }),
                "justify-start"
            )}
        >
            {link.icon}
            <span className="ml-2">{link.title}</span>
        </Link>
    );
};

const Sidebar = ({ links, isCollapsed }: Props) => {
    const { url, component } = usePage();

    return (
        <TooltipProvider>
            <nav className="hidden bg-muted/40 md:block h-full">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link
                            href="/"
                            className={cn("flex items-center font-semibold", {
                                "justify-center": isCollapsed,
                            })}
                        >
                            <ShieldHalf className="h-6 w-6 text-gray-500" />
                            {!isCollapsed && (
                                <span className="pl-2">Presenzy</span>
                            )}
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start space-y-2 text-sm font-medium lg:px-4">
                            {links.map((link, index) =>
                                isCollapsed ? (
                                    <CollapsedMenuItem
                                        key={index}
                                        link={link}
                                        isActive={link.href.includes(url)}
                                    />
                                ) : (
                                    <ExpandedMenuItem
                                        key={index}
                                        link={link}
                                        isActive={link.href.includes(url)}
                                    />
                                )
                            )}
                        </nav>
                    </div>
                </div>
            </nav>
        </TooltipProvider>
    );
};

export default Sidebar;
