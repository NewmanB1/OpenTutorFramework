import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Mock of dist/docs.snapshot.json (replace with fetch('/dist/docs.snapshot.json') in real deployment)
const snapshot = {
  plugins: [
    {
      name: "Core Framework",
      status: "Production-Ready",
      coverage: "Partial",
    },
    {
      name: "Plugin System",
      status: "Partial",
      coverage: "None",
    },
    {
      name: "Subjects Container",
      status: "Verified",
      coverage: "None",
    },
    {
      name: "Basic Math",
      status: "Partial",
      coverage: "None",
    },
    {
      name: "MeshSync",
      status: "Prototype",
      coverage: "None",
    },
    {
      name: "Rap Hero",
      status: "Not Started",
      coverage: "None",
    },
  ],
};

const statusScore = {
  "Not Started": 0,
  Prototype: 25,
  Partial: 50,
  Verified: 80,
  "Production-Ready": 100,
};

function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export default function SystemCompletenessDashboard() {
  const data = useMemo(() => {
    const scores = snapshot.plugins.map((p) => statusScore[p.status] || 0);
    const overall = average(scores);

    const counts = snapshot.plugins.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {});

    return { overall, counts };
  }, []);

  return (
    <div className="p-6 grid gap-6">
      <motion.h1
        className="text-2xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        System Completeness Dashboard
      </motion.h1>

      <Card>
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between">
            <span>Overall System Completeness</span>
            <span className="font-semibold">{data.overall.toFixed(1)}%</span>
          </div>
          <Progress value={data.overall} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {snapshot.plugins.map((p) => (
          <motion.div
            key={p.name}
            whileHover={{ scale: 1.02 }}
          >
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="font-semibold">{p.name}</div>
                <Badge>{p.status}</Badge>
                <div className="text-sm text-gray-500">
                  Coverage: {p.coverage}
                </div>
                <Progress value={statusScore[p.status]} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
