import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TableWrapperProps {
    title: string;
    description: string;
    children: React.ReactNode;
}



export function TableWrapper({ title, description, children }: TableWrapperProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg md:text-xl text-[#05647A] dark:text-[#09B0B6]">
                    {title}
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}