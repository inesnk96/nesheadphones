import React from "react";
import { Product, FooterBanner, HeroBanner, Layout } from "../components";
import { client } from "../lib/client";

const index = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2 className="">Beset Selling Products</h2>
        <p>Soeakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

//how to fetch Sanity Data API
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default index;
