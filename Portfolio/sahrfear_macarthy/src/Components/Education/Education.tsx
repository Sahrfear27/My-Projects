import React from "react";
import "./Education.css";
type Props = {
  id?: string;
};
export default function Education(props: Props) {
  const { id } = props;
  return (
    <section id={id} className="vh-100 education">
      <div>Education</div>
    </section>
  );
}
