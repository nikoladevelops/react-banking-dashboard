import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUserById, type User } from "../hooks/useUserHooks";
import { useUserStore } from "../userStore";

const Settings = () => {
  const { t } = useTranslation();
  const user = useUserStore((state) => state.user);
  const { data: fullUserData, isLoading, error } = useUserById(user?.id ?? "");

  const { register, reset } = useForm<User>();

  useEffect(() => {
    if (fullUserData) {
      reset(fullUserData);
    }
  }, [fullUserData, reset]);

  const inputClass =
    "border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed";
  const labelClass = "font-medium text-gray-700 dark:text-white text-sm";

  if (isLoading) return <div className="p-4">{t("loading.loading")}</div>;
  if (error) return <div className="p-4 text-red-500">{error.message}</div>;

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
              value={new Date(
                fullUserData?.createdAt || "",
              ).toLocaleDateString()}
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
      </div>
    </div>
  );
};

export default Settings;
