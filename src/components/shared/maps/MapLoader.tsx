import { Loader2 } from "lucide-react";

export default function MapLoader() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
            <div className="text-center space-y-2">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#09B0B6]" />
                <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
        </div>
    )
}