import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { AxiosError } from "axios";

import {
  useUserByUsername,
  useBlockUser,
  useUnblockUser,
  type User,
} from "../hooks/useUserHooks";
import type { ApiResponse } from "../types/apiResponse";

const UserInfo = () => {
  const { t } = useTranslation();
  const { username } = useParams<{ username: string }>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    data: fullUserData,
    isLoading,
    error: fetchError,
  } = useUserByUsername(username ?? "");

  const { mutate: blockUser, isPending: isBlocking } = useBlockUser();
  const { mutate: unblockUser, isPending: isUnblocking } = useUnblockUser();

  const { register, reset } = useForm<User>();

  useEffect(() => {
    if (fullUserData) {
      reset(fullUserData);
    }
  }, [fullUserData, reset]);

  const handleToggleBlock = () => {
    if (!username) {
      return;
    }
    setErrorMessage(null);

    const action = fullUserData?.isBlocked ? unblockUser : blockUser;

    action(username, {
      onError: (err: Error) => {
        const axiosError = err as AxiosError<ApiResponse>;
        setErrorMessage(
          axiosError.response?.data?.errorCode || "settings.error.generic",
        );
      },
    });
  };

  const inputClass =
    "border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed";
  const labelClass = "font-medium text-gray-700 dark:text-white text-sm";

  if (isLoading) return <div className="p-4">{t("loading.loading")}</div>;
  if (fetchError) {
    const axiosError = fetchError as AxiosError<ApiResponse>;
    const errMsg = axiosError.response?.data?.errorCode || fetchError.message;
    return <div className="p-4 text-red-500">{t(`errors.${errMsg}`)}</div>;
  }

  return (
    <div className="flex items-center justify-center p-4 mb-24">
      <div className="flex flex-col gap-4 w-full max-w-lg bg-white dark:bg-[#0c0e36] p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          {t("settings.title")}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className={labelClass}>{t("settings.username")}</label>
            <input {...register("username")} className={inputClass} disabled />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>{t("settings.role")}</label>
            <input {...register("role")} className={inputClass} disabled />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>{t("settings.email")}</label>
          <input {...register("email")} className={inputClass} disabled />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className={labelClass}>{t("settings.egn")}</label>
            <input {...register("egn")} className={inputClass} disabled />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>{t("settings.identityDoc")}</label>
            <input
              {...register("identityDoc")}
              className={inputClass}
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>{t("settings.fullNameCyrillic")}</label>
          <input
            {...register("fullNameCyrillic")}
            className={inputClass}
            disabled
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>{t("settings.fullNameLatin")}</label>
          <input
            {...register("fullNameLatin")}
            className={inputClass}
            disabled
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className={labelClass}>{t("settings.createdAt")}</label>
            <input
              value={
                fullUserData?.createdAt
                  ? new Date(fullUserData.createdAt).toLocaleDateString()
                  : ""
              }
              className={inputClass}
              disabled
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass}>{t("settings.status")}</label>
            <input
              value={
                fullUserData?.isBlocked
                  ? t("settings.blocked")
                  : t("settings.active")
              }
              className={inputClass}
              disabled
            />
          </div>
        </div>

        <button
          onClick={handleToggleBlock}
          disabled={isBlocking || isUnblocking}
          className={`mt-4 px-4 py-2 rounded-md text-white font-bold transition ${
            fullUserData?.isBlocked
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          } disabled:opacity-50`}
        >
          {isBlocking || isUnblocking
            ? t("loading.loading")
            : fullUserData?.isBlocked
              ? t("settings.unblock")
              : t("settings.block")}
        </button>

        {errorMessage && (
          <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center font-semibold">
            {t(`errors.${errorMessage}`)}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
