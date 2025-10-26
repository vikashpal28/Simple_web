import { Post } from "./components/Post";
import { SearchCom } from "./components/SearchCom";

const App = () => {
  return (
    <>
      <div className="bg-gray-950 flex flex-col justify-center items-center w-screen min-h-screen">
        <Post />
      </div>
    </>
  );
};

export default App;
