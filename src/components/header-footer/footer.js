import "./Style.css"
export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Job Portal. All rights reserved.</p>
    </footer>
  );
}
