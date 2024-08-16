export default function Confirm() {
    return (
        <div className="flex flex-col items-center justify-center mt-[38vh]">
            <h1 className="text-2xl font-bold my-4">訂單已送出！</h1>
            <div className="flex flex-col items-center rounded-lg  border-button-check-border border-2">
                <div className="bg-light-bg-theme w-full text-center rounded-t-lg px-2 py-1 text-sm">自取號碼</div>
                <div className="bg-white w-full text-center rounded-b-lg font-semibold text-lg py-2">3</div>
            </div>
        </div>
    )
}