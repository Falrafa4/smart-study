export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button', 
  className = '', 
  ...props 
}) {
  const baseStyle = 'transition-all duration-200 font-semibold flex items-center justify-center gap-2 active:scale-[0.99]';
  
  const variants = {
    // Tombol utama menggunakan Cobalt Blue Flat (Tertiary)
    primary: 'bg-cobalt-tertiary text-white py-3 px-5 rounded-cobalt-md hover:bg-blue-700',
    // Tombol warna gelap solid (Primary)
    dark: 'bg-cobalt-primary text-white py-3 px-5 rounded-cobalt-md hover:bg-gray-800',
    // Tombol abu-abu netral
    neutral: 'bg-cobalt-neutral text-cobalt-secondary border border-gray-200 py-3 px-5 rounded-cobalt-md hover:bg-gray-100 hover:text-cobalt-primary',
    // Tombol link minimalis
    link: 'text-cobalt-secondary hover:text-cobalt-primary font-medium transition-colors',
    // Tombol berukuran kecil untuk form ringkas
    small: 'bg-cobalt-tertiary text-white py-2 px-4 rounded-cobalt-sm text-[0.95rem] hover:bg-blue-700'
  };

  const selectedVariant = variants[variant] || '';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${selectedVariant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
