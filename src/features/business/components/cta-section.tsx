export function CtaSection() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-10">
      <div className="relative overflow-hidden rounded-[24px] bg-primary p-12 text-white">
        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-secondary-fixed/10" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
            Ready for your transformation?
          </h2>
          <p className="mb-8 max-w-lg text-primary-fixed">
            Join the ranks of Madrid&apos;s most well-groomed gentlemen. Secure
            your preferred slot today.
          </p>
          <a
            href="/booking/professional"
            className="inline-flex rounded-full bg-secondary-fixed px-12 py-5 text-lg font-bold text-on-secondary-fixed shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            Book Appointment Now
          </a>
        </div>
      </div>
    </section>
  );
}
