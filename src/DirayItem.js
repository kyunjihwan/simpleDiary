import { useState, useRef } from "react";

const DiaryItem = ({
  author,
  content,
  emotion,
  created_date,
  id,
  onRemove,
  onEdit,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  // 수정하기 버튼을 눌렀을 때 실행되는 함수
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  // 수정 취소 버튼을 눌렀을 때 실행되는 함수
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const localContentInput = useRef();
  // 수정 완료 버튼을 눌렀을 때 실행되는 함수
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      setIsEdit(false);
    }
  };

  const [localContent, setLocalContent] = useState(content);

  const handleChangeLocalContent = (e) => {
    setLocalContent(e.target.value);
  };

  // 삭제 버튼을 눌렀을 때 실행되는 함수
  const handleRemove = () => {
    if (window.confirm(`${id}번 일기를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작 성 자 : {author} | 감 정 점 수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              name="localContent"
              value={localContent}
              onChange={handleChangeLocalContent}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};
export default DiaryItem;
