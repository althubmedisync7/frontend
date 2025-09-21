import medLogo from "../../assets/public/auth-logo.png";
import logoWrite from "../../assets/public/logo-writeup.png";
import { useNavigate, Outlet } from "react-router-dom";

export default function Patient() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header/Nav */}
      <header
        className="flex gap-4 px-10 pt-5 items-center justify-between border-b pb-5 w-full"
        style={{ borderColor: "#D8D8D8" }}
      >
        <div className="flex gap-2">
          <img src={medLogo} alt="MediSync Logo" className="w-10 h-10" />
          <img src={logoWrite} alt="MediSync Logo" className="w-30 h-10" />
        </div>

        <div className="flex gap-2">
          <p>Not a patient?</p>
          <button
            className="text-[#1E318A] cursor-pointer"
            onClick={() => navigate("/auth")}
          >
            Change your selection
          </button>
        </div>
      </header>

      {/* Child pages will render here */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
