export const MainImage = () => {
    return (
        <div className="hidden sm:block absolute h-[90%] aspect-square left-1/2 -translate-x-1/2 z-10">
            <div className="relative flex flex-col items-center w-full h-full">
                <div className="absolute w-[20%] aspect-square rounded-[50%] overflow-hidden left-1/2 -translate-x-1/2 top-0 box-shadow hover:w-[21%] transition-all">
                    <img src="src/assets/img1.png" alt="" className="object-cover h-full w-full" />
                </div>
                <div className="absolute h-[50%] w-[50%] top-[20%] left-1/2 -translate-x-1/2">
                    <img src="src/assets/Earth.png" alt="" className="h-full mx-auto" />
                </div>
                <div className="absolute w-[20%] aspect-square rounded-[50%] overflow-hidden right-[12%] top-[12%] box-shadow hover:w-[21%] transition-all">
                    <img src="src/assets/img1.png" alt="" className="object-cover h-full w-full" />
                </div>
                <div className="absolute w-[20%] aspect-square rounded-[50%] overflow-hidden right-0 top-1/2 -translate-y-1/2 box-shadow hover:w-[21%] transition-all">
                    <img src="src/assets/img1.png" alt="" className="object-cover h-full w-full" />
                </div>
                <div className="absolute w-[20%] aspect-square rounded-[50%] overflow-hidden right-[12%] bottom-[12%] box-shadow hover:w-[21%] transition-all">
                    <img src="src/assets/img1.png" alt="" className="object-cover h-full w-full" />
                </div>
                <div className="absolute w-[20%] aspect-square rounded-[50%] overflow-hidden bottom-0 left-1/2 -translate-x-1/2 box-shadow hover:w-[21%] transition-all">
                    <img src="src/assets/img1.png" alt="" className="object-cover h-full w-full" />
                </div>
                <div className="absolute w-[20%] aspect-square rounded-[50%] overflow-hidden left-[12%] bottom-[12%] box-shadow hover:w-[21%] transition-all">
                    <img src="src/assets/img1.png" alt="" className="object-cover h-full w-full" />
                </div>
                <div className="absolute w-[20%] aspect-square rounded-[50%] overflow-hidden left-0 top-1/2 -translate-y-1/2 box-shadow hover:w-[21%] transition-all">
                    <img src="src/assets/img1.png" alt="" className="object-cover h-full w-full" />
                </div>
                <div className="absolute w-[20%] aspect-square rounded-[50%] overflow-hidden left-[12%] top-[12%] box-shadow hover:w-[21%] transition-all">
                    <img src="src/assets/img1.png" alt="" className="object-cover h-full w-full" />
                </div>
            </div>
        </div>
    )
}