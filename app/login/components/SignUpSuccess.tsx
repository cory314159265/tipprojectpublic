// SignupSuccessPage.tsx

import React from "react";

interface SignupSuccessPageProps {
  email: string;
}

const SignupSuccessPage: React.FC<SignupSuccessPageProps> = ({ email }) => {
  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-md mx-auto">
        <p className="text-lg font-bold mb-6">
          Check your email at {email} to verify your email address and complete
          signup.
        </p>
      </div>
    </div>
  );
};

export default SignupSuccessPage;
