import React from "react";
import "./Testimonies.css";
type Props = {
  id: string;
};
export default function Testimonies(props: Props) {
  const { id } = props;
  return (
    <section id={id} className="vh-100 testimony">
      <div>Testimonies</div>
    </section>
  );
}
