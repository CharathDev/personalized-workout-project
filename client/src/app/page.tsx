export default function Home() {
  return (
    <div className="bg-neutral-950 flex justify-center items-center">
      <main className="container text-center">
        <h1 className="text-4xl font-bold">AI Grindset</h1>

        <div className="bg-neutral-900 rounded-lg md:p-5 p-2 my-6 flex flex-col justify-center items-center shadow-lg">
          <div className="bg-neutral-800 rounded-lg md:p-5 p-2 flex flex-col justify-center items-center shadow-lg w-full mb-5">
            <div className="text-2xl mb-4 font-bold">Stats</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-neutral-700">
                <img
                  className="w-full h-96"
                  src="/image1.png"
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    Goals distribution
                  </div>
                  <p className="text-gray-300 text-base">
                    Build Muscle and Lose Fat are the most common
                  </p>
                </div>
              </div>
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-neutral-700">
                <img
                  className="w-full h-96"
                  src="/image2.png"
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    Gender Distribution
                  </div>
                  <p className="text-gray-300 text-base">
                    Both Male and Female are almost the same
                  </p>
                </div>
              </div>
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-neutral-700">
                <img
                  className="w-full h-96"
                  src="/image3.png"
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    Levels distribution
                  </div>
                  <p className="text-gray-300 text-base">
                    Beginner and Itermediate are the most common
                  </p>
                </div>
              </div>
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-neutral-700">
                <img
                  className="w-full h-96"
                  src="/image4.png"
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    Time distribution
                  </div>
                  <p className="text-gray-300 text-base">
                    Most common workout times per day are between 40 - 80
                    minutes
                  </p>
                </div>
              </div>
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-neutral-700">
                <img
                  className="w-full h-96"
                  src="/image5.png"
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    Days distribution
                  </div>
                  <p className="text-gray-300 text-base">
                    Most common workout days per week are lesser than 5
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
