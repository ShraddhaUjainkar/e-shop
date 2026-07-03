const Loading = () => {
  return (
    <main
      className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 flex justify-center items-center"
      style={{ minHeight: '50vh' }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid #d9d5ca',
            borderTopColor: '#2f4538',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        <span className="font-utility-label text-utility-label uppercase tracking-widest text-secondary">
          Loading Products
        </span>
      </div>
    </main>
  );
};

export default Loading;
