"use client";
import { useMemberDetails } from "@/app/hooks/useMemberDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "next/navigation";
import dateFormat from "dateformat";

export default function PaymentsPage() {
  const { gymId } = useParams<{ gymId: string }>();
  const { loading, member } = useMemberDetails(gymId);
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Payments & Membership</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Membership Details</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div> Loading... </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Type:</strong> Premium
                </p>
                <p>
                  <strong>Monthly Fee:</strong> $50
                </p>
              </div>
              <div>
                <p>
                  <strong>Next Payment Due:</strong> July 15, 2023
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div> Loading... </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Transaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {member?.Members[0]?.MemberFees?.map((item) => (
                    <TableRow key={item.Payments[0].id}>
                      <TableCell>
                        {dateFormat(
                          item.Payments[0].paymentDate.split("T")[0],
                          "dd mmmm, yyyy"
                        )}
                      </TableCell>
                      <TableCell>₹{item.Payments[0].amount}</TableCell>
                      <TableCell>
                        {item.Payments[0].PaymentMethod?.mode ?? "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
