import { useState } from 'react';

function ArticleEdit(initialTitle: string, initialContent: string) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  // 수정 모드 토글 함수
  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  // 본문 변경 핸들러
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 제목 변경 핸들러 추가
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return {
    isEditing,
    title,
    content,
    toggleEditMode,
    handleContentChange,
    handleTitleChange,
    setContent,
    setTitle,
  };
}

export default ArticleEdit;
