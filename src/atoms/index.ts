import { atom } from "jotai";

// initial value of the atoms
export const priceAtom = atom(10);
export const messageAtom = atom("hello");
export const productAtom = atom({ id: 12, name: "good stuff" });
