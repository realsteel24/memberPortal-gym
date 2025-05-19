import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MembershipCardProps {
  membershipType: string;
  startDate: string;
  nextPayment: string | undefined;
  amount: number;
  status: "active" | "expired" | "pending";
}

const MembershipCard = ({
  membershipType,
  startDate,
  nextPayment,
  amount,
  status,
}: MembershipCardProps) => {
  return (
    <Card className="overflow-hidden border-border/50">
      <div className="h-2 gradient-purple w-full" />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Membership</CardTitle>
          {/* <Badge
            variant={status === "active" ? "default" : status === "pending" ? "outline" : "destructive"}
            className={status === "active" ? "bg-gym-purple" : ""}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge> */}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1">
          <div className="text-2xl font-bold text-foreground">
            {membershipType}
          </div>
          <p className="text-sm text-muted-foreground">
            Started on {startDate}
          </p>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Next Payment</div>
            <div className="font-medium text-foreground">{nextPayment}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Amount</div>
            <div className="font-medium text-foreground">${amount}/month</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MembershipCard;
