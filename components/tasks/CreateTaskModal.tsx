"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { User, CreateTaskPayload } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  onCreate: (data: CreateTaskPayload) => void;
  isLoading: boolean;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  users,
  onCreate,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskPayload>({
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
      assignedUserId: "",
    },
  });

  const onSubmit = (data: CreateTaskPayload) => {
    onCreate(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
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
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Task"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Task Title"
          placeholder="Enter task title"
          error={errors.title?.message}
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
        />

        <Textarea
          label="Description"
          placeholder="Enter task description"
          rows={5}
          error={errors.description?.message}
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
        />

        <Select
          label="Assign To"
          options={userOptions}
          error={errors.assignedUserId?.message}
          {...register("assignedUserId", {
            required: "Please assign this task to a user",
          })}
        />

        <Select
          label="Status"
          options={statusOptions}
          error={errors.status?.message}
          {...register("status", {
            required: "Status is required",
          })}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};
