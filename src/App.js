import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


const getLocalItem = () => {
  let list = localStorage.getItem("lists");
  console.log(list);
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [activity, setActivity] = useState("");
  const [listdata, setlistData] = useState(getLocalItem());


  function addActivity() {
    setlistData((listdata) => {
      const updatedList = [...listdata, activity];
      setActivity("");
      return updatedList;

    });

  }

  function removeActivity(i) {
    const updatedlistData = listdata.filter((elem, id) => {
      return i != id;
    });
    setlistData(updatedlistData);
  }

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(listdata));
  }, [listdata]);

  return (
    <div className="head">
      <div className="container">
    <h2>Todo List📙</h2>

        <input
          type="text"
          name="name"
          placeholder="Add Activity..."
          value={activity}
          required
          onChange={(e) => setActivity(e.target.value)}
        />
    
        <Button onClick={addActivity}>
          Add
        </Button>
        <p className="list-heading">Here is Your List🙂 </p>

        {
          listdata.map((data, i) => {
            return (
              <>
              
                  <div key={i} className="listdata">{data}</div>
                  <div className="btn-pos">
                    <Button variant="primary" onClick={() => removeActivity(i)}>
                     X
                     </Button>
                  </div>
               
              </>
            );
          })}
      </div>
    </div>
  );
}

export default App;
