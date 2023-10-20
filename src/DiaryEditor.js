import { useRef, useState } from "react";

const DiaryEditor = ({ onCreate }) => {
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // 일기 저장하는 함수
  const handleSubmit = () => {
    // 작성자 조건 검사
    if (state.author.length < 1) {
      authorInput.current.focus();
      // focus
      return;
    }

    // 내용 조건 검사
    if (state.content.length < 5) {
      contentInput.current.focus();
      // focus
      return;
    }
    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공");
    // 작성 후 초기화
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>

      {/* 작성자 입력 받는 곳 */}
      <div>
        {/* 
            author는 input의 value로 설정되어 있기 때문에, input의 값을 넣어도 변하지 않습니다. 
            setAuthor를 사용해서 author의 값을 바꿀 수 있다.
        */}
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>

      {/* 내용 입력 받는 곳 */}
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>

      {/* 감성점수 입력 받는 곳 */}
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      {/* submit 버튼 */}
      <div>
        오늘의 감정 점수 : <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
