import React from "react";
import "./Service.css";
type Props = {
  id?: string;
};
export default function Service(props: Props) {
  const { id } = props;
  return (
    <section id={id} className="vh-100 service">
      <div>Service</div>
      <p>The vh-100</p>
    </section>
  );
}
