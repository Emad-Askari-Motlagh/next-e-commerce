import React, { useEffect } from "react";
import { parseCookies, setCookie } from "nookies";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/actions/filtersActions";
import { useRouter } from "next/router";

export default function useFilter() {
  const filters = useSelector((state) => state.filtersState);
  const { location, category } = filters;
  const dispatch = useDispatch();
  const Router = useRouter();
  const { slug } = Router.query;

  function saveCookie(key, value) {
    setCookie(null, key, value, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  }
  function solveCookie(value) {
    saveCookie("location", value.location);
    saveCookie("category", value.category);
  }
  const cookies = parseCookies();

  useEffect(() => {
    dispatch(
      setFilter({
        location: (slug && slug[0]) ?? cookies?.location,
        category: (slug && slug[1]) ?? cookies?.category,
      })
    );
  }, []);
  return {
    setCookie: (value) => solveCookie(value),
    category: category ?? cookies?.category,
    location: location ?? cookies?.location,
    filters,
  };
}
