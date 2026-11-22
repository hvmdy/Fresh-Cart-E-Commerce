import StaticAuth from "@/components/common/staticAuth";

export default function LayoutAuth({ children }: LayoutProps<"/">) {
  return (
    <>
      <div className="py-10">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <StaticAuth />
            </div>
            <div className="col-span-6 bg-white rounded-2xl shadow-lg px-6 py-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
