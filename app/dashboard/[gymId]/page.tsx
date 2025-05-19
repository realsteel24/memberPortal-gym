"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Calendar } from "lucide-react";
import ProgramProgress from "@/components/ProgramProgress";
import ClassHistory from "@/components/ClassHistory";
import MembershipCard from "@/components/MembershipCard";
import { useMemberDetails } from "@/app/hooks/useMemberDetails";
import { useParams } from "next/navigation";

const Dashboard = () => {
  const { gymId } = useParams<{ gymId: string }>();
  const { loading, member } = useMemberDetails(gymId);

  const membershipData = {
    membershipType: "Premium Fitness",
    startDate: "Oct 15, 2023",
    nextPayment:
      member?.Members?.[0]?.MemberFees
        ?.filter((fee) => {
          const parsed = parseInt(fee.feeCategoryId);
          return isNaN(parsed) || parsed >= 10;
        })
        ?.reduce((latest, fee) => {
          return new Date(fee.dueDate) > new Date(latest.dueDate) ? fee : latest;
        })?.dueDate?.split("T")[0] ?? "N/A",
    amount: 59.99,
    status: "active" as const,
  };

  const classesData = [
    {
      id: 1,
      name: "HIIT Extreme",
      date: "May 16, 2025",
      time: "7:00 PM",
      trainer: "Alex Johnson",
    },
    {
      id: 2,
      name: "Yoga Flow",
      date: "May 14, 2025",
      time: "6:30 PM",
      trainer: "Sarah Chen",
    },
    {
      id: 3,
      name: "Strength Circuit",
      date: "May 12, 2025",
      time: "5:45 PM",
      trainer: "Mike Williams",
    },
  ];

  const programsData = [
    {
      id: 1,
      name: "6-Week Shred Challenge",
      completedSessions: 8,
      totalSessions: 18,
      startDate: "Apr 20",
      endDate: "May 31",
    },
    {
      id: 2,
      name: "Flexibility Mastery",
      completedSessions: 4,
      totalSessions: 12,
      startDate: "Apr 25",
      endDate: "Jun 10",
    },
  ];

  const statsData = [
    {
      title: "Classes This Month",
      value: "12",
      change: "+2",
      icon: Calendar,
    },
    {
      title: "Active Programs",
      value: "2",
      change: "0",
      icon: Activity,
    },
    {
      title: "Group Participants",
      value: "24",
      change: "+5",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Dashboard
        </h1>{" "}
        <br></br>
        <p className="text-muted-foreground">Welcome back, {member?.name}!</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {statsData.map((stat, i) => (
          <Card key={i} className="border-border/50 glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-muted-foreground leading-none">
                    {stat.title}
                  </span>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <div className="rounded-full p-2 bg-primary/20  ">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              {stat.change && (
                <div className="mt-2 text-xs text-muted-foreground">
                  <span
                    className={
                      stat.change.startsWith("+") ? "text-neon-orange" : ""
                    }
                  >
                    {stat.change} from last month
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <MembershipCard {...membershipData} />
        <div className="lg:col-span-2">
          <ClassHistory classes={classesData} />
        </div>
      </div>

      <div className="grid gap-4">
        <ProgramProgress programs={programsData} />
      </div>
    </div>
  );
};

export default Dashboard;

// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// const initialClasses = [
//   {
//     id: 1,
//     name: "Yoga",
//     instructor: "Jane Doe",
//     time: "Monday, 9:00 AM",
//     category: "Mind & Body",
//   },
//   {
//     id: 2,
//     name: "Spin",
//     instructor: "John Smith",
//     time: "Tuesday, 6:00 PM",
//     category: "Cardio",
//   },
//   {
//     id: 3,
//     name: "HIIT",
//     instructor: "Mike Johnson",
//     time: "Wednesday, 7:00 AM",
//     category: "Strength",
//   },
// ];

// export default function Dashboard({
//   params,
// }: {
//   params: Promise<{ gymId: string }>;
// }) {
//   const [gymId, setGymId] = useState("");
//   console.log(gymId);

//   useEffect(() => {
//     const getGymId = async () => {
//       try {
//         const resolvedGymId = (await params).gymId;
//         setGymId(resolvedGymId);
//       } catch (err) {
//         console.log("Failed to fetch gymId.", err);
//       }
//     };

//     getGymId();
//   }, [params]);
//   const [upcomingClasses, setUpcomingClasses] = useState(initialClasses);

//   const cancelBooking = (id: number) => {
//     setUpcomingClasses(
//       upcomingClasses.filter((classItem) => classItem.id !== id)
//     );
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
//       <div className="grid gap-6 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Membership Status</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>
//               <strong>Type:</strong> Premium
//             </p>
//             <p>
//               <strong>Valid Until:</strong> December 31, 2023
//             </p>
//             <p>
//               <strong>Next Payment:</strong> July 1, 2023
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Quick Stats</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>
//               <strong>Classes Attended:</strong> 15
//             </p>
//             <p>
//               <strong>Upcoming Classes:</strong> {upcomingClasses.length}
//             </p>
//             <p>
//               <strong>Fitness Goal:</strong> Improve Strength
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//       <h2 className="text-2xl font-bold mt-8 mb-4">Upcoming Classes</h2>
//       <motion.div
//         className="space-y-4"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {upcomingClasses.map((classItem) => (
//           <motion.div
//             key={classItem.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Card>
//               <CardContent className="flex justify-between items-center p-4">
//                 <div>
//                   <h3 className="font-bold">{classItem.name}</h3>
//                   <p>{classItem.time}</p>
//                   <p>Instructor: {classItem.instructor}</p>
//                 </div>
//                 <Button
//                   variant="destructive"
//                   onClick={() => cancelBooking(classItem.id)}
//                 >
//                   Cancel
//                 </Button>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }
