import { useEffect, useRef, useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import axios from "axios";
import api from "../api/axiosInstance.js";
import { useUserStore } from "../userStore.js";
import i18n from "../utility/i18n.js";

// Validation Constants (Matching Backend)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CYRILLIC_REGEX = /^[\u0400-\u04FF\s]+$/;
const LATIN_REGEX = /^[a-zA-Z\s]+$/;
const PHONE_REGEX = /^\+?[\d\-. ]{7,15}$/;
const PASSWORD_REGEX = /[!@#$%^&*(),.?":{}|<>]/;

interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
  egn: string;
  identityDoc?: string;
  fullNameCyrillic: string;
  fullNameLatin: string;
  email: string;
  phone: string;
  address: string;
}

const RequiredLabel = ({ text }: { text: string }) => (
  <span className="font-medium text-gray-700 dark:text-white text-sm">
    {text} <span className="text-red-500">*</span>
  </span>
);

const FieldError = ({
  name,
  errors,
  errorClass,
}: {
  name: keyof RegisterForm;
  errors: FieldErrors<RegisterForm>;
  errorClass: string;
}) =>
  errors[name] ? (
    <span className={errorClass}>{errors[name]?.message}</span>
  ) : null;

export default function Register() {
  const { t } = useTranslation();
  const setUser = useUserStore((state) => state.setUser);

  const prevLanguage = useRef(i18n.language);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<RegisterForm>({ mode: "onBlur" });

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

  const [errorCode, setErrorCode] = useState<string | null>(null);

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await api.post("/auth/register", data);
      setUser(res.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setErrorCode(
          err.response?.data?.errorCode || "server.internalServerError",
        );
      } else {
        setErrorCode("server.internalServerError");
      }
    }
  };

  const inputClass =
    "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full max-w-lg bg-white dark:bg-[#0c0e36] p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-bold text-center mb-2">
          {t("reg-form.register")}
        </h3>

        <div className="flex flex-col gap-1">
          <RequiredLabel text={t("reg-form.username")} />
          <input
            {...register("username", {
              required: t("errors.auth.required"),
              minLength: {
                value: 3,
                message: t("errors.auth.usernameInvalid"),
              },
            })}
            className={inputClass}
          />
          <FieldError name="username" errors={errors} errorClass={errorClass} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <RequiredLabel text={t("reg-form.password")} />
            <input
              type="password"
              {...register("password", {
                required: t("errors.auth.required"),
                minLength: {
                  value: 8,
                  message: t("errors.auth.passwordInvalid"),
                },
                pattern: {
                  value: PASSWORD_REGEX,
                  message: t("errors.auth.passwordInvalid"),
                },
              })}
              className={inputClass}
            />
            <FieldError
              name="password"
              errors={errors}
              errorClass={errorClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <RequiredLabel text={t("reg-form.confirmPassword")} />
            <input
              type="password"
              {...register("confirmPassword", {
                required: t("errors.auth.required"),
                validate: (val, values) =>
                  val === values.password ||
                  t("errors.auth.passwordsDoNotMatch"),
              })}
              className={inputClass}
            />
            <FieldError
              name="confirmPassword"
              errors={errors}
              errorClass={errorClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <RequiredLabel text={t("reg-form.egn")} />
            <input
              {...register("egn", {
                required: t("errors.auth.required"),
                pattern: {
                  value: /^\d{10}$/,
                  message: t("errors.auth.egnInvalid"),
                },
              })}
              className={inputClass}
            />
            <FieldError name="egn" errors={errors} errorClass={errorClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700 dark:text-white text-sm">
              {t("reg-form.identityDoc")}
            </label>
            <input {...register("identityDoc", {})} className={inputClass} />
            <FieldError
              name="identityDoc"
              errors={errors}
              errorClass={errorClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <RequiredLabel text={t("reg-form.fullNameCyrillic")} />
          <input
            {...register("fullNameCyrillic", {
              required: t("errors.auth.required"),
              pattern: {
                value: CYRILLIC_REGEX,
                message: t("errors.auth.nameCyrillicInvalid"),
              },
            })}
            className={inputClass}
          />
          <FieldError
            name="fullNameCyrillic"
            errors={errors}
            errorClass={errorClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <RequiredLabel text={t("reg-form.fullNameLatin")} />
          <input
            {...register("fullNameLatin", {
              required: t("errors.auth.required"),
              pattern: {
                value: LATIN_REGEX,
                message: t("errors.auth.nameLatinInvalid"),
              },
            })}
            className={inputClass}
          />
          <FieldError
            name="fullNameLatin"
            errors={errors}
            errorClass={errorClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <RequiredLabel text={t("reg-form.email")} />
            <input
              type="email"
              {...register("email", {
                required: t("errors.auth.required"),
                pattern: {
                  value: EMAIL_REGEX,
                  message: t("errors.auth.emailInvalid"),
                },
              })}
              className={inputClass}
            />
            <FieldError name="email" errors={errors} errorClass={errorClass} />
          </div>
          <div className="flex flex-col gap-1">
            <RequiredLabel text={t("reg-form.phone")} />
            <input
              {...register("phone", {
                required: t("errors.auth.required"),
                pattern: {
                  value: PHONE_REGEX,
                  message: t("errors.auth.phoneInvalid"),
                },
              })}
              className={inputClass}
            />
            <FieldError name="phone" errors={errors} errorClass={errorClass} />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <RequiredLabel text={t("reg-form.address")} />
          <input
            {...register("address", {
              required: t("errors.auth.required"),
              minLength: { value: 5, message: t("errors.auth.addressInvalid") },
            })}
            className={inputClass}
          />
          <FieldError name="address" errors={errors} errorClass={errorClass} />
        </div>

        {errorCode && (
          <p className="text-red-500 text-center text-sm">
            {t(`errors.${errorCode}`)}
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors mt-2"
        >
          {t("reg-form.register")}
        </button>
      </form>
    </div>
  );
}
