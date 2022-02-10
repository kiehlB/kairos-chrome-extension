function Home() {
  return (
    <>
      <img src='logo.png' width={200} height={200} />
      <div className='flex border-2'>
        <div className='border-2  w-side'>hello</div>
        <div className='border-2  w-main mx-16 h-16'>hello</div>
      </div>
      <div className='border-2  w-main mx-16 h-16'>hello</div>
    </>
  );
}

export default Home;
