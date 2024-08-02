import { NavLink } from "react-router-dom";
import "./LinkWithIcon.css";

const LinkWithIcon = ({ title, link, emoji }) => {
  return (
    <NavLink to={link} className="align_center">
      {title} <img src={emoji} alt="" className="link_emoji" />
    </NavLink>
  );
};

export default LinkWithIcon;
