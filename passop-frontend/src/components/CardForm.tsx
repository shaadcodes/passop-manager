import { useForm, type SubmitHandler } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/context";
import { useAuth } from "../context/AuthContext";
import { passopAPI } from "../services/api";
import { encryptData } from "../utils/crypto";
import { PiPasswordBold } from "react-icons/pi";
import { CgWebsite } from "react-icons/cg";
import { LuBookUser } from "react-icons/lu";
import { HiOutlineLink } from "react-icons/hi";
import { BiSolidShieldPlus } from "react-icons/bi";

interface Inputs {
  _id: string;
  siteName: string;
  siteURL: string;
  username: string;
  password: string;
}

const CardForm = () => {
  const context = useContext(AppContext);
  const { cryptoKey } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!context) return null;

  const {
    isFormOpen,
    setIsFormOpen,
    passes,
    setPasses,
    editingPass,
    setEditingPass,
  } = context;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (editingPass) {
      reset({
        siteName: editingPass.siteName,
        siteURL: editingPass.siteURL,
        username: editingPass.username,
        password: editingPass.password,
      });
    } else {
      reset({
        siteName: "",
        siteURL: "",
        username: "",
        password: "",
      });
    }
  }, [editingPass, reset]);

  const handleClose = () => {
    setEditingPass(null);
    setIsFormOpen(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!cryptoKey) {
      alert("Session expired. Please lock and unlock your vault.");
      return;
    }

    setIsSubmitting(true);
    try {
      const encryptedString = await encryptData(data.password, cryptoKey);

      const currentList = Array.isArray(passes) ? passes : [];
      let nextList: Inputs[];

      if (editingPass) {
        await passopAPI.updatePassword(editingPass._id, {
          website_name: data.siteName,
          website_url: data.siteURL,
          username: data.username,
          encrypted_password: encryptedString,
        });

        nextList = currentList.map((pass) =>
          pass._id === editingPass._id
            ? {
                ...pass,
                siteName: data.siteName,
                siteURL: data.siteURL,
                username: data.username,
                password: data.password,
              }
            : pass,
        );
      } else {
        const response = await passopAPI.addPassword(
          data.siteName,
          data.siteURL,
          data.username,
          encryptedString,
          "",
        );

        const newPass: Inputs = {
          _id: response.entry_id as string,
          siteName: data.siteName,
          siteURL: data.siteURL,
          username: data.username,
          password: data.password,
        };
        nextList = [...currentList, newPass];
      }

      setPasses(nextList);
      handleClose();
    } catch (error) {
      console.error("Failed to save password", error);
      alert("An error occurred while saving to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isFormOpen) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`
        absolute z-10 inset-x-0 inset-y-0 my-auto
        flex flex-col justify-between gap-4
        mx-auto px-4 lg:px-6 pt-6 pb-4 lg:py-6 w-[90vw] md:w-[50vw] h-fit
        border border-dprimary/30 rounded-xl
        bg-white/40 backdrop-blur-xl
        transition-all duration-300 ease-in-out
        ${isFormOpen ? `scale-100` : `scale-0 transform translate-y-52`}
        dark:bg-dprimary/50 dark:border-dsecondary/60`}
    >
      <div className="inputFields flex flex-col gap-4">
        <div className="webName flex flex-col">
          <div className="websiteName flex ml-2">
            <CgWebsite />
            <label htmlFor="websiteName" className="text-xs lg:text-xl ml-2">
              Website:{" "}
            </label>
          </div>
          <input
            {...register("siteName")}
            className="website
          px-2 py-2 lg:px-6 lg:py-3 w-[90%] mx-auto
          border-b border-dprimary/30
          font-raleway text-xs
          focus:outline-none focus:border-dprimary dark:focus:border-dsecondary
          dark:ring-lprimary/30 dark:border-dsecondary/30
          transition-all duration-100"
          />
        </div>
        <div className="webURL flex flex-col">
          <div className="websiteURL flex ml-2">
            <HiOutlineLink />
            <label htmlFor="websiteURL" className="text-xs lg:text-xl ml-2">
              Website URL:{" "}
            </label>
          </div>
          <input
            {...register("siteURL")}
            className="website
          px-2 py-2 lg:px-6 lg:py-3 w-[90%] mx-auto
          border-b border-dprimary/30
          font-raleway text-xs
          ring-dprimary focus:outline-none focus:border-dprimary dark:focus:border-dsecondary
          dark:ring-lprimary/30 dark:border-dsecondary/30
          transition-all duration-100"
          />
        </div>
        <div className="username flex flex-col">
          <div className="weburl flex ml-2">
            <LuBookUser />
            <label htmlFor="username" className="text-xs lg:text-xl ml-2">
              Username:{" "}
            </label>
          </div>
          <input
            {...register("username", { required: true })}
            className="username
          px-2 py-2 lg:px-6 lg:py-3 w-[90%] mx-auto
          border-b border-dprimary/30
          font-raleway text-xs
          ring-dprimary focus:outline-none focus:border-dprimary dark:focus:border-dsecondary
          dark:ring-lprimary/30 dark:border-dsecondary/30
          transition-all duration-100"
          />
          {errors.username && (
            <span className="text-xs lg:text-xl text-red-600 ml-2 italic">
              This field is required
            </span>
          )}
        </div>
        <div className="password flex flex-col">
          <div className="password flex ml-2">
            <PiPasswordBold />
            <label htmlFor="password" className="text-xs lg:text-xl ml-2">
              Password:{" "}
            </label>
          </div>
          <input
            {...register("password", { required: true })}
            className="username
            px-2 py-2 lg:px-6 lg:py-3 w-[90%] mx-auto
          border-b border-dprimary/30
          font-raleway text-xs
          ring-dprimary focus:outline-none focus:border-dprimary dark:focus:border-dsecondary
          dark:ring-lprimary/30 dark:border-dsecondary/30
          transition-all duration-100"
            type="password"
          />
          {errors.password && (
            <span className="text-xs lg:text-xl text-red-600 ml-2 italic">
              This field is required
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="submit text-sm lg:text-xl font-raleway cursor-pointer px-4 lg:px-6 py-2 lg:py-4 mt-6 md:mb-1 lg:m-3 rounded-md text-white bg-dprimary hover:bg-dsecondary active:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] active:scale-105 active:bg-dsecondary transition-all duration-300 dark:bg-dsecondary/50 dark:active:shadow-[1px_1px_0px_0px_#009c65] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          "Saving..."
        ) : editingPass ? (
          `Update Password`
        ) : (
          <div className="add flex items-center gap-2 justify-center">
            <BiSolidShieldPlus className="size-4 lg:size-8" />
            <p>Add Password</p>
          </div>
        )}
      </button>
    </form>
  );
};

export default CardForm;
