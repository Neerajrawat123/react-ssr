import React from "react";

const App =  () => {

  const response =  fetch('http://localhost:4000/api/tasks')
  const data =  response.json()
  console.log(data)
  return (
    <div className="container">
      <div className="heading">
        <h1>Task Management app</h1>
      </div>
    </div>
  );
};

export default App;
