import React from "react";
type Props = {
  id: string;
};
export default function Footer(props: Props) {
  const { id } = props;
  return (
    <section id={id}>
      <div className="container-fluid text-white bg-dark p-3">Footer</div>
      {/* <div>Footer</div> */}
    </section>
  );
}
