import DiaryEditor from "./DiaryEditor";
import "./App.css";
import DiaryList from "./DiaryList";
import { useState, useRef, useEffect, useMemo } from "react";
import OptimizeTest from "./OptimizeTest";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(1);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

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

  // useMemo로 부터 값을 리턴받는다.
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]); // [] 안에 있는 값이 바뀔 때만 재실행

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <OptimizeTest />
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}% </div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
