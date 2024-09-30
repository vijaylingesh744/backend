import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Modern</Link>
          </li>
          <li>
            <Link to="/eCommerce">eCommerce</Link>
          </li>
          <li>
            <Link to="/Nft">NFT</Link>
          </li>
          <li>
            <Link to="/Crypto">Crypto</Link>
          </li>
          <li>
            <Link to="/General">General</Link>
          </li>
          <li>
            <Link to="/Music">Music</Link>
          </li>
          <li>
            <Link to="/Calender">Calender</Link>
          </li>
          <li>
            <Link to="/Kanban">Kanban</Link>
          </li>
          <li>
            <Link to="/app-email">Email</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;