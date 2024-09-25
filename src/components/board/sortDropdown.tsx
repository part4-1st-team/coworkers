import { IconToggleDown } from '@/assets/IconList';
import Dropdown from '@/components/dropdown/Dropdown';
import useDropdown from '@/hooks/useDropdown';

type ArticleOrder = 'like' | 'recent';

interface SortDropdownProps {
  orderBy: ArticleOrder;
  onSortChange: (sortType: ArticleOrder) => void;
}

function SortDropdown({ orderBy, onSortChange }: SortDropdownProps) {
  const { isOpen, handleToggleDropdown, handleOffDropdown } = useDropdown();

  const handleSortChange = (sortType: ArticleOrder) => {
    onSortChange(sortType);
    handleOffDropdown();
  };

  return (
    <Dropdown onClose={handleOffDropdown}>
      <Dropdown.Trigger onClick={handleToggleDropdown}>
        <div className='bg-background-secondary text-text-primary font-normal w-130 h-44 px-14 py-10 rounded-12 flex items-center justify-between text-sm tablet:text-md'>
          {orderBy === 'like' ? '좋아요 많은순' : '최신순'}
          <IconToggleDown className='text-icon-primary' />
        </div>
      </Dropdown.Trigger>
      <Dropdown.Menu isOpen={isOpen} className='w-130 absolute top-44'>
        <Dropdown.List
          onClose={handleOffDropdown}
          onClick={() => handleSortChange('like')}
        >
          좋아요 많은순
        </Dropdown.List>
        <Dropdown.List
          onClose={handleOffDropdown}
          onClick={() => handleSortChange('recent')}
        >
          최신순
        </Dropdown.List>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropdown;
