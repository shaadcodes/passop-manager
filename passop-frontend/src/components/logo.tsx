const Logo = () => {
  return (
    <h1 className="font-serif-display text-xl md:text-3xl tracking-tight text-dprimary flex items-center">
      <lord-icon
        src="/assets/logo.json"
        trigger="hover"
        className="size-8 md:size-12 mr-1"
      />
      Pass<span className="text-dsecondary italic">OP</span>
    </h1>
  );
};

export default Logo;
