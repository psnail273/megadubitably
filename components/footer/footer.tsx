export default function Footer() {
  return (
    <footer className="text-[#6D6D6D] font-open-sans-light text-sm py-2 px-1 sm:px-2 md:px-3 lg:px-4">
      <div className="flex flex-row sm:flex-row justify-center items-center gap-1">
        <p>
          &copy; {new Date().getFullYear()} Margaret Hardy
        </p>
        <p>|</p>
        <p >
          Website by StuffWorks
        </p>
      </div>
    </footer>
  );
}