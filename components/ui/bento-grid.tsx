import { cn } from "@/lib/utils";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-[24px] group/bento hover:shadow-[12px_12px_0px_0px_rgba(204,255,0,1)] hover:-translate-y-1 hover:translate-x-1 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white border-2 border-black justify-between flex flex-col space-y-4 p-8",
                className
            )}
        >
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                {icon}
                <div className="font-sans font-black text-xl uppercase text-black mb-2 mt-2">
                    {title}
                </div>
                <div className="font-mono text-sm text-neutral-600">
                    {description}
                </div>
            </div>
        </div>
    );
};
