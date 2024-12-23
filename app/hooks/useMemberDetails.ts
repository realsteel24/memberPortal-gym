"use client";
import { BACKEND_URL } from "@/config";
import { useEffect, useState } from "react";

export interface Member {
  name: string;
  contact: string;
  email: string;
  gender: string;
  id: string;
  Members: MemberOptions[];
}
export interface MemberOptions {
  id: string;
  enrollmentDate: string;
  gymId: string;
  MemberFees?: MemberFeesOptions[];
  MemberPrograms: MemberProgramOptions[];
}

export interface MemberProgramOptions {
  id: string;
  memberId: string;
  programId: string;
  batchId: string;
  gymId: string;
  Batch: { name: string };
  Member: MemberOptions[];
  Program: ProgramsOptions;
}

export interface MemberFeesOptions {
  feeCategoryId: string;
  paidDate: string;
  dueDate: string;
  FeeCategories: { 0: { description: string } };
  Payments: PaymentOptions[];
}

export interface PaymentOptions {
  id: string;
  amount: number;
  paymentDate: string;
  PaymentMethod: {
    collectedBy: string;
    id: string;
    mode: string;
  };
}

export interface ProgramsOptions {
  id: string;
  name: string;
  description: string;
  _count: {
    Batches: number;
    MemberPrograms: number;
  };
}

export const useMemberDetails = (gymId: string) => {
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    if (!gymId) return;

    const fetchMembers = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/member/${gymId}/member/profile`,
          {
            headers: { authorization: localStorage.getItem("token") ?? "" },
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();
        setMember(result.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [gymId]);

  return { loading, member };
};
