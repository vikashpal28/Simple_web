import { useState } from "react";
import { postMethod, updateMethod } from "../api/Postapi";
import { useEffect } from "react";

export const SearchCom = ({ data, setData, updateObj, setUpdateObj }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });
  const handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setAddData((prev) => {
      // console.log(prev);
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //get the updated data and placed at input tag

  useEffect(()=>{
    updateObj && setAddData({
      title:updateObj.title || "",
      body:updateObj.body || "",
    })
  },[updateObj])

  const addPostData = async () => {
    const res = await postMethod(addData);
    console.log("res", res);
    if (res.status == 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };
  let isEmpty = Object.keys(updateObj).length === 0;
  
  // update method

  const updatePostData = async() =>{
    try{
   const res = await updateMethod(updateObj.id , addData);
   console.log(res);
   if(res.status === 200){
    setData((prev)=>{
    return prev.map((curElem)=>{
      return curElem.id === updateObj.id ? res.data : curElem;
    })
   })
   setAddData({title : "" , body : ""});
   setUpdateObj({});
   }
   
    }
    catch(error){
      console.log(error);
    }
  }

  const formsubmitt = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if(action === "Add"){
         addPostData();
    }
    else if(action === "Edit"){
     updatePostData();
    }

  };
  return (
    <>
      <form
        className="flex  mt-4 gap-4 bg-gray-500 justify-center items-center pl-3 pr-3 pt-2 pb-2 rounded-2xl"
        onSubmit={formsubmitt}
      >
        <div className="bg-white rounded-md">
          <label htmlFor="title"></label>
          <input
            className="outline-0 p-2 w-full sm:w-auto"
            type="text"
            value={addData.title}
            onChange={handleChange}
            name="title"
            required
            placeholder="Add Title"
          ></input>
        </div>
        <div className="bg-white rounded-md">
          <label htmlFor="post"></label>
          <input
            className="outline-0 p-2 w-full sm:w-auto"
            name="body"
            value={addData.body}
            onChange={handleChange}
            type="text"
            required
            placeholder="Add Post"
          ></input>
        </div>
        <button
          type="submit"
          className="bg-red-600 pt-2 pb-2 pl-8 pr-8 rounded-md"
          value={isEmpty ? "Add" : "Edit"}
        >
          {isEmpty ? "Add" : "Edit"}
        </button>
      </form>
    </>
  );
};
