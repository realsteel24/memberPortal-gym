"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialClasses = [
  {
    id: 1,
    name: "Yoga",
    instructor: "Jane Doe",
    time: "Monday, 9:00 AM",
    capacity: 20,
    booked: 15,
    category: "Mind & Body",
  },
  {
    id: 2,
    name: "Spin",
    instructor: "John Smith",
    time: "Tuesday, 6:00 PM",
    capacity: 15,
    booked: 10,
    category: "Cardio",
  },
  {
    id: 3,
    name: "HIIT",
    instructor: "Mike Johnson",
    time: "Wednesday, 7:00 AM",
    capacity: 12,
    booked: 8,
    category: "Strength",
  },
  {
    id: 4,
    name: "Pilates",
    instructor: "Sarah Brown",
    time: "Thursday, 10:00 AM",
    capacity: 18,
    booked: 12,
    category: "Mind & Body",
  },
  {
    id: 5,
    name: "Zumba",
    instructor: "Maria Garcia",
    time: "Friday, 5:00 PM",
    capacity: 25,
    booked: 20,
    category: "Dance",
  },
];

export default function ClassesPage() {
  const [classes, setClasses] = useState(initialClasses);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [bookedClasses, setBookedClasses] = useState<number[]>([]);

  useEffect(() => {
    const filteredClasses = initialClasses.filter(
      (classItem) =>
        classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "All" || classItem.category === categoryFilter)
    );
    setClasses(filteredClasses);
  }, [searchTerm, categoryFilter]);

  const handleBook = (id: number) => {
    setClasses(
      classes.map((classItem) =>
        classItem.id === id && classItem.booked < classItem.capacity
          ? { ...classItem, booked: classItem.booked + 1 }
          : classItem
      )
    );
    setBookedClasses([...bookedClasses, id]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Class Schedule</h1>
      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:space-x-4">
        <div className="flex-1">
          <Label htmlFor="search">Search Classes</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by class name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="category">Filter by Category</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Mind & Body">Mind & Body</SelectItem>
              <SelectItem value="Cardio">Cardio</SelectItem>
              <SelectItem value="Strength">Strength</SelectItem>
              <SelectItem value="Dance">Dance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <motion.div
        className="grid gap-6 md:grid-cols-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {classes.map((classItem) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{classItem.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Instructor:</strong> {classItem.instructor}
                  </p>
                  <p>
                    <strong>Time:</strong> {classItem.time}
                  </p>
                  <p>
                    <strong>Category:</strong> {classItem.category}
                  </p>
                  <p>
                    <strong>Availability:</strong>{" "}
                    {classItem.capacity - classItem.booked} spots left
                  </p>
                  <div className="mt-4">
                    <Button
                      className="w-full"
                      onClick={() => handleBook(classItem.id)}
                      disabled={
                        classItem.booked >= classItem.capacity ||
                        bookedClasses.includes(classItem.id)
                      }
                    >
                      {classItem.booked >= classItem.capacity
                        ? "Class Full"
                        : bookedClasses.includes(classItem.id)
                        ? "Booked"
                        : "Book Class"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
