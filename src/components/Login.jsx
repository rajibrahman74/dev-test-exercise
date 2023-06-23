import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

const Login = ({ onSubmit }) => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm();

  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (e) => {
    setIsEmailValid(e.target.checkValidity());
  };

  const handleSubmit = (data) => {
    if (errors.email || errors.password) {
      toast.error("Please fix the form errors before submitting.");
    } else {
      onSubmit(data);
    }
  };  

  return (
    <section>
      <ToastContainer />
      <form
        onSubmit={handleFormSubmit(handleSubmit)}
        className="max-w-sm mx-auto p-6 bg-white rounded shadow mt-24"
      >
        <h2 className="text-2xl text-center font-bold mb-8">Login</h2>
        <div className="mb-6">
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email address.",
              },
            })}
            className={`w-full px-4 py-2 border rounded ${
              errors.email || !isEmailValid ? "border-red-500" : "border-gray-500"
            }`}
            onChange={handleEmailChange}
          />

          {(errors.email || !isEmailValid) && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email ? errors.email.message : "Please enter a valid email address."}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required.",
            })}
            className="w-full px-4 py-2 border rounded border-gray-300"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
