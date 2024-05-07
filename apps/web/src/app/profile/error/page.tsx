import ErrorCard from "@/components/ErrorCard";
import React from "react";

const ProfileError = () => {
  return (
    <ErrorCard
      heading="ログインしてから再度お試しください。"
      message="To use this feature, you need to log in. Please log in and try again."
      button="Login"
      link="/api/auth/signin"
    />
  );
};

export default ProfileError;
