import DiaryEditor from "./DiaryEditor";
import "./App.css";
import DiaryList from "./DiaryList";
import { useState, useRef } from "react";
import LifeCycle from "./Lifecycle";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(1);

  // 일기 생성하는 함수
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  // 일기 삭제하는 함수
  const onRemove = (targetId) => {
    console.log(`${targetId} 삭제`);
    // 해당 id 포함하지 않는 새로운 배열 생성
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  // 일기 수정하는 함수
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((e) => (e.id === targetId ? { ...e, content: newContent } : e))
    );
  };

  return (
    <div className="App">
      <LifeCycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
