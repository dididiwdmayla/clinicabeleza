"use client";

import { useEffect } from "react";
import { iniciarRevelacao } from "@/lib/reveal";

export function Revelacao() {
  useEffect(() => iniciarRevelacao(), []);
  return null;
}
