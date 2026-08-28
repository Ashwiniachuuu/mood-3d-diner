import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Navbar } from "@/components/mood/Navbar";
import { TiltCard } from "@/components/mood/TiltCard";
import heroBurger from "@/assets/hero-burger.png";
import combo from "@/assets/combo.png";
import kitchen from "@/assets/kitchen.jpg";
import menuCheese from "@/assets/menu-cheese.png";
import menuSpicy from "@/assets/menu-spicy.png";
import menuDouble from "@/assets/menu-double.png";
import menuChicken from "@/assets/menu-chicken.png";
import menuFries from "@/assets/menu-fries.png";
import menuDrinks from "@/assets/menu-drinks.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MOOD — Good Food. Good Mood!" },
      {
        name: "description",
        content:
          "MOOD serves flame-grilled burgers, crispy chicken and loaded fries. Fresh flavors, bold cravings, delivered your way.",
      },
      { property: "og:title", content: "MOOD — Good Food. Good Mood!" },
      {
        property: "og:description",
        content: "Flame-grilled burgers, crispy chicken and loaded fries. Bold cravings, delivered your way.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const menu = [
  {
    img: menuCheese,
    name: "Cheese Burger",
    desc: "Aged cheddar, smashed patty, house sauce.",
    rating: 4.8,
    price: "$8.90",
  },
  {
    img: menuSpicy,
    name: "Spicy Chicken Burger",
    desc: "Buttermilk chicken with chili glaze.",
    rating: 4.9,
    price: "$9.50",
  },
  {
    img: menuDouble,
    name: "Double Beef Burger",
    desc: "Two flame-grilled patties, double cheese.",
    rating: 4.7,
    price: "$12.40",
  },
  {
    img: menuChicken,
    name: "Crispy Chicken",
    desc: "Golden crunch, 12-hour brined tenders.",
    rating: 4.6,
    price: "$7.20",
  },
  {
    img: menuFries,
    name: "Loaded Fries",
    desc: "Molten cheese, beef chili, spring onion.",
    rating: 4.8,
    price: "$5.80",
  },
  {
    img: menuDrinks,
    name: "Drinks",
    desc: "Iced sodas, cold brew and fresh coolers.",
    rating: 4.5,
    price: "$2.90",
  },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useSpring(useTransform(scrollY, [0, 800], [0, 200]), { stiffness: 80, damping: 20 });
  const scale = useSpring(useTransform(scrollY, [0, 800], [1, 0.78]), { stiffness: 80, damping: 20 });
  const rot = useSpring(useTransform(scrollY, [0, 800], [0, 12]), { stiffness: 80, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPointer({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full opacity-40 blur-[130px]"
        style={{ background: "var(--gradient-ember)" }}
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-6 inline-block rounded-full px-4 py-1.5 text-xs tracking-[0.25em] text-muted-foreground uppercase"
          >
            Flame grilled daily
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl leading-[0.95] font-extrabold sm:text-6xl lg:text-7xl"
          >
            Good Food.
            <br />
            Good <span className="text-ember">Mood!</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-md text-lg text-muted-foreground"
          >
            Fresh flavors. Bold cravings. Delivered your way.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#offers"
              className="ember-glow rounded-full bg-[image:var(--gradient-ember)] px-8 py-4 text-sm font-bold tracking-widest text-primary-foreground uppercase transition-transform hover:scale-105"
            >
              Order Now
            </a>
            <a
              href="#menu"
              className="glass rounded-full px-8 py-4 text-sm font-bold tracking-widest uppercase transition-colors hover:bg-secondary/60"
            >
              Explore Menu
            </a>
          </motion.div>
        </div>

        <motion.div style={{ y, scale, rotate: rot }} className="relative">
          <div
            aria-hidden
            className="absolute inset-x-8 bottom-6 h-16 rounded-[50%] bg-black/70 blur-2xl"
          />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              aria-hidden
              className="absolute bottom-1/3 left-1/2 h-2 w-2 rounded-full bg-primary/50 blur-[2px]"
              style={{
                marginLeft: `${(i - 2.5) * 26}px`,
                animation: `rise ${5 + i}s linear ${i * 0.9}s infinite`,
              }}
            />
          ))}
          <motion.img
            src={heroBurger}
            alt="Juicy flame-grilled chicken burger with melted cheese"
            width={1200}
            height={1200}
            animate={{ x: pointer.x, y: pointer.y }}
            transition={{ type: "spring", stiffness: 60, damping: 18 }}
            className="relative w-full drop-shadow-[0_50px_70px_rgba(0,0,0,0.8)]"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />

      {/* Menu */}
      <section id="menu" className="relative px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-primary uppercase">The Menu</p>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Crafted for cravings</h2>
          </Reveal>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {menu.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.07}>
                <TiltCard className="group glass ember-glow h-full rounded-3xl p-6">
                  <div className="relative mb-5 flex h-44 items-center justify-center">
                    <div
                      aria-hidden
                      className="absolute h-32 w-32 rounded-full bg-primary/25 blur-3xl transition-all duration-500 group-hover:bg-primary/40"
                    />
                    <img
                      src={item.img}
                      alt={item.name}
                      width={700}
                      height={700}
                      loading="lazy"
                      className="relative h-44 object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-110"
                      style={{ transform: "translateZ(40px)" }}
                    />
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <span className="text-lg font-extrabold text-ember">{item.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  <p className="mt-4 text-sm font-semibold text-primary">
                    ★ {item.rating}
                    <span className="ml-1 font-normal text-muted-foreground">/ 5.0</span>
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="relative overflow-hidden px-6 py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/4 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full opacity-30 blur-[140px]"
          style={{ background: "var(--gradient-ember)" }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="animate-float-slow">
              <img
                src={combo}
                alt="Spicy burger combo with fries and a cold drink"
                width={1200}
                height={912}
                loading="lazy"
                className="w-full drop-shadow-[0_45px_60px_rgba(0,0,0,0.85)]"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="glass ember-glow rounded-[2rem] p-9">
              <p className="text-xs tracking-[0.3em] text-primary uppercase">Limited offer</p>
              <h2 className="mt-4 text-4xl leading-tight font-extrabold sm:text-5xl">
                Spicy Burger Combo
                <span className="mt-2 block text-ember">20% OFF</span>
              </h2>
              <p className="mt-5 text-muted-foreground">
                Our chili-glazed chicken burger with a basket of loaded fries and an ice-cold drink.
                Plated hot, priced light — only this week.
              </p>
              <div className="mt-7 flex items-end gap-4">
                <span className="text-3xl font-extrabold">$12.90</span>
                <span className="pb-1 text-lg text-muted-foreground line-through">$16.10</span>
              </div>
              <a
                href="#contact"
                className="mt-8 inline-block rounded-full bg-[image:var(--gradient-ember)] px-8 py-4 text-sm font-bold tracking-widest text-primary-foreground uppercase transition-transform hover:scale-105"
              >
                Grab the deal
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative px-6 py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src={kitchen}
                alt="Chef flame-grilling burgers in the dark MOOD kitchen"
                width={1280}
                height={960}
                loading="lazy"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <p className="text-xs tracking-[0.3em] text-primary uppercase">Our story</p>
              <h2 className="mt-3 text-4xl leading-tight font-extrabold sm:text-5xl">
                Made Fresh.
                <br />
                Made With <span className="text-ember">Passion.</span>
              </h2>
              <p className="mt-6 text-muted-foreground">
                MOOD started with one obsession: a burger worth remembering. Every patty is ground
                the same morning it hits the flame, every bun is baked in-house, and every sauce is
                built from scratch in our open kitchen.
              </p>
              <p className="mt-4 text-muted-foreground">
                No shortcuts, no freezers — just fire, timing and a crew that cooks like it matters.
              </p>
              <div className="mt-9 grid grid-cols-3 gap-4">
                {[
                  ["12", "Years grilling"],
                  ["100%", "Fresh daily"],
                  ["4.8★", "Guest rating"],
                ].map(([v, l]) => (
                  <div key={l} className="glass rounded-2xl px-4 py-5 text-center">
                    <p className="text-2xl font-extrabold text-ember">{v}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-primary uppercase">Visit us</p>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Find your MOOD</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Location", "42 Ember Street\nDowntown, CA 90210"],
              ["Phone", "+1 (555) 018-2244\nDaily until close"],
              ["Email", "hello@moodburgers.com\norders@moodburgers.com"],
              ["Opening Hours", "Mon–Thu 11:00 – 23:00\nFri–Sun 11:00 – 01:00"],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="glass h-full rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1.5">
                  <h3 className="text-sm font-bold tracking-widest text-primary uppercase">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm whitespace-pre-line text-muted-foreground">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden px-6 pt-10 pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full opacity-25 blur-[150px]"
          style={{ background: "var(--gradient-ember)" }}
        />
        <Reveal>
          <div className="glass ember-glow relative mx-auto max-w-4xl rounded-[2.5rem] px-8 py-16 text-center">
            <h2 className="text-4xl font-extrabold sm:text-5xl">
              Ready for Your Next <span className="text-ember">Craving?</span>
            </h2>
            <p className="mt-4 text-muted-foreground">One bite is all it takes.</p>
            <a
              href="#menu"
              className="mt-9 inline-block rounded-full bg-[image:var(--gradient-ember)] px-10 py-4 text-sm font-bold tracking-widest text-primary-foreground uppercase transition-transform hover:scale-105"
            >
              Order Your Burger
            </a>
          </div>
        </Reveal>
        <p className="mt-16 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} MOOD. Good food, good mood.
        </p>
      </section>
    </main>
  );
}
