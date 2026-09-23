import CardContainer from "../components/CardContainer";
import CardForm from "../components/CardForm";
import { useContext, useState } from "react";
import { AppContext } from "../context/context";
import { useAuth } from "../context/AuthContext";
import { GiLockedChest } from "react-icons/gi";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  const context = useContext(AppContext);
  const { cryptoKey, logout } = useAuth();
  const [buttonState, setButtonState] = useState<boolean>(false);

  if (!context) return null;
  const { isFormOpen, setIsFormOpen } = context;

  if (!cryptoKey) {
    return (
      <section className="flex flex-col items-center justify-center h-[93vh]">
        <div className="card bg-lprimary/30 backdrop-blur-xs dark:bg-dprimary flex flex-col items-center p-8 m-6 rounded-3xl border border-transparent dark:border-lprimary/15">
          <GiLockedChest className="size-18 m-2" />
          <h2 className="flex items-center justify-between mb-2 text-2xl font-bold text-dprimary dark:text-lprimary">
            Vault Locked
          </h2>
          <p className="mb-6 text-lsecondary">
            Your session expired. Please log in to decrypt your vault.
          </p>
          <Link to="/login">
            <button
              onClick={logout}
              className="flex items-center mx-auto gap-2.5 px-6 py-2 bg-dprimary dark:bg-lprimary text-white dark:text-dprimary rounded-md shadow hover:opacity-90"
            >
              <FiArrowLeft /> Return to Login
            </button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      className="
      overflow-y h-[93vh]
      pt-20
      "
    >
      <button
        className={`formButton
            hidden fixed z-10 top-[76vh] lg:top-[78vh] xl:top-[80vh] right-[10vh]
            md:flex items-center justify-center
            py-2 disabled:invert-25
            `}
        onClick={() => {
          setButtonState(!buttonState);
          setTimeout(() => {
            setIsFormOpen(!isFormOpen);
            setButtonState(false);
          }, 1400);
        }}
        disabled={buttonState}
      >
        {isFormOpen ? (
          <lord-icon
            src="/assets/closeAddPassword.json"
            trigger="click"
            className="size-18 lg:size-24 text-dprimary active:scale-110 transition-all duration-150 ease-out
                bg-dprimary rounded-full"
          ></lord-icon>
        ) : (
          <lord-icon
            src="/assets/addPassword.json"
            trigger="click"
            className="size-18 lg:size-24 text-dprimary active:scale-110 transition-all duration-150 ease-out
                bg-dprimary rounded-full"
          ></lord-icon>
        )}
      </button>
      <CardForm />
      <CardContainer />
    </section>
  );
};

export default Home;
