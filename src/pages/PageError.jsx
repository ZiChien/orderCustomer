import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import Error from "../components/Error";
function PageError() {
  const error = useRouteError();
  console.log(error);

  //handle route's error
  if (isRouteErrorResponse(error)) {
    if (error.status === 404)
      return (
        <Error
          errorTitle={"找不到此頁面"}
          errorMessage={"This page doesn't exist!"}
        />
      );
    else if (error.status === 503)
      return (
        <Error
          errorTitle={"伺服器錯誤"}
          errorMessage={"Looks like our API is down"}
        />
      );
    return (
      <Error errorTitle={"發生錯誤"} errorMessage={"Something went wrong!"} />
    );
  }
  // if(error instanceof Error){
  //   console.error(error.message);
  // }

  console.log(error instanceof Error);
  
  //handle munally thrown error
  if (error instanceof Response) {
    
    console.log(error);
    

    return <Error errorTitle={error.status} errorMessage={error.statusText} />;
  }

  //handle other errors like js error
  return <Error errorTitle={error.message} errorMessage={error.cause} />;
}

export default PageError;
