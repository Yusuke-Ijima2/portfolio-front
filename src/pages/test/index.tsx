import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <>
      <div>index</div>
      <Link href="/">
        <a>← Back to home</a>
      </Link>
    </>
  );
};

export default index;
