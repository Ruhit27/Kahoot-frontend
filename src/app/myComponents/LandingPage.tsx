export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-purple-600 flex flex-col justify-center items-center text-white">
      <h1 className="text-5xl font-bold mb-6">Kahoot Clone</h1>
      <input
        type="text"
        placeholder="Enter game code"
        className="px-4 py-2 rounded text-black mb-4"
      />
      <button className="bg-white text-purple-600 px-6 py-2 rounded hover:bg-gray-200">
        Join Game
      </button>
    </div>
  );
};
