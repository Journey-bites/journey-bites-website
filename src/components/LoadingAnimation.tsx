export default function LoadingAnimation() {
  return (
    <div className='mt-3 flex items-center justify-center'>
      <video width='300' height='300' muted loop autoPlay playsInline>
        <source src='https://firebasestorage.googleapis.com/v0/b/journey-bites-frontend.appspot.com/o/loading-animation.webm?alt=media&token=819dceef-2b82-499a-92db-48bffac68e37' type='video/webm' />
      </video>
    </div>
  );
}