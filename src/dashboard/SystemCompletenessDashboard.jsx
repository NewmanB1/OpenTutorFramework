import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function SystemCompletenessDashboard() {
  const [snapshot, setSnapshot] = useState(null);

  // 👇 THIS is where the fetch goes
  useEffect(() => {
    fetch("/dist/docs.snapshot.json")
      .then((res) => res.json())
      .then(setSnapshot)
      .catch((err) => console.error("Failed to load snapshot:", err));
  }, []);

  const statusScore = {
    "Not Started": 0,
    Prototype: 25,
    Partial: 50,
    Verified: 80,
    "Production-Ready": 100,
  };

  const data = useMemo(() => {
    if (!snapshot) return null;

    const scores = snapshot.plugins.map(
      (p) => statusScore[p.status] || 0
    );

    const overall =
      scores.reduce((a, b) => a + b, 0) / scores.length;

    return { overall };
  }, [snapshot]);

  if (!snapshot) {
    return <div className="p-6">Loading system snapshot...</div>;
  }

  return (
    <div className="p-6 grid gap-6">
      <motion.h1 className="text-2xl font-bold">
        System Completeness Dashboard
      </motion.h1>

      <Card>
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between">
            <span>Overall System Completeness</span>
            <span className="font-semibold">
              {data.overall.toFixed(1)}%
            </span>
          </div>
          <Progress value={data.overall} />
        </CardContent>
      </Card>
    </div>
  );
}
