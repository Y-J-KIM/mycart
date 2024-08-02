import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";

import "./Navbar.css";
import LinkWithIcon from "./LinkWithIcon";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ user, cartCount }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); //window.location="이동주소" 대신 더 빠름
  const handleSubmit = (e) => {
    e.preventDefault(); //submit 이벤트 중지
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`); //제품리스트 페이지에서 검색어로 검색
    }
  };

  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">myCart</h1>
        <form onSubmit={handleSubmit} className="align_center navbar_form">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="navbar_search"
            placeholder="제품 찾기..."
          />
          <button type="submit" className="search_button">
            검색하기
          </button>
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkWithIcon title="홈페이지" link="/" emoji={rocket} />
        <LinkWithIcon title="상품들" link="/products" emoji={star} />

        {!user && (
          <>
            <LinkWithIcon title="로그인" link="/login" emoji={idButton} />
            <LinkWithIcon title="가입" link="/signup" emoji={memo} />
          </>
        )}
        {user && (
          <>
            <LinkWithIcon title="내주문" link="/myorders" emoji={order} />
            <LinkWithIcon title="로그아웃" link="/logout" emoji={lock} />
            <NavLink to="/cart" className="align_center">
              장바구니 <p className="align_center cart_counts">{cartCount}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
