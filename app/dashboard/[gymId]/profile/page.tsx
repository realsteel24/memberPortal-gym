"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMemberDetails } from "@/app/hooks/useMemberDetails";
import { useParams } from "next/navigation";
import dateFormat from "dateformat";

export default function ProfilePage() {
  // In a real app, you would fetch this data from your backend
  const { gymId } = useParams<{ gymId: string }>();
  const { loading, member } = useMemberDetails(gymId);
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    membershipType: "Premium",
    joinDate: "2023-01-15",
    nextPaymentDue: "2023-07-15",
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
              <Avatar className="h-20 w-20 mb-4 sm:mb-0">
                <AvatarImage src="/placeholder-avatar.jpg" alt={member?.name} />
                <AvatarFallback>
                  {member?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-2xl">{member?.name}</CardTitle>
                <p className="text-muted-foreground">
                  {member ? (
                    member?.Members[0]?.MemberPrograms.length > 0 ? (
                      member.Members[0].MemberPrograms.map(
                        (program) => program.Program.name || "N/A"
                      ).join(", ")
                    ) : (
                      "N/A"
                    )
                  ) : (
                    <div>Loading</div>
                  )}
                  {` `}Member
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div id="email" className="text-lg">
                {member?.email}
              </div>
            </div>
            <div>
              <Label htmlFor="joinDate">Join Date</Label>
              <div id="joinDate" className="text-lg">
                {dateFormat(
                  member?.Members[0].enrollmentDate.split("T")[0],
                  "dd mmmm, yyyy"
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="nextPaymentDue">Next Payment Due</Label>
              <div id="nextPaymentDue" className="text-lg">
                {member?.Members?.[0]?.MemberFees &&
                member.Members[0].MemberFees.length > 0
                  ? dateFormat(
                      member.Members[0].MemberFees.reduce((max, fee) =>
                        new Date(fee.dueDate) > new Date(max.dueDate)
                          ? fee
                          : max
                      ).dueDate.split("T")[0],
                      "dd mmmm, yyyy"
                    )
                  : "N/A"}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
// TODO: select max date out of all
