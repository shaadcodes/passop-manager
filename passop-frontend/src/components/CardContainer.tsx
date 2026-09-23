import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/context";
import PasswordField from "./PasswordField";
import MobileCard from "./MobileCard";
import { useAuth } from "../context/AuthContext";
import { passopAPI } from "../services/api";
import { decryptData } from "../utils/crypto";
import type { Inputs } from "../types/interfaces";
import { MdOutlineKey } from "react-icons/md";
import { GiOpenChest } from "react-icons/gi";
import { AiFillSecurityScan } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CardContainer = () => {
  const context = useContext(AppContext);
  const { cryptoKey } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (!context) return null;
  const { setIsFormOpen, isFormOpen, passes, setPasses, setEditingPass } =
    context;

  useEffect(() => {
    const fetchAndDecryptVault = async () => {
      if (!cryptoKey) {
        setIsLoading(false);
        return;
      }

      try {
        const rawEntries = await passopAPI.getPasswords();

        const decryptedPromises = rawEntries.map(async (entry) => {
          try {
            const plaintext = await decryptData(
              entry.encrypted_password,
              cryptoKey,
            );
            return {
              _id: entry.id,
              siteName: entry.website_name,
              siteURL: entry.website_url,
              username: entry.username,
              password: plaintext,
            } as Inputs;
          } catch (err) {
            console.error(`Decryption failed for ${entry.website_name}`);
            return {
              _id: entry.id,
              siteName: entry.website_name,
              siteURL: entry.website_url,
              username: entry.username,
              password: "••• DECRYPTION ERROR •••",
            } as Inputs;
          }
        });

        const fullyDecrypted = await Promise.all(decryptedPromises);
        setPasses(fullyDecrypted);
      } catch (error) {
        console.error("Failed to load vault", error);
        setPasses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndDecryptVault();
  }, [cryptoKey, setPasses]);

  const handleDelete = async (id: string) => {
    try {
      await passopAPI.deletePassword(id);
      const updated = (passes || []).filter((p) => p._id !== id);
      setPasses(updated);
    } catch (err) {
      alert("Failed to delete password from server.");
    }
  };

  const handleEdit = (pass: Inputs) => {
    setEditingPass(pass);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return (
      <div className="mt-20 text-center text-lprimary animate-pulse">
        Decrypting vault...
      </div>
    );
  }

  return (
    <>
      <div
        className={`block md:hidden space-y-2 w-[90vw] mx-auto ${isFormOpen ? "blur-xs" : ""} transition-all duration-300`}
      >
        <h1 className="title ml-[3vw] text-dprimary dark:text-white">
          Your Passwords
        </h1>
        {Array.isArray(passes) && passes.length > 0 ? (
          passes.map((pass) => (
            <MobileCard
              key={pass._id}
              pass={pass}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <div className="empty h-[60vh] flex flex-col gap-2 items-center justify-center text-dprimary dark:text-white">
            <GiOpenChest className="size-18" />
            <p>No Passwords currently!</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 m-2 bg-dprimary dark:bg-lsecondary/50 py-2 px-4 rounded-md text-white"
            >
              {" "}
              <MdOutlineKey className="size-6" /> Add one securely
            </button>
            <p className="flex items-center gap-1 text-red-500 text-xs mt-4">
              {" "}
              <AiFillSecurityScan className="size-4" /> Unsure about security?
            </p>
            <Link
              to="/about"
              className="flex items-center gap-2 rounded-md font-bold text-xs font-raleway text-red-500"
            >
              Visit about section <FaArrowRight />{" "}
            </Link>
          </div>
        )}
      </div>

      <div
        className={`cardContainer hidden
        md:flex flex-col
        w-[90vw] h-[75vh]
        mx-auto mt-[5vh] lg:mt-18
        border border-lprimary/50 rounded-xl
        bg-lprimary/10 backdrop-blur-xs shadow-lg
        ${isFormOpen ? "blur-xs" : ""} transition-all duration-300
        dark:bg-dprimary/30 dark:border-lprimary/30`}
      >
        <h1 className="py-1 px-4 my-2 text-dprimary dark:text-white">
          Your Passwords
        </h1>
        <div
          className="infoBand
          flex items-start
          py-2 
          text-[10px]
          border-t border-dprimary/50
          bg-dprimary/90 text-white
          dark:bg-lsecondary/50"
        >
          <h1 className="w-[20%] text-center">Website</h1>
          <h1 className="w-[20%] text-center">URL</h1>
          <h1 className="w-[20%] text-center">Username</h1>
          <h1 className="w-[20%] text-center">Password</h1>
          <h1 className="w-[20%] text-center">Actions</h1>
        </div>
        {Array.isArray(passes) && passes.length > 0 ? (
          passes.map((pass) => <PasswordField key={pass._id} pass={pass} />)
        ) : (
          <div className="empty size-full flex flex-col gap-2 justify-center items-center text-dprimary dark:text-white">
            <GiOpenChest className="size-18" />
            <p>No Passwords currently!</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 m-2 bg-dprimary dark:bg-lsecondary/50 py-2 px-4 rounded-md text-white"
            >
              {" "}
              <MdOutlineKey className="size-6" /> Add one securely
            </button>
            <p className="flex items-center gap-1 text-red-500 text-xs mt-4">
              {" "}
              <AiFillSecurityScan className="size-4" /> Unsure about security?
            </p>
            <Link
              to="/about"
              className="flex items-center gap-2 rounded-md font-bold text-xs font-raleway text-red-500"
            >
              Visit about section <FaArrowRight />{" "}
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CardContainer;
