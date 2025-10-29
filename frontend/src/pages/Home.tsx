export default function Home() {
  return (
    <div className="p-6 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-green-600">Welcome to HeuNets 🌱</h1>
      <p className="text-gray-700 text-lg text-center max-w-2xl">
        Manage your projects and tasks efficiently. Track progress, assign tasks, and collaborate seamlessly. 
        HeuNets makes project management effortless and intuitive.
      </p>
      <img 
        src="https://cdn-icons-png.flaticon.com/512/2910/2910761.png" 
        alt="project illustration" 
        className="mt-6 w-80"
      />
    </div>
  );
}
