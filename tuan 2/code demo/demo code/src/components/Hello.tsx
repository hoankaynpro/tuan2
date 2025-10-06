import React from "react";

type HelloProps = {
  name: string;
  age?: number; // age là tùy chọn
};

const Hello: React.FC<HelloProps> = ({ name, age }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Xin chào, {name} 👋</h2>
      {age && <p>Tuổi của bạn là: {age}</p>}
    </div>
  );
};

export default Hello;
