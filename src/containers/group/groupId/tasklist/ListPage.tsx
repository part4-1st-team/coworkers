import ListPageLayout from './ListPageLayout';
import TasksSection from './Task/TasksSection';

function ListPage() {
  return (
    <ListPageLayout>
      <TasksSection />
    </ListPageLayout>
  );
}

export default ListPage;
