export default function SignupSuccess() {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Signup Successful!</h1>
            <p className="text-gray-600 mb-4">
              Please check your email to verify your account. If you don't see the email, check your spam folder.
            </p>
            <a
              href="/signin"
              className="inline-block px-6 py-2 font-medium rounded bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Go to Sign In
            </a>
          </div>
        </main>
      </div>
    );
  }