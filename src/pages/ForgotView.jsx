import Forgot from "../components/Auth/Forgot";
import Header from "../components/Auth/Header";

const ForgotView = () => {
  return (
    <>
      <div className="bg-white min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white max-w-md w-full space-y-4 border p-6 rounded shadow-lg">
          <Header heading="" />
          <Forgot />
        </div>
      </div>
    </>
  );
};

export default ForgotView;
