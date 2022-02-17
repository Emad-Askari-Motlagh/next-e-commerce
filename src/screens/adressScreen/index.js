import React, { useState, useEffect } from "react";
import AddressCard from "@/components/Address-Card";
import AddAddress from "./add-address";
import styles from "./address.module.scss";
import Layout from "src/components/Primary-layout";
import { useDispatch, useSelector } from "react-redux";

import useAuth from "src/hooks/useAuth";

export default function Addresses({ mydata }) {
  const [toggleModal, setModal] = useState(false);
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.userState.addressess);
  const { user } = useAuth();

  useEffect(() => {}, [user]);

  return (
    <Layout noCategories>
      <main className={styles.container}>
        <h1 className={styles.title}>My Addresses</h1>
        <div className={styles.content}>
          {loading ? (
            <span>Loading...</span>
          ) : data ? (
            <>
              <AddressCard data={{ id: user.uid, ...data }} key={1} />
            </>
          ) : (
            <div className={styles.addresses}>
              <button
                className={styles.addAddress}
                onClick={() => setModal(true)}
              >
                <p>+</p>Add New Address
              </button>
              {user && data && (
                <AddressCard data={{ id: user.uid, ...data }} key={1} />
              )}
            </div>
          )}
        </div>
        {toggleModal && <AddAddress closeEvent={() => setModal(false)} />}
      </main>
    </Layout>
  );
}
