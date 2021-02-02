import Main from "./components/Main";

const App = () => (
  <div className="container mx-auto max-w-5xl">
    <div className="flex items-center flex-wrap mb-20">
      <div className="w-full mb-4 text-center">
        <h1 className="mt-5">My Selections POC v3</h1>
      </div>
      <div className="w-full mb-4">
        <Main />
      </div>
    </div>
  </div>
);
export default App;
