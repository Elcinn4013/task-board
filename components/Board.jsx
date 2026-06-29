import Column from "./Column";
import { moveTask } from "@/services/taskService";

export default function Board({
  tasks,
  refreshTasks,
  openEditModal,
}) {
  async function handleDropTask(
    taskId,
    newStatus
  ) {
    await moveTask(taskId, newStatus);
    refreshTasks();
  }

  return (
    <div
      className="
      grid
      grid-cols-1
      lg:grid-cols-3
      gap-8
      w-full
    "
    >
      <Column
        title="To Do"
        status="todo"
        tasks={tasks}
        refreshTasks={refreshTasks}
        onDropTask={handleDropTask}
        openEditModal={openEditModal}
      />

      <Column
        title="In Progress"
        status="progress"
        tasks={tasks}
        refreshTasks={refreshTasks}
        onDropTask={handleDropTask}
        openEditModal={openEditModal}
      />

      <Column
        title="Done"
        status="done"
        tasks={tasks}
        refreshTasks={refreshTasks}
        onDropTask={handleDropTask}
        openEditModal={openEditModal}
      />
    </div>
  );
}