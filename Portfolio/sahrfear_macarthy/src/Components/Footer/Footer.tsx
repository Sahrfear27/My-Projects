import React from "react";
import "./Footer.css";
type Props = {
  id: string;
};
export default function Footer(props: Props) {
  const { id } = props;
  return (
    <footer id={id}>
      <div className="container-fluid text-white  p-3 footer">
        <div className="social-links d-flex justify-content-center">
          <a href="">
            <i className="bi bi-twitter-x">Twitter</i>
          </a>
          <a href="">
            <i className="bi bi-facebook">Facebook</i>
          </a>
          <a href="">
            <i className="bi bi-instagram">Instagram</i>
          </a>
          <a href="">
            <i className="bi bi-linkedin">linkedin</i>
          </a>
        </div>
      </div>
    </footer>
  );
}
