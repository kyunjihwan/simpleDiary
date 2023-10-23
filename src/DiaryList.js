import { DiaryStateContext } from "./App";
import DiaryItem from "./DirayItem";
import { useContext } from "react";

const DiaryList = () => {
  // useContext를 사용하여 DiaryStateContext의 값을 읽어온다.
  const diaryList = useContext(DiaryStateContext);
  return (
    <div className="DiaryList">
      <h2>일기 목록</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          // key 값을 설정해주어야 합니다.
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

// props의 기본값을 설정하는 방법
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
