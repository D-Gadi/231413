import './Brands.css';

function Brands() {
  const brands = ['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein'];
  return (
    <div className="polosa-brendov" id="brands" data-scroll>
      <div className="vnutri-brendov">
        <div className="begushchie-brendi">
          {[...brands, ...brands].map((b, i) => (
            <span key={i}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Brands;