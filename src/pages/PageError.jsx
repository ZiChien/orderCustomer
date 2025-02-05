import { useRouteError } from "react-router-dom";

function PageError() {
  const error = useRouteError();
  if (error instanceof Response) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1 className="text-sm font-bold text-button-check">找不到此頁面</h1>
      </div>
    );
  } else {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1 className="text-sm font-bold text-button-check">找不到此頁面</h1>
      </div>
    );
  }
}

export default PageError;
