import { useState } from 'react';

function CommentEdit(initialTitle: string, initialContent: string) {
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

  return {
    isEditing,
    content,
    toggleEditMode,
    handleContentChange,
    setContent,
  };
}

export default CommentEdit;
