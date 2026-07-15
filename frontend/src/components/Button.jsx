

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button', 
  className = '', 
  ...props 
}) {
  const baseStyle = 'transition-all duration-300 font-bold active:scale-[0.99] flex items-center justify-center gap-2';
  
  const variants = {
    // Tombol utama dengan efek gradasi mewah
    primary: 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700 text-white py-4 px-6 rounded-2xl shadow-xl shadow-blue-500/30',
    // Tombol warna gelap solid
    dark: 'bg-gray-950 text-white shadow-xl shadow-gray-950/20 rounded-xl hover:bg-gray-900',
    // Tombol netral / abu-abu terang
    neutral: 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-700 rounded-xl',
    // Tombol link minimalis
    link: 'text-gray-400 hover:text-gray-900 font-medium transition-colors',
    // Tombol kecil untuk form jadwal
    small: 'bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-[0.95rem] font-medium'
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
