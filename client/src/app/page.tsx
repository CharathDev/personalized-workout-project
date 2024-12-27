export default function Home() {
  return (
    <div className="bg-neutral-950 flex justify-center items-center">
      <main className="container text-center">
        <h1 className="text-4xl font-bold">AI Grindset</h1>

        <div className="bg-neutral-900 rounded-lg md:p-5 p-2 my-6 flex flex-col justify-center items-center shadow-lg">
          <div className="bg-neutral-800 rounded-lg md:p-5 p-2 flex flex-col justify-center items-center shadow-lg w-full mb-5">
            <div className="text-2xl mb-4 font-bold">Stats</div>
            <div className="xl:grid grid-cols-2"></div>
          </div>

          <div className="bg-neutral-800 rounded-lg md:p-5 p-2 flex flex-col justify-center items-center shadow-lg w-full">
            <h2 className="text-2xl mb-2 font-bold">Weight Tracking</h2>
          </div>
        </div>
      </main>
    </div>
  );
}
