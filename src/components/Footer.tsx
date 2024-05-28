import './Footer.css';

export function Footer() {
  return (
    <footer className='mt-12 py-10 gap-5 bg-grey flex flex-col justify-center items-center'>
      <div className='footer-title text-4xl'>Jouney Bites</div>
      <div className='footer-curve-line text-2xl'>~~~~~~</div>
      <ul className='footer-text flex flex-row gap-4 text-2xl'>
        <li className='font-extrabold'><a href='javascript:void(0);'>關於我們</a></li>|
        <li className='font-extrabold'><a href='javascript:void(0);'>會員條款</a></li>|
        <li className='font-extrabold'><a href='javascript:void(0);'>隱私權政策</a></li>
      </ul>
      <div className='footer-copyright text-base'>
        &copy;2024 Journey Bites
      </div>
    </footer>
  );
}
