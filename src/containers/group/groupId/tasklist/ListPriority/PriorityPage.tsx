import ListPageLayout from '../ListPageLayout';
import TasksSection from '../Task/TasksSection';

function PriorityPage() {
  return (
    <ListPageLayout>
      <TasksSection priority />
    </ListPageLayout>
  );
}

export default PriorityPage;
