import fireStore from '@/firebase/fireStore';
import { doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore';

import { v4 as uuid } from 'uuid';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';
import fireStorage from '@/firebase/fireStorage';
import Image from 'next/image';

function FirebaseTestPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  // 이미지 스토리지에 올리는 함수
  const uploadFB = async (e: any) => {
    console.log(e.target.files[0]);
    const uploadedFile = await uploadBytes(
      ref(fireStorage, `images/${e.target.files[0].name}_${uuid()}`),
      e.target.files[0],
    );

    const fileUrl = await getDownloadURL(uploadedFile.ref);
    console.log(fileUrl);
    setImageUrl(fileUrl);
  };

  // db에 데이터 넣기
  const onClickUpLoadButton = async () => {
    // await addDoc(collection(fireStore, `taskImage`), {
    //   id: 1,
    //   imageUrl,
    // });
    await setDoc(doc(fireStore, 'taskImage', '이미지'), {
      id: 3,
      imageUrl,
    });
  };

  // 데이터 불러오기
  useEffect(() => {
    async function getdocument() {
      const c = await getDoc(doc(fireStore, 'taskImage', '이미지'));
      setData(c.data());
    }
    getdocument();
  }, []);

  if (!data) return null;

  return (
    <div className='m-200 flex flex-col gap-20'>
      이미지 : <input type='file' onChange={uploadFB} /> <br />
      <button type='button' className='bg-white' onClick={onClickUpLoadButton}>
        이미지 db
      </button>
      <Image
        src={data.imageUrl}
        alt='firebase image'
        width={100}
        height={100}
      />
    </div>
  );
}

export default FirebaseTestPage;
