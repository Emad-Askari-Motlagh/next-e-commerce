import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useAuth from "./useAuth";

const useAddresses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const { addressess } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    function fetchFromFirestore() {}
    fetchFromFirestore();
  }, [user]);

  return {
    data: addressess,
    loading,
    error,
  };
};

const useAddress = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFromFirestore();
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export { useAddresses, useAddress };
