import { FaGithub } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
function Footer() {
  return (
    <div className="text-xl flex gap-3  text-gray-700 dark:text-gray-300 justify-center  items-center mt-10 md:justify-start md:ml-32  ">
      <h1>Created By Imad Uddin</h1>
      <a href="https://www.instagram.com/imaduddin_101/" target="blank">
        <CiInstagram />
      </a>
      <a href="https://github.com/imad-101" target="blank">
        <FaGithub />
      </a>
    </div>
  );
}

export default Footer;
