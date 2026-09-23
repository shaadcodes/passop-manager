import { useContext, useState } from "react";
import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import About from "../routes/about";
import Contact from "../routes/contact";
import CodeView from "../routes/codeview";
import Home from "../routes/home";
import Switch from "./switch";
import { AppContext } from "../context/context";
import { Login } from "../routes/Login";
import { Register } from "../routes/Register";
import { ProtectedRoute, PublicRoute } from "../utils/RouteGuard";

const Navbar = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { darkMode, setDarkMode, isFormOpen, setIsFormOpen } = context;

  const [formButtonDisabled, setFormButtonDisabled] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <div
        className={`container
        fixed z-10 inset-x-0
        flex items-center justify-between
        h-fit p-2
        mx-auto border-b border-b-dprimary/30
        bg-white/40 backdrop-blur-md
        ${isFormOpen ? "blur-xs" : ""}
        transition-all duration-300
        dark:bg-dprimary/40 dark:border-b-lsecondary/30`}
      >
        <div
          className="logoandtitle 
          flex flex-col justify-center gap-0.5
          m-2 ml-8 lg:m-4 lg:ml-10
          "
        >
          <Link
            to="/login"
            className="logo
            group
            flex items-center
            text-lg
            lg:text-3xl
            "
          >
            {darkMode ? (
              <lord-icon
                src="/assets/logo.json"
                trigger="click"
                className="size-8 lg:size-10 xl:size-12"
              />
            ) : (
              <lord-icon
                src="/assets/darklogo.json"
                trigger="click"
                className="size-8 lg:size-10 xl:size-12"
              />
            )}
            <h1 className="ml-1">Pass</h1>
            <span className="text-lsecondary group-hover:text-lprimary group-active:text-lprimary italic transition-all duration-200">
              OP
            </span>
          </Link>
          <p
            className="text-[8px]
            px-1
            lg:text-xs
            hidden lg:flex
            not-italic"
          >
            Seamless Passwords Manager
          </p>
        </div>
        <div
          className="navigation
          flex justify-between items-center"
        >
          <ul
            className="hidden 
            text-[10px] text-dprimary
            md:flex md:justify-between md:items-center
            lg:text-xs
            xl:text-md
            "
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex group justify-center items-center grow bg-dprimary px-4 py-2 rounded-full text-lprimary border border-transparent dark:border-lprimary/10 shadow-[5px_5px_rgba(0,98,90,0.2),10px_10px_rgba(0,98,90,0.1),15px_15px_rgba(0,98,90,0.05)] transition-all duration-300"
                  : "flex group justify-center items-center grow px-4 py-2 text-lsecondary"
              }
            >
              {darkMode ? (
                <lord-icon
                  src="/assets/darkhome.json"
                  trigger="click"
                  colors="primary:#8BBB92,secondary:#8BBB92"
                  className="size-4 xl:size-6 group-active:scale-110 transition-all duration-150 ease-out"
                />
              ) : (
                <lord-icon
                  src="/assets/darkhome.json"
                  trigger="click"
                  colors="primary:#8BBB92,secondary:#8BBB92"
                  className="size-4 xl:size-6 group-active:scale-110 transition-all duration-150 ease-out"
                />
              )}
              <p className="hidden ml-2 min-[375px]:flex transition-all duration-150 ease-out dark:text-lprimary">
                Home
              </p>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "flex group justify-center items-center grow bg-dprimary px-4 py-2 rounded-full text-lprimary border border-transparent dark:border-lprimary/10 shadow-[5px_5px_rgba(0,98,90,0.2),10px_10px_rgba(0,98,90,0.1),15px_15px_rgba(0,98,90,0.05)] transition-all duration-300"
                  : "flex group justify-center items-center grow px-4 py-2 text-lsecondary"
              }
            >
              {darkMode ? (
                <lord-icon
                  src="/assets/about.json"
                  trigger="click"
                  colors="primary:#8BBB92,secondary:#8BBB92"
                  className="size-4 xl:size-6 group-active:scale-110 transition-all duration-150 ease-out"
                />
              ) : (
                <lord-icon
                  src="/assets/darkabout.json"
                  trigger="click"
                  colors="primary:#8BBB92,secondary:#8BBB92"
                  className="size-4 xl:size-6 group-active:scale-110 transition-all duration-150 ease-out"
                />
              )}
              <p
                className="hidden ml-2 min-[375px]:flex transition-all duration-150 ease-out
              dark:text-lprimary"
              >
                About
              </p>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "flex group justify-center items-center grow bg-dprimary px-4 py-2 rounded-full text-lprimary border border-transparent dark:border-lprimary/10 shadow-[5px_5px_rgba(0,98,90,0.2),10px_10px_rgba(0,98,90,0.1),15px_15px_rgba(0,98,90,0.05)] transition-all duration-300"
                  : "flex group justify-center items-center grow px-4 py-2 text-lsecondary"
              }
            >
              {darkMode ? (
                <lord-icon
                  src="/assets/contact.json"
                  trigger="click"
                  colors="primary:#8BBB92,secondary:#8BBB92"
                  className="size-4 xl:size-6 group-active:scale-110 transition-all duration-150 ease-out"
                />
              ) : (
                <lord-icon
                  src="/assets/darkcontact.json"
                  trigger="click"
                  colors="primary:#8BBB92,secondary:#8BBB92"
                  className="size-4 xl:size-6 group-active:scale-110 transition-all duration-150 ease-out"
                />
              )}
              <p
                className="hidden ml-2 min-[375px]:flex transition-all duration-150 ease-out
              dark:text-lprimary"
              >
                Contact
              </p>
            </NavLink>
            <NavLink
              to="/codeview"
              className={({ isActive }) =>
                isActive
                  ? "flex group justify-center items-center grow bg-dprimary px-4 py-2 rounded-full text-lprimary border border-transparent dark:border-lprimary/10 shadow-[5px_5px_rgba(0,98,90,0.2),10px_10px_rgba(0,98,90,0.1),15px_15px_rgba(0,98,90,0.05)] transition-all duration-300"
                  : "flex group justify-center items-center grow px-4 py-2 text-lsecondary"
              }
            >
              {darkMode ? (
                <lord-icon
                  src="/assets/codeview.json"
                  trigger="click"
                  colors="primary:#8BBB92,secondary:#8BBB92"
                  className="size-4 xl:size-6 group-hover:invert-20 group-active:scale-110 transition-all duration-150 ease-out"
                />
              ) : (
                <lord-icon
                  src="/assets/darkcodeview.json"
                  trigger="click"
                  colors="primary:#8BBB92,secondary:#8BBB92"
                  className="size-4 xl:size-6 group-active:scale-110 transition-all duration-150 ease-out"
                />
              )}
              <p
                className="hidden ml-2 min-[375px]:flex transition-all duration-150 ease-out
              dark:text-lprimary"
              >
                Code View
              </p>
            </NavLink>
          </ul>
          <div
            className="switch
            mr-10 ml-6
            "
          >
            <Switch
              condition={darkMode}
              setCondition={setDarkMode}
              height="h-6 lg:h-6"
              width="w-11.5 lg:w-11"
              knob="bg-white size-5 lg:size-4.5"
              stickerInactive={
                <MdOutlineDarkMode className="size-4 lg:size-3 text-lsecondary" />
              }
              stickerActive={
                <MdOutlineLightMode className="size-4 lg:size-3 text-dprimary" />
              }
              activebg="bg-lsecondary"
              inactivebg="bg-dsecondary"
            />
          </div>
        </div>
      </div>
      <div
        className={`container
        md:hidden
        fixed inset-x-0 bottom-0 z-10
        w-dvw
        mx-auto border-t border-lprimary
        bg-lprimary/50 backdrop-blur-xl shadow-2xl
        dark:bg-dprimary/50 dark:border-lprimary/30`}
      >
        <ul
          className="flex justify-around items-center
          text-[8px] min-[545px]:text-xs text-dprimary
          px-3"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex items-center justify-center grow py-2 bg-white/70 dark:bg-dsecondary rounded-full w-[20%]"
                : "flex items-center justify-center grow py-2 w-[20%]"
            }
          >
            {darkMode ? (
              <lord-icon
                src="/assets/home.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            ) : (
              <lord-icon
                src="/assets/darkhome.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            )}
            <h1 className="hidden ml-2 min-[375px]:flex dark:text-lprimary">
              Home
            </h1>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "flex items-center justify-center grow py-2 bg-white/70 dark:bg-dsecondary rounded-full w-[20%]"
                : "flex items-center justify-center grow py-2 w-[20%]"
            }
          >
            {darkMode ? (
              <lord-icon
                src="/assets/about.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            ) : (
              <lord-icon
                src="/assets/darkabout.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            )}
            <h1 className="hidden ml-2 min-[375px]:flex dark:text-lprimary">
              About
            </h1>
          </NavLink>
          <Link
            to="/"
            className={`formButton
            flex items-center justify-center
            py-2 w-[20%]
            `}
          >
            <button
              onClick={() => {
                setFormButtonDisabled(!formButtonDisabled);
                setTimeout(() => {
                  setIsFormOpen(!isFormOpen);
                  setFormButtonDisabled(false);
                }, 1400);
              }}
              disabled={formButtonDisabled}
              className="disabled:invert-25"
            >
              {isFormOpen ? (
                <lord-icon
                  src="/assets/closeAddPassword.json"
                  trigger="click"
                  className="size-8 min-[425px]:size-10 text-dprimary active:scale-110 transition-all duration-150 ease-out
                bg-dprimary rounded-full"
                ></lord-icon>
              ) : (
                <lord-icon
                  src="/assets/addPassword.json"
                  trigger="click"
                  className="size-8 min-[425px]:size-10 text-dprimary active:scale-110 transition-all duration-150 ease-out
                bg-dprimary rounded-full"
                ></lord-icon>
              )}
            </button>
          </Link>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "flex items-center justify-center grow py-2 bg-white/70 dark:bg-dsecondary rounded-full w-[20%]"
                : "flex items-center justify-center grow py-2 w-[20%]"
            }
          >
            {darkMode ? (
              <lord-icon
                src="/assets/contact.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            ) : (
              <lord-icon
                src="/assets/darkcontact.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            )}
            <h1 className="hidden ml-2 min-[375px]:flex dark:text-lprimary">
              Contact
            </h1>
          </NavLink>
          <NavLink
            to="/codeview"
            className={({ isActive }) =>
              isActive
                ? "flex items-center justify-center grow py-2 bg-white/70 dark:bg-dsecondary rounded-full w-[20%]"
                : "flex items-center justify-center grow py-2 w-[20%]"
            }
          >
            {darkMode ? (
              <lord-icon
                src="/assets/codeview.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            ) : (
              <lord-icon
                src="/assets/darkcodeview.json"
                trigger="click"
                className="size-4 min-[375px]:size-3 min-[545px]:size-4 text-dprimary active:scale-110 transition-all duration-150 ease-out"
              />
            )}
            <h1 className="hidden ml-2 min-[375px]:flex dark:text-lprimary">
              Code View
            </h1>
          </NavLink>
        </ul>
      </div>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/codeview" element={<CodeView />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navbar;
