import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Program {
  id: number;
  name: string;
  completedSessions: number;
  totalSessions: number;
  startDate: string;
  endDate: string;
}

interface ProgramProgressProps {
  programs: Program[];
}

const ProgramProgress = ({ programs }: ProgramProgressProps) => {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Active Programs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {programs.map((program) => {
            const progress = Math.round(
              (program.completedSessions / program.totalSessions) * 100
            );

            return (
              <div key={program.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{program.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {program.completedSessions}/{program.totalSessions} sessions
                  </span>
                </div>
                <progress value={progress} className="h-2" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>{program.startDate}</span>
                  <span>{program.endDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramProgress;
