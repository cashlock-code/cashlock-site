export default function Contact() {
  return (
    <div className="card" style={{ background: "#fff" }}>
      <div className="kicker">Contact</div>
      <h1 className="h1">Let’s talk.</h1>
      <p className="p">
        Add your preferred contact method. You can keep this simple and professional.
      </p>

      <div className="hr" />

      <div className="h2">Email</div>
      <p className="p">
        <a href="mailto:you@yourdomain.com">you@yourdomain.com</a>
      </p>

      <div className="h2">Links</div>
      <ul>
        <li>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
}
