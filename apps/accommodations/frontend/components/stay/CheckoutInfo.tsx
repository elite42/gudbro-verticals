'use client';

interface CheckoutInfoProps {
  checkoutTime: string;
  checkoutProcedure?: string;
  houseRules?: string[];
}

export default function CheckoutInfo({
  checkoutTime,
  checkoutProcedure,
  houseRules,
}: CheckoutInfoProps) {
  return (
    <section className="mb-5 px-4">
      <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg">🔑</span>
          <h3 className="font-semibold text-[#2D2016]">Checkout</h3>
        </div>

        <div className="mb-3 flex items-center gap-3 rounded-xl bg-[#FAF8F5] p-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E07A5F]/10">
            <span className="text-lg">🕐</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-[#8B7355]">Checkout Time</p>
            <p className="text-base font-semibold text-[#2D2016]">{checkoutTime}</p>
          </div>
        </div>

        {checkoutProcedure && (
          <div className="mb-3">
            <p className="mb-1 text-[10px] uppercase tracking-wide text-[#8B7355]">Procedure</p>
            <p className="text-sm text-[#2D2016]">{checkoutProcedure}</p>
          </div>
        )}

        {houseRules && houseRules.length > 0 && (
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-wide text-[#8B7355]">House Rules</p>
            <div className="space-y-1.5">
              {houseRules.map((rule, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-[#8B7355]">
                  <span className="mt-0.5 text-[#3D8B87]">&#8226;</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
