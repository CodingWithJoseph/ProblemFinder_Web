"use client";

import Features from "./Features";
import Product from "./Product";
import Highlights from "./Highlights";
import Trigger from "./Trigger";

export default function Clarity() {
  return (
    <div>
      <Highlights />
      <Trigger />
      <Product />
      <Features />
    </div>
  );
}