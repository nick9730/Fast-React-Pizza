
import { useSelector } from "react-redux";
import CreateUser  from "../features/User/CreateUser";
import Button from "./Button";

function Home() {
const username = useSelector((state)=>state.user.username)


  return (
    <div className="my-10 sm:my-16 px-4  text-center">
      <h1 className=" font-semibold  text-3xl  mb-8 ">
        The best pizza.
        <br />
        <span className="text-yellow-500">

        Straight out of the oven, straight to you.
        </span>
      </h1>
      {username===""? <CreateUser></CreateUser>:<Button to='/menu' type='primary'>Continue orderding,{username}</Button>}
    </div>
  );
}

export default Home;
