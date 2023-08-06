import { MintToken, Navbar } from "@/components";

export default function Index() {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex-col-1 flex h-3/6 items-center justify-center">
        <div className="relative flex flex-col content-center items-center">
          <MintToken />
        </div>
      </div>
    </div>
  );
}
