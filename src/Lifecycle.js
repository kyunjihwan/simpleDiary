import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount");

    return () => {
      console.log("Unmount");
    };
  }, []);

  return <div>Unmount Testing Component</div>;
};

const LifeCycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {/* 단락 회로 평가 */}
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default LifeCycle;
