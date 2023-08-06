"use client";

import clsx from "clsx";
import React, { DetailedHTMLProps, useState } from "react";

export default function LoadingButton(
  props: DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) {
  const { className, children, onClick, ...other } = props;
  const [loading, setLoading] = useState(false);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      setLoading(true);
      onClick && (await onClick(e));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <button
      {...other}
      className={clsx(className, loading && "btn-disabled")}
      onClick={handleClick}
    >
      {loading ? <span className="loading loading-spinner" /> : children}
    </button>
  );
}
