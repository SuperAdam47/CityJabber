import Wrapper from "./layout/wrapper";
import Home2 from "./home/home_2";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserToken, setUserData } from "../features/auth/userslice";

const MainRoot = () => {
  return (
    <Wrapper>
      <Home2 />
    </Wrapper>
  );
};

export default MainRoot;
