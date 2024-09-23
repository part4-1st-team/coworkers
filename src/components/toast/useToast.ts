import { v4 as uuid } from 'uuid';
import useToastStore, { ToastType } from './ToastStore';

/**
 * @example
 * 토스트 컴포넌트를 사용할 곳에서 useToast를 import하고 toast를 가져옴
 * toast를 함수 형식으로 사용함 (<toast />  이런식으로는 사용 안돼요!!)
 * 첫 번째 인자는 type ('Success' | 'Error')
 * 두 번째 인자는 토스트에 띄우고 싶은 메시지
 * const {toast} = useToast();
 *
 * () => toast('Success', messsage);
 * () => toast('Error', message');
 *
 * 에러 났을 경우 mutation 함수에서
 * onError: (error) => toast('Error', error.response.message);
 * 이런 식으로도 사용 가능
 *
 * @returns 토스트 함수 반환
 */
function useToast() {
  const { addToastList } = useToastStore();

  const toast = (type: ToastType, message: string) => {
    const id = uuid(); // uuid 라이브러리를 통해 각 토스트가 고유한 아이디를 갖게함
    addToastList({ id, type, message }); // 토스트 리스트에 해당 토스트를 추가함
  };

  return { toast };
}
export default useToast;
