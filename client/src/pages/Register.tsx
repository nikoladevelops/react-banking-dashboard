import api from "../api/axiosInstance.js";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

interface RegisterForm {
  username: string;
  password: string;
}

export default function Register({ setUser }) {
  const { t, i18n } = useTranslation();
  const prevLanguage = useRef(i18n.language);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<RegisterForm>();

  const [errorCode, setErrorCode] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (prevLanguage.current !== i18n.language) {
      const fields = Object.keys(errors) as (keyof RegisterForm)[];
      if (fields.length > 0) {
        trigger(fields);
      }

      prevLanguage.current = i18n.language;
      return;
    }
  }, [i18n.language, trigger, errors]);

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/register", data);
      setUser(res.data.data);
      navigate("/profile");
    } catch (err) {
      setErrorCode(
        err.response?.data?.errorCode || "server.internalServerError",
      );
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-150 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-bold text-center">
          {t("reg-form.register")}
        </h3>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="username"
            className="font-medium text-gray-700 dark:text-white"
          >
            {t("reg-form.username")}
          </label>
          <input
            id="username"
            type="text"
            {...register("username", {
              required: t("errors.auth.usernameRequired"),
              minLength: {
                value: 3,
                message: t("errors.generic.minLength", { count: 3 }),
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="font-medium text-gray-700 dark:text-white"
          >
            {t("reg-form.password")}
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: t("errors.auth.passwordRequired"),
              minLength: {
                value: 6,
                message: t("errors.generic.minLength", { count: 6 }),
              },
            })}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        {errorCode && (
          <span className="text-red-500 text-sm">
            {t(`errors.${errorCode}`)}
          </span>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {t("reg-form.register")}
        </button>
      </form>
    </div>
  );
}
