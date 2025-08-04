
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useStore } from '@/stores/appStore';
import TaskCard from './TaskCard';

const KanbanView = () => {
  const tasks = useStore((state) => state.tasks);

  // Group tasks by status
  const columns = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  return (
    <DndContext collisionDetection={closestCenter}>
      <div className="flex gap-4 p-4 overflow-x-auto">
        {Object.entries(columns).map(([status, tasksInStatus]) => (
          <div key={status} className="bg-gray-800 rounded-lg p-4 w-80 flex-shrink-0">
            <h2 className="text-lg font-bold mb-4">{status}</h2>
            <SortableContext items={tasksInStatus.map(t => t.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {tasksInStatus.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanView;
