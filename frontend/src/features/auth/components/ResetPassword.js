import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { NavLink, Navigate } from "react-router-dom";
import {
  resetPasswordAsync,
  selectError,
  selectPasswordReset,
} from "../authSlice";
import PageNotFound from "../../../pages/404";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const passwordReset = useSelector(selectPasswordReset);
  const error = useSelector(selectError);
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      {email && token ? (
        <div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="/logo.jpg"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Enter New Password
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                noValidate
                className="space-y-6"
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  dispatch(
                    resetPasswordAsync({
                      email,
                      token,
                      password: data.password,
                    })
                  );
                })}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      New Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      {...register("password", {
                        required: "Password required",
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                          message: `- At least 8 characters\n
- Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
- Can contain special characters`,
                        },
                      })}
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                    <p className="text-red-500">
                      {errors.password && errors.password.message}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Confirm Password required",
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "Password dosen't match",
                      })}
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500">
                      {errors.confirmPassword && errors.confirmPassword.message}
                    </p>
                    {passwordReset && (
                      <p className="text-green-500">
                        Password reset succesfully.
                      </p>
                    )}{" "}
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          <PageNotFound />
        </>
      )}
    </div>
  );
}
