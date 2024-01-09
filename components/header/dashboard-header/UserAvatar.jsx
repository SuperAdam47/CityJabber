import { Dropdown } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

const AvatarDropdown = ({ username, avatarUrl, handleLogout }) => {
  const menuStyle = {
    backgroundColor: "#051036", // Set the background color
    borderColor: "#051036",
  };

  return (
    <Dropdown>
      <Dropdown.Toggle style={menuStyle} id="avatar-dropdown">
        <Image
          width={50}
          height={50}
          src={avatarUrl}
          alt={username}
          className="size-50 rounded-22 object-cover"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#settings">
          <Link href="/user/setting"> Account Settings</Link>
        </Dropdown.Item>
        {/* <Dropdown.Item href="#Colletions">My Collections</Dropdown.Item>
        <Dropdown.Item href="#">About Me</Dropdown.Item> */}

        <Dropdown.Divider />
        <Dropdown.Item href="#logout" onClick={handleLogout}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AvatarDropdown;
