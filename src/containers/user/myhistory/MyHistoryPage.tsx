import getSortedHistoryByWeek from '@/utils/getSortedHistoryByWeek';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { useState } from 'react';
import WeekArrowButton from './WeekArrowButton';
import WeekHistoryList from './WeekHistoryList';

function MyHistoryPage({ historyList }: { historyList: DoneTask[] }) {
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [noMoreWeeks, setNoMoreWeeks] = useState<boolean>(false);
  const [direction, setDirection] = useState<'up' | 'down'>('up'); // 슬라이드 방향 설정
  const [isAnimating, setIsAnimating] = useState(false);

  const currentHistoryList = getSortedHistoryByWeek(historyList, weekOffset);

  const loadPreviousTasks = () => {
    setIsAnimating(true); // 애니메이션 시작
    setDirection('up'); // 위로 슬라이드 설정
    const nextPrevTasks = getSortedHistoryByWeek(historyList, weekOffset + 2);

    setNoMoreWeeks(nextPrevTasks.length === 0); // 더 이상 작업이 없으면 버튼 비활성화

    setWeekOffset(weekOffset + 1); // 이전 주로 이동

    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // 0.5초 후 애니메이션 상태 초기화
  };

  const loadNextTasks = () => {
    setIsAnimating(true); // 애니메이션 시작
    setDirection('down'); // 아래로 슬라이드 설정

    const nextTasks = getSortedHistoryByWeek(historyList, weekOffset - 1);

    setNoMoreWeeks(nextTasks.length === 0); // 더 이상 작업이 없으면 버튼 비활성화

    setWeekOffset(weekOffset - 1); // 다음 주로 이동

    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // 0.5초 후 애니메이션 상태 초기화
  };

  let translateY = 0;

  if (isAnimating) {
    translateY = direction === 'up' ? 20 : -20;
  }

  return (
    <main className='main-container'>
      <div>
        <h2 className='text-xl font-bold mb-24 text-text-primary dark:text-text-primary-dark'>
          마이 히스토리
        </h2>

        <div className='flex flex-col gap-20'>
          <div className='flex justify-between items-center'>
            <h3 className='text-xl text-text-primary dark:text-text-primary-dark font-semibold'>
              {weekOffset === 0 ? '이번주' : `${weekOffset}주 전`}
            </h3>
            <div className='flex gap-10'>
              <WeekArrowButton
                direction='up'
                offset={weekOffset}
                onClick={loadPreviousTasks}
                disabled={noMoreWeeks || currentHistoryList.length === 0}
              />

              <WeekArrowButton
                direction='down'
                offset={weekOffset}
                onClick={loadNextTasks}
                disabled={weekOffset === 0 || currentHistoryList.length === 0}
              />
            </div>
          </div>
          {currentHistoryList.length === 0 ? (
            <div
              className={clsx(
                'space-y-15 bg-background-secondary dark:bg-background-secondary-dark p-20 rounded-12 shadow-md',
                'flex items-center justify-center text-center text-md font-medium text-text-default dark:text-text-default-dark',
                'h-[60vh]',
              )}
            >
              <span>
                아직 히스토리가 없습니다.
                <br />
                일정을 완료해주세요
              </span>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, translateY: 0 }}
              animate={{
                opacity: isAnimating ? 0 : 1,
                translateY,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className='space-y-20'
            >
              {!isAnimating &&
                currentHistoryList.map((weekHistoryGroup, idx) => (
                  <WeekHistoryList
                    historyGroup={weekHistoryGroup}
                    key={weekHistoryGroup.date}
                  />
                ))}
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}

export default MyHistoryPage;
