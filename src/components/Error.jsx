export default function Error({ errorTitle, errorMessage }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <h6 className="font-bold text-button-check text-center">
          {errorTitle}
        </h6>
        <h6 className="font-bold text-button-check text-center">
          {errorMessage}
        </h6>
      </div>
    </div>
  );
}
