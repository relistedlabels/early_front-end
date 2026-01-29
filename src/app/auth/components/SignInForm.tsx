"use client";

import React, { useState } from "react";
import { Paragraph1, Paragraph3 } from "@/common/ui/Text";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiEyeSlash,
} from "react-icons/hi2";
import SocialSignInOptions from "./SocialSignInOptions";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLogin } from "@/lib/queries/auth/useLogin";
import { useRouter } from "next/navigation";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();
  const router = useRouter();
  const authRedirect = useAuthRedirect();

  return (
    <div className="font-sans-">
      <div className="max- sm:w-[500px] w-full bg-white p-4 md:p-8 pb-[100px] sm:pb-0 sm:rounded-3xl text-gray-600">
        {/* Header */}
        <div className="mb-8 text-center flex-col items-center flex justify-center">
          <img src="/images/logo1.svg" alt="" className="h-10 w-10 mb-4" />
          <Paragraph3 className="text-2xl font-bold text-black mb-1">
            Welcome Back
          </Paragraph3>
          <Paragraph1 className="text-sm text-gray-600 max-w-[350px] leading-relaxed">
            Explore fashion at your fingertips — rent unique pieces or manage
            your listings with ease.
          </Paragraph1>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            login.mutate(values, {
              onSuccess: (data) => {
                if ((data as any).profileComplete) {
                  router.push("/listers/inventory");
                } else {
                  router.push("/auth/profile-setup");
                }
              },
            });
          }}
        >
          {() => (
            <Form className="space-y-5">
              {/* Email */}
              <div>
                <Paragraph1 className="text-sm font-medium mb-2">
                  Email Address
                </Paragraph1>

                <div className="relative">
                  <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-4 pl-12 border border-gray-300 rounded-lg"
                  />
                </div>

                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <Paragraph1 className="text-sm font-medium mb-2">
                  Password
                </Paragraph1>

                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full p-4 pl-12 pr-12 border border-gray-300 rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <HiEyeSlash className="w-5 h-5" />
                    ) : (
                      <HiOutlineEye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />

                <div className="flex justify-end mt-2">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={login.isPending}
                className="w-full py-4 font-semibold text-white bg-black rounded-lg disabled:opacity-50"
              >
                {login.isPending ? "Signing in..." : "Sign in"}
              </button>

              {login.error && (
                <p className="text-sm text-red-500">
                  {(login.error as Error).message}
                </p>
              )}
            </Form>
          )}
        </Formik>

        {/* Social Login */}
        <div className="mt-8">
          <SocialSignInOptions />
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
