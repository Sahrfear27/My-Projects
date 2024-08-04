import React from "react";
import "./Project.css";
type Props = {
  id?: string;
};
export default function Projects(props: Props) {
  const { id } = props;
  return (
    <section id={id} className="vh-100 project">
      <div>Projects</div>
    </section>
  );
}
