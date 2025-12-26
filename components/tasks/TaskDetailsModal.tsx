"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Task, User } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  users: User[];
  currentUser: User | null;
  onUpdate: (data: any) => void;
  isLoading: boolean;
}

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  isOpen,
  onClose,
  task,
  users,
  currentUser,
  onUpdate,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const isAdmin = currentUser?.role === "admin";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "pending",
      assignedUserId: task?.assignedUserId || "",
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
        assignedUserId: task.assignedUserId,
      });
    }
    setIsEditing(false);
  }, [task, reset]);

  if (!task) return null;

  const assignedUser = users.find((u) => u.id === task.assignedUserId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const onSubmit = (data: any) => {
    onUpdate({
      id: task.id,
      ...data,
    });
    setIsEditing(false);
  };

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const userOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details" size="lg">
      {!isEditing ? (
        // View Mode
        <div className="space-y-4">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {task.title}
              </h2>
              <Badge variant={task.status}>
                {task.status.replace("-", " ")}
              </Badge>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
              {task.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Assigned To
              </label>
              <p className="text-gray-900 dark:text-gray-100">
                {assignedUser?.name || "Unassigned"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <p className="text-gray-900 dark:text-gray-100 capitalize">
                {task.status.replace("-", " ")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Created
              </label>
              <p className="text-gray-900 dark:text-gray-100 text-sm">
                {formatDate(task.createdAt)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Updated
              </label>
              <p className="text-gray-900 dark:text-gray-100 text-sm">
                {formatDate(task.updatedAt)}
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {(isAdmin || currentUser?.role === "user") && (
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Edit Task
              </Button>
            )}
          </div>
        </div>
      ) : (
        // Edit Mode
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isAdmin && (
            <Input
              label="Title"
              placeholder="Enter task title"
              error={errors.title?.message}
              {...register("title", { required: "Title is required" })}
            />
          )}

          {isAdmin && (
            <Textarea
              label="Description"
              placeholder="Enter task description"
              rows={4}
              error={errors.description?.message}
              {...register("description", {
                required: "Description is required",
              })}
            />
          )}

          {isAdmin && (
            <Select
              label="Assigned User"
              options={userOptions}
              error={errors.assignedUserId?.message}
              {...register("assignedUserId", {
                required: "Please assign a user",
              })}
            />
          )}

          <Select
            label="Status"
            options={statusOptions}
            error={errors.status?.message}
            {...register("status", { required: "Status is required" })}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
