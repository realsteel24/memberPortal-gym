"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const initialClasses = [
  {
    id: 1,
    name: "Yoga",
    instructor: "Jane Doe",
    time: "Monday, 9:00 AM",
    category: "Mind & Body",
  },
  {
    id: 2,
    name: "Spin",
    instructor: "John Smith",
    time: "Tuesday, 6:00 PM",
    category: "Cardio",
  },
  {
    id: 3,
    name: "HIIT",
    instructor: "Mike Johnson",
    time: "Wednesday, 7:00 AM",
    category: "Strength",
  },
];

export default function Dashboard({
  params,
}: {
  params: Promise<{ gymId: string }>;
}) {
  const [gymId, setGymId] = useState("");

  useEffect(() => {
    const getGymId = async () => {
      try {
        const resolvedGymId = (await params).gymId;
        setGymId(resolvedGymId);
      } catch (err) {
        console.log("Failed to fetch gymId.");
      }
    };

    getGymId();
  }, [params]);
  const [upcomingClasses, setUpcomingClasses] = useState(initialClasses);

  const cancelBooking = (id: number) => {
    setUpcomingClasses(
      upcomingClasses.filter((classItem) => classItem.id !== id)
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Membership Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Type:</strong> Premium
            </p>
            <p>
              <strong>Valid Until:</strong> December 31, 2023
            </p>
            <p>
              <strong>Next Payment:</strong> July 1, 2023
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Classes Attended:</strong> 15
            </p>
            <p>
              <strong>Upcoming Classes:</strong> {upcomingClasses.length}
            </p>
            <p>
              <strong>Fitness Goal:</strong> Improve Strength
            </p>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Upcoming Classes</h2>
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {upcomingClasses.map((classItem) => (
          <motion.div
            key={classItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <h3 className="font-bold">{classItem.name}</h3>
                  <p>{classItem.time}</p>
                  <p>Instructor: {classItem.instructor}</p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => cancelBooking(classItem.id)}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
