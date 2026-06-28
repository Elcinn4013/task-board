"use client";

import { useState } from "react";
import TaskCard from "./TaskCard";

export default function Column({
    title,
    status,
    tasks,
    refreshTasks,
    onDropTask,
    openEditModal,
}) {
    const [isDraggingOver, setIsDraggingOver] =
        useState(false);

    const filteredTasks = tasks.filter(
        (task) => task.status === status
    );

    const statusColors = {
        todo: "from-sky-500 to-cyan-500",
        progress:
            "from-amber-500 to-orange-500",
        done: "from-emerald-500 to-green-500",
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();

        setIsDraggingOver(false);

        const taskId =
            e.dataTransfer.getData(
                "text/plain"
            );

        if (taskId && onDropTask) {
            onDropTask(taskId, status);
        }
    };

    return (
        <div
            className={`
      flex-1
      min-h-[750px]
      rounded-3xl
      p-5
      backdrop-blur-xl
      bg-white/60
      border
      shadow-xl
      transition-all
      duration-300
      ${isDraggingOver
                    ? "scale-[1.02] border-indigo-300 bg-white/80"
                    : "border-white/40"
                }
      `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div
                className={`
        bg-gradient-to-r
        ${statusColors[status]}
        rounded-2xl
        p-4
        text-white
        mb-5
      `}
            >
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg">
                        {title}
                    </h2>

                    <span
                        className="
            bg-white/20
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold
          "
                    >
                        {filteredTasks.length}
                    </span>
                </div>
            </div>

            {filteredTasks.length === 0 ? (
                <div
                    className="
          border-2
          border-dashed
          border-slate-300
          rounded-2xl
          text-center
          py-12
          text-slate-400
        "
                >
                    Drop tasks here
                </div>
            ) : (
                filteredTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        refreshTasks={refreshTasks}
                        openEditModal={openEditModal}
                    />
                ))
            )}
        </div>
    );
}