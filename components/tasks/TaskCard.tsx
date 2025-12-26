"use client";

import React from "react";
import { Task, User } from "@/types";
import { Badge } from "@/components/ui/Badge";

interface TaskCardProps {
  task: Task;
  assignedUser?: User;
  onClick: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  assignedUser,
  onClick,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white dark:bg-[#1a1632] rounded-2xl shadow-sm hover:shadow-xl dark:shadow-primary/5 border border-gray-200 dark:border-[#3b3561] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 dark:hover:border-primary/40 overflow-hidden"
    >
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-secondary to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 pr-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
          {task.title}
        </h3>
        <Badge variant={task.status}>{task.status.replace("-", " ")}</Badge>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
        {task.description}
      </p>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2 bg-gray-50 dark:bg-[#241f42] px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#3b3561]">
          <div className="w-5 h-5 rounded-full bg-[linear-gradient(90deg,var(--primary),var(--secondary))] flex items-center justify-center text-white text-[10px] font-bold">
            {assignedUser?.name?.charAt(0).toUpperCase() || "?"}
          </div>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {assignedUser?.name || "Unassigned"}
          </span>
        </div>
        <div className="flex items-center space-x-1.5 text-gray-600 dark:text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{formatDate(task.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
