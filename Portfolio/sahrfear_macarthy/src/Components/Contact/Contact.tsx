import React from "react";
import "./Contact.css";
type Props = {
  id: string;
};
export default function Contact(props: Props) {
  const { id } = props;
  return (
    <section id={id} className="vh-100 contact">
      <div>Contact</div>
    </section>
  );
}
