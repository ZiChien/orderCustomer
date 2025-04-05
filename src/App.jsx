import { useEffect } from "react";
import "./App.css";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useTransition, animated } from "@react-spring/web";
import { useQuery, gql } from "@apollo/client";
import liff from "@line/liff";
import { setProfile, setAccessToken } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { setMerchantInfo } from "./store/merchantSlice";
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { merchant } = useParams();
  const merchantInfo = useSelector((state) => state.merchant.merchantInfo);
  const GET_MERCHANT = gql`
    query GetMerchant($name: String!) {
      getMerchant(name: $name) {
        id
        name
        displayName
        address
        phone
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_MERCHANT, {
    variables: { name: merchant },
  });
  useEffect(() => {
    if (error) {
      throw new Response("發生錯誤", { status: 404, statusText: error });
    }
    if (data) {
      const merchant = data.getMerchant;
      if (merchant === null) {
        throw new Error("此頁面不存在", { cause: "This page doesn't exist!" });
      }
      dispatch(setMerchantInfo(merchant));
      initLiff();
    }
    function initLiff() {
      liff.init(
        { liffId: "2006877345-mMM79BXz" },
        async function () {
          // if (!liff.isInClient() && !liff.isLoggedIn()) {
          //   liff.login({ redirectUri: window.location.href });
          // }
          if (liff.isLoggedIn()) {
            const accessToken = liff.getAccessToken();
            const profile = await liff.getProfile();
            dispatch(setProfile(profile));
            dispatch(setAccessToken(accessToken));
          } else {
            console.log("Line login failed");
          }
        },
        function (error) {
          console.error(error);
        }
      );
    }
  }, [data, error, merchant, dispatch]);

  const transitions = useTransition(location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    // leave: { opacity: 0, },
    // exitBeforeEnter: true,
    config: { duration: 300 },
    keys: location.pathname,
    // onRest: (result, ctrl, item) => {
    //   // 当旧页面的 leave 动画完成时才让新页面开始 enter 动画
    //   if (result.key === item) {
    //     ctrl.start({ opacity: 1, transform: 'translateY(0px)' });
    //   }
    // }
  });
  return transitions((style, location) => {
    return (
      <>
        {merchantInfo && (
          <Helmet>
            <title>{merchantInfo.name} | ZCorder</title>
          </Helmet>
        )}
        <animated.div
          className={"w-full max-w-[768px] min-h-full m-auto flex flex-col md:border-x-2 md:shadow-lg touch-manipulation"}
          style={{ ...style }}
        >
          <Outlet />
        </animated.div>
      </>
    );
  });
}

export default App;
