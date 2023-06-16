import "./Footer.css";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__author">Developed by Ozan Sevkin</p>
      <p className="footer__year">&copy;{currentYear}</p>
    </footer>
  );
}

export default Footer;
