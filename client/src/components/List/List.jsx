import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

const List = ({ subCats, maxPrice, sort, catId }) => {
  
  if(subCats === "") subCats= ["puma", "Nike", "ADIDAS Originals", "Reebok", "Skechers"];
  if(maxPrice === null) maxPrice=20000;
  if(sort===null) sort="asc";
  if(catId===null) catId=[1, 2];
  
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  );
  
  // `/products?populate=*&[filters][type][$eq]=${type}`

  console.log(subCats, maxPrice, sort, catId);

  return (
    <div className="list">
      {loading
        ? "loading"
        : data?.map((item) => <Card item={item} key={item.id} />)}
    </div>
  );
};

export default List;
