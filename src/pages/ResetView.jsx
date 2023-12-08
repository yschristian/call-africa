import Header from "../components/Auth/Header";
import Reset from "../components/Auth/Reset";

const ResetView = () => {
  return (
    <>
      <div className="bg-white min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white max-w-md w-full space-y-4 border p-6 rounded shadow-lg">
          <Header heading="Reset Password" />
          <Reset />
        </div>
      </div>
    </>
  );
};

export default ResetView;
