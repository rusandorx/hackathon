import { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <header className="sticky w-full text-secondary text-lg h-24 bg-white shadow">
      <div className="h-full flex items-center justify-between container">
        {/* TODO Дописать Header */}
        <Link to={"/"}>Logo</Link>
        <div>ogoL</div>
      </div>
    </header>
  );
};
export default Header;
