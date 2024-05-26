import './Footer.css';

export async function Footer() {
  return (
    <footer className=''>
      <div className='footer-title'></div>
      <div className='footer-curve-line'></div>
      <ul className='footer-text'>
        <li><a href='javascript:void(0);'>關於我們</a></li>|
        <li><a href='javascript:void(0);'>會員條款</a></li>|
        <li><a href='javascript:void(0);'>隱私權政策</a></li>
      </ul>
      <div className='footer-copyright'>
        &copy;2024 Journey Bites
      </div>
    </footer>
  );
}
