import MyHistoryPage from '@/containers/user/myhistory/MyHistoryPage';
import { basicInstance } from '@/libs/axios';
import Cookies from 'cookies';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

// SSR
export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { req, res } = context;

  const cookies = new Cookies(req, res);

  const token = cookies.get('accessToken');

  // 기존 axios는 훅을 사용하는 걸로 인해 에러 나서 기본 인스턴스 사용
  const historyList = await basicInstance
    .get('/user/history', {
      headers: {
        Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
      },
    })
    .then((response) => response.data)
    .then((data) => {
      return data.tasksDone;
    })
    .catch((error) => {
      console.error('API 요청 에러:', error.response.data.message);
      return [];
    });

  return {
    props: {
      historyList, // 데이터를 페이지로 전달
    },
  };
};

function UserMyHistoryPage({ historyList }: { historyList: DoneTask[] }) {
  return (
    <>
      <Head>
        <title>마이 히스토리</title>
        <meta
          name='description'
          content='내가 완료한 작업과 활동 내역을 한눈에 확인할 수 있는 마이 히스토리 페이지입니다.'
        />
      </Head>
      <MyHistoryPage historyList={historyList} />
    </>
  );
}

export default UserMyHistoryPage;
