export default function Footer() {
  return (
    <footer className="footer">
      <small className="copyright">
        <p className="copyright__text">
          © Copyright by{" "}
          <a
            href="https://bytegrad.com"
            className="copyright__link"
            target="_blank"
          >
            ByteGrad.com
          </a>{" "}
          <i className="fa-solid fa-square-up-right copyright__icon"></i>{" "}
          Intended for learning or your portfolio.
        </p>
        <p className="copyright__text">
          <span className="u-bold u-italic">Not allowed</span> to use as your
          own teaching material.
        </p>
      </small>

      <p className="jobs-available">
        <span className="u-bold">109573</span> total jobs available
      </p>
    </footer>
  );
}
