import { getProducts } from '../services/api';
import { useApiResource } from '../hooks/useResource';
import ProductCard from '../components/ProductCard';
import Error from '../components/Error';
import Loading from '../components/Loading';

const ProductListing = () => {
  const state = useApiResource(() => getProducts());
  if (state.status === 'loading' || state.status === 'idle') {
    return <Loading />;
  }

  if (state.status === 'error') {
    return <Error state={state} />;
  }

  const products = state.data;
  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20">
      <section className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <span className="font-utility-label text-utility-label uppercase tracking-widest text-secondary block mb-4">
            Volume IV: Functional Artifacts
          </span>
          <h1 className="font-display-xl text-display-xl mb-6 leading-tight">
            Objects for the <br />
            Thoughtful Creator.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            A curated selection of archival-quality essentials designed to age
            with grace and serve with purpose. Each piece is sourced for its
            material integrity and timeless utility.
          </p>
        </div>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default ProductListing;
