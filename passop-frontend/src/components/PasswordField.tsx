import { useContext, useState } from "react";
import { AppContext } from "../context/context";
import { useForm, type SubmitHandler } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import type { Inputs } from "../types/interfaces";
import { passopAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { encryptData } from "../utils/crypto";

interface PassFieldProps {
  pass: Inputs;
}

const PasswordField = ({ pass }: PassFieldProps) => {
  const context = useContext(AppContext);
  const { cryptoKey } = useAuth();

  if (!context) return null;

  const { passes, setPasses, darkMode } = context;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    defaultValues: {
      _id: pass._id,
      siteName: pass.siteName,
      siteURL: pass.siteURL,
      username: pass.username,
      password: pass.password,
    },
  });

  const handleEdit = () => {
    if (window.confirm("Editing will reveal the password. Continue?")) {
      reset({
        _id: pass._id,
        siteName: pass.siteName,
        siteURL: pass.siteURL,
        username: pass.username,
        password: pass.password,
      });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!cryptoKey) {
      alert("Session expired! Please lock and unlock your vault.");
      return;
    }

    setIsSubmitting(true);

    try {
      const encryptedString = await encryptData(data.password, cryptoKey);

      await passopAPI.updatePassword(pass._id, {
        website_name: data.siteName,
        website_url: data.siteURL || "",
        username: data.username,
        encrypted_password: encryptedString,
      });

      setPasses((prevPasses) => {
        return (prevPasses || []).map((p) =>
          p._id === pass._id
            ? {
                ...p,
                siteName: data.siteName,
                siteURL: data.siteURL,
                username: data.username,
                password: data.password,
              }
            : p,
        );
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update password: ", error);
      alert("Failed to update password on server!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (passId: string) => {
    if (window.confirm("Do you want to delete this password?")) {
      try {
        await passopAPI.deletePassword(passId);
        const updatedPasses = (passes || []).filter((p) => p._id !== passId);
        setPasses(updatedPasses);
      } catch (error) {
        console.error("Failed to delete password: ", error);
        alert("Failed to delete password from server!");
      }
    }
  };

  if (!isEditing) {
    return (
      <div
        className="card
                    flex items-center
                    px-3 text-xs lg:text-sm xl:text-base text-dprimary
                    h-12 lg:h-16 xl:h-18 bg-white border-b border-dprimary/50
                    dark:bg-dprimary dark:text-white dark:border-lprimary/30"
      >
        <h1
          className="site
                    flex items-center
                    border-r border-dprimary/50 px-4 h-full
                    w-[20%]
                    dark:border-lprimary/30"
        >
          {pass.siteName}
        </h1>
        <h1
          className="siteURL
                    flex items-center
                    border-r border-dprimary/50 px-4 h-full
                    w-[20%]
                    dark:border-lprimary/30"
        >
          <span className="overflow-auto font-raleway">{pass.siteURL}</span>
        </h1>
        <p
          className="user
                    flex items-center
                    border-r border-dprimary/50 px-4 h-full
                    w-[20%]
                    dark:border-lprimary/30"
        >
          <span className="overflow-auto">{pass.username}</span>
        </p>
        <p
          className="pass
                    flex items-center
                    border-r border-dprimary/50 px-4 h-full
                    w-[20%]
                    dark:border-lprimary/30"
        >
          {"*".repeat(pass.password.length)}
        </p>
        <div
          className="act
                    text-[8px] lg:text-xs xl:text-base
                    flex items-center justify-around px-1.5 h-full
                    w-[20%] font-raleway"
        >
          <button
            className="delete
                        flex items-center gap-1
                        border border-transparent px-3 py-1.5 font-bold rounded-full text-red-600
                        hover:bg-red-300 active:bg-red-300 hover:border-red-500/50 active:border-red-500/50
                        transition-all duration-300 ease-in-out
                        dark:text-red-700"
            onClick={() => handleDelete(pass._id)}
          >
            {darkMode ? (
              <lord-icon
                src="/assets/delete.json"
                trigger="hover"
                className="size-4 lg:size-5 xl:size-6"
              />
            ) : (
              <lord-icon
                src="/assets/darkdelete.json"
                trigger="hover"
                className="size-4 lg:size-5 xl:size-6"
              />
            )}
            <p className="pt-0.5">Delete</p>
          </button>
          <button
            className="edit
                        flex items-center gap-1.5
                        border border-transparent px-3 py-1.5 text-teal-600 dark:text-white font-bold rounded-full
                        hover:bg-teal-300 active:bg-teal-300 hover:border-teal-500/50 active:border-teal-500/50
                        transition-all duration-300 ease-in-out"
            onClick={() => handleEdit()}
          >
            {darkMode ? (
              <lord-icon
                src="/assets/edit.json"
                trigger="hover"
                className="size-4 lg:size-5 xl:size-6"
              />
            ) : (
              <lord-icon
                src="/assets/edit.json"
                trigger="hover"
                colors="primary:white,secondary:white"
                className="size-4 lg:size-5 xl:size-6"
              />
            )}
            <p className="pt-0.5">Edit</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card
      animate-in fade-in-0 animate-out fade-out-10
      flex items-center
      px-3 pr-8 text-[10px] text-dprimary font-raleway
      h-12 lg:h-14 xl:h-16 bg-white border border-dprimary/50
      scale-105 transition-all duration-300
      dark:bg-dprimary/50 dark:border-lprimary/30 dark:text-white"
    >
      <div
        className="site
            group
            flex justify-center flex-col
            border-r border-dprimary/50 h-full
            w-[20%] font-dm-serif
            dark:border-lprimary/30"
      >
        <input
          {...register("siteName", { required: true })}
          className="py-1 px-2 focus:outline-none"
        />
        <div
          className="w-0 group-focus-within:w-[95%] h-px bg-dprimary/50 dark:bg-lprimary/60 
        group-focus-within:animate-pulse transition-all duration-300"
        />
        {errors.siteName && (
          <span className="text-[9px] text-red-500">Required</span>
        )}
      </div>

      <div
        className="siteURL
            group
            flex justify-center flex-col
            border-r border-dprimary/50 px-2 h-full
            w-[20%] font-raleway
            dark:border-lprimary/30"
      >
        <input
          {...register("siteURL", { required: true })}
          className="py-1 px-2 focus:outline-none"
        />
        <div
          className="w-0 group-focus-within:w-full mx-auto h-px bg-dprimary/50 dark:bg-lprimary/60 
        group-focus-within:animate-pulse transition-all duration-300"
        />
        {errors.siteURL && (
          <span className="text-[9px] text-red-500">Required</span>
        )}
      </div>

      <div
        className="user
            group
            flex justify-center items-center flex-col
            border-r border-dprimary/50 px-2 h-full
            w-[20%]
            dark:border-lprimary/30"
      >
        <input
          {...register("username", { required: true })}
          className="py-1 px-2 focus:outline-none"
        />
        <div
          className="w-0 group-focus-within:w-full h-px bg-dprimary/50 dark:bg-lprimary/60
        group-focus-within:animate-pulse transition-all duration-300"
        />
        {errors.username && (
          <span className="text-[9px] text-red-500">Required</span>
        )}
      </div>

      <div
        className="pass
            group
            flex justify-center items-center flex-col
            border-r border-dprimary/50 px-2 h-full
            w-[20%]
            dark:border-lprimary/30"
      >
        <input
          {...register("password", { required: true })}
          className="py-1 px-2 focus:outline-none"
        />
        <div
          className="w-0 group-focus-within:w-full h-px bg-dprimary/50 dark:bg-lprimary/60
        group-focus-within:animate-pulse transition-all duration-300"
        />
        {errors.password && <span>This field is required!</span>}
      </div>

      <div
        className="act
          text-[8px]
          flex items-center gap-2 justify-around px-4 h-full
          w-[20%] font-raleway"
      >
        <button
          type="button"
          className="cancel
            flex items-center gap-1
            border border-transparent px-3 py-1.5 font-bold rounded-full text-red-600
            bg-red-300 hover:border-red-5 active:border-red-500/50
            transition-all duration-300 ease-in-out
            dark:bg-[#a31539] dark:text-red-400"
          onClick={handleCancel}
        >
          <MdCancel className="size-4" />
          <p className="pt-0.5">Cancel</p>
        </button>
        <button
          type="submit"
          className="save
            flex gap-1 border border-transparent
            text-teal-600 font-bold px-3 py-1.5 rounded-full
            bg-teal-300 hover:border-teal-5 active:border-teal-500/50
            transition-all duration-300 ease-in-out
            dark:bg-teal-800 disabled:bg-transparent"
          disabled={!isDirty || isSubmitting}
        >
          <lord-icon
            src="/assets/save.json"
            trigger="hover"
            className="size-4"
          />
          <p className="pt-0.5">{isSubmitting ? "..." : "Save"}</p>
        </button>
      </div>
    </form>
  );
};

export default PasswordField;
