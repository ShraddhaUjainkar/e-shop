import type { ErrorProps } from '../types';

const Error = ({ state }: ErrorProps) => {
  return (
    <main
      className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 flex justify-center items-center"
      style={{ minHeight: '50vh' }}
    >
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <span className="material-symbols-outlined text-[48px] text-error">
          error
        </span>
        <h2 className="font-display-xl text-display-xl mb-2 text-error">
          Failed to load products
        </h2>
        <p className="font-body-md text-on-surface-variant mb-6">
          {state.message ||
            'An unexpected error occurred while fetching the catalog.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 font-utility-label text-utility-label uppercase px-6 py-3 border border-line hover:bg-surface-container transition-colors"
        >
          Retry Connection
        </button>
      </div>
    </main>
  );
};

export default Error;
