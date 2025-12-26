"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  fetchTasks,
  setFilters,
  createTask,
  updateTask,
  setSelectedTask,
} from "@/store/slices/tasksSlice";
import { fetchUsers } from "@/store/slices/usersSlice";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskDetailsModal } from "@/components/tasks/TaskDetailsModal";
import { CreateTaskModal } from "@/components/tasks/CreateTaskModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { CreateTaskPayload } from "@/types";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { tasks, loading, filters, selectedTask } = useAppSelector(
    (state) => state.tasks
  );
  const { users } = useAppSelector((state) => state.users);
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [searchInput, setSearchInput] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTasks(filters));
  }, [dispatch, filters]);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    const timeoutId = setTimeout(() => {
      dispatch(setFilters({ search: value }));
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleStatusFilter = (status: string) => {
    dispatch(setFilters({ status }));
    setCurrentPage(1);
  };

  const handleCreateTask = async (data: CreateTaskPayload) => {
    const result = await dispatch(createTask(data));
    if (createTask.fulfilled.match(result)) {
      setIsCreateModalOpen(false);
    }
  };

  const handleUpdateTask = async (data: any) => {
    const result = await dispatch(updateTask(data));
    if (updateTask.fulfilled.match(result)) {
      // Modal will close automatically on successful update
    }
  };

  const handleTaskClick = (task: any) => {
    dispatch(setSelectedTask(task));
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    dispatch(setSelectedTask(null));
  };

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const statusOptions = [
    { value: "all", label: "All Tasks" },
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
                Tasks
              </h1>
              <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
                Manage and track your tasks efficiently
              </p>
            </div>
            {isAdmin && (
              <Button
                variant="primary"
                onClick={() => setIsCreateModalOpen(true)}
                className="group"
              >
                <svg
                  className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Task
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="bg-gray-50 dark:bg-[#1a1632] rounded-2xl shadow-sm border border-gray-200 dark:border-[#3b3561] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Search tasks by title..."
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Select
                options={statusOptions}
                value={filters.status}
                onChange={(e) => handleStatusFilter(e.target.value)}
              />
            </div>
          </div>

          {/* Tasks Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : currentTasks.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-linear-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 mb-6 shadow-lg shadow-primary/5">
                <svg
                  className="w-12 h-12 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No tasks found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {filters.search || filters.status !== "all"
                  ? "Try adjusting your filters"
                  : isAdmin
                  ? "Create your first task to get started"
                  : "No tasks have been assigned yet"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    assignedUser={users.find(
                      (u) => u.id === task.assignedUserId
                    )}
                    onClick={() => handleTaskClick(task)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-3 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Previous
                  </Button>

                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                            currentPage === page
                              ? "bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25"
                              : "bg-gray-100 dark:bg-[#241f42] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2d2855] border border-gray-200 dark:border-[#3b3561]"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Task Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative overflow-hidden bg-white dark:bg-[#1a1632] rounded-2xl p-5 border border-amber-200 dark:border-amber-900/50 group hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-amber-400/20 to-orange-400/20 rounded-bl-[60px] -mr-4 -mt-4"></div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-amber-600 dark:text-amber-400 text-sm font-semibold">
                    Pending
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {tasks.filter((t) => t.status === "pending").length}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden bg-white dark:bg-[#1a1632] rounded-2xl p-5 border border-blue-200 dark:border-blue-900/50 group hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-blue-400/20 to-indigo-400/20 rounded-bl-[60px] -mr-4 -mt-4"></div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-blue-600 dark:text-blue-400 text-sm font-semibold">
                    In Progress
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {tasks.filter((t) => t.status === "in-progress").length}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden bg-white dark:bg-[#1a1632] rounded-2xl p-5 border border-emerald-200 dark:border-emerald-900/50 group hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-emerald-400/20 to-teal-400/20 rounded-bl-[60px] -mr-4 -mt-4"></div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                    Completed
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {tasks.filter((t) => t.status === "completed").length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {isAdmin && (
          <CreateTaskModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            users={users}
            onCreate={handleCreateTask}
            isLoading={loading}
          />
        )}

        <TaskDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          task={selectedTask}
          users={users}
          currentUser={currentUser}
          onUpdate={handleUpdateTask}
          isLoading={loading}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
