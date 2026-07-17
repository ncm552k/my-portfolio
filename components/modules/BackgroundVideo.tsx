export default function BackgroundVideo() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <video autoPlay loop muted playsInline preload="auto" className="h-full w-full object-cover">
        <source src="/video/background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[rgba(8,8,10,0.86)]" />
    </div>
  );
}
