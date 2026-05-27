import api from "../api/axiosInstance.js";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../userStore.js";

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const { t, i18n } = useTranslation();
  const setUser = useUserStore((state) => state.setUser);

  const prevLanguage = useRef(i18n.language);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginForm>();

  const [errorCode, setErrorCode] = useState<string | null>(null);

  useEffect(() => {
    if (prevLanguage.current !== i18n.language) {
      const fields = Object.keys(errors) as (keyof LoginForm)[];
      if (fields.length > 0) {
        trigger(fields);
      }

      prevLanguage.current = i18n.language;
      return;
    }
  }, [i18n.language, trigger, errors]);

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      setUser(res.data.data);
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
        className="flex flex-col gap-5 w-150 bg-white dark:bg-[#0c0e36] p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-bold text-center">
          {t("login-form.login")}
        </h3>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="username"
            className="font-medium text-gray-700 dark:text-white"
          >
            {t("login-form.username")}
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
            {t("login-form.password")}
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
          {t("login-form.login")}
        </button>
      </form>
    </div>
  );
}
