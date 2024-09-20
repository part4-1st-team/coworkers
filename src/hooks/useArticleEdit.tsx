import { useState } from 'react';

function ArticleEdit(initialContent: string) {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

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

export default ArticleEdit;
