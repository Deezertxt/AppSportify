import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Example = () => {
  return (
    <div className="flex h-[500px] justify-center bg-neutral-900 px-3 py-12">
      <FlyoutLink
        FlyoutContent={() => (
          <PricingContent
            individuals={[
              { label: "Introduction", href: "#" },
              { label: "Pay as you go", href: "#" },
            ]}
            companies={[
              { label: "Startups", href: "#" },
              { label: "SMBs", href: "#" },
              { label: "Enterprise", href: "#" },
            ]}
          />
        )}
      >
        <span className="text-white">Hover over me</span>
      </FlyoutLink>
    </div>
  );
};

const FlyoutLink = ({ children, FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-fit h-fit"
    >
      <div className="relative cursor-pointer">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </div>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingContent = ({ individuals, companies }) => {
  return (
    <div className="w-64 bg-white p-6 shadow-xl">
      {individuals && (
        <div className="mb-3 space-y-3">
          <h3 className="font-semibold">For Individuals</h3>
          {individuals.map((item, index) => (
            <a key={index} href={item.href} className="block text-sm hover:underline">
              {item.label}
            </a>
          ))}
        </div>
      )}
      {companies && (
        <div className="mb-6 space-y-3">
          <h3 className="font-semibold">For Companies</h3>
          {companies.map((item, index) => (
            <a key={index} href={item.href} className="block text-sm hover:underline">
              {item.label}
            </a>
          ))}
        </div>
      )}
      <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
        Contact sales
      </button>
    </div>
  );
};

export default Example;
