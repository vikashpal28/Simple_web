import { useState } from "react";
import { deletePost, getPost } from "../api/Postapi";
import { useEffect } from "react";
import { SearchCom } from "./SearchCom";

export const Post = () => {
  const [data, setData] = useState([]);
  const [updateObj , setUpdateObj] = useState({});
  const getData = async () => {
    const res = await getPost();
    console.log(res.data);
    setData(res.data);
  };

  const editMethod = (curElem) =>{
     setUpdateObj(curElem);
     console.log(curElem);
  }

  //delete method

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status == 200) {
        const updatedData = data.filter((curElem) => {
          return curElem.id != id;
        });
        setData(updatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <SearchCom data={data} setData={setData} updateObj={updateObj} setUpdateObj={setUpdateObj} />
      <section>
        <ul className="flex justify-around flex-wrap items-center gap-5 mt-5">
          {data.map((curElem) => {
            return (
              <li
                key={curElem.id}
                className="border h-[300px] w-[355px] pl-4 pt-4 pr-2 bg-gray-700 rounded-md text-white"
              >
                <p>{curElem.id}.</p>
                <p className="pb-2">Title : {curElem.title}</p>
                <p className="pb-2">Body : {curElem.body}</p>
                <button className="bg-green-500 pl-4 pr-4 pt-2 pb-2 rounded-md mt-2 text-black" onClick={()=>editMethod(curElem)}>
                  Edit
                </button>
                <button
                  className="bg-red-600 pl-4 pr-4 pt-2 pb-2 rounded-md ml-5 mt-2 text-black"
                  onClick={() => handleDeletePost(curElem.id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};
