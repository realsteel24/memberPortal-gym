import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface Class {
  id: number;
  name: string;
  date: string;
  time: string;
  trainer: string;
}

interface ClassHistoryProps {
  classes: Class[];
}

const ClassHistory = ({ classes }: ClassHistoryProps) => {
  return (
    <Card className="border-border/50 glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Classes</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-1">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="flex items-center p-2 rounded-md hover:bg-black/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center mr-4">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium leading-none">{cls.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {cls.date} • {cls.time} • {cls.trainer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassHistory;
