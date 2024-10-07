import Link from "next/link";
import ProfileNav from "../Profile-Nav/ProfileNav";
function Navbar() {
  return (
    <div
      className="navbar bg-base-100 px-6 bg-[#fbfbfb]"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <div className="flex-1">
        <div className="flex items-center justify-center gap-[7px] text-3xl font-sans">
          <span className="text-[#c73939] font-extrabold">Meme</span>
          <span className="text-[#4b4b4b] font-extrabold">Generator</span>
        </div>
      </div>
      <div>
        <ProfileNav />
      </div>
    </div>
  );
}

export default Navbar;
