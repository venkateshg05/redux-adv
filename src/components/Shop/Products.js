import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY = [
  { id: "p1", price: 6, title: "MFB", description: "MFB i authored" },
  { id: "p2", price: 12, title: "MSB", description: "MSB i authored" },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY.map((product) => (
          <ProductItem
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
