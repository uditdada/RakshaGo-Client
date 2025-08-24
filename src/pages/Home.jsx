import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, BellRing } from "lucide-react";
import logo from "../logo.png";

const FeatureCard = ({ to, icon: Icon, title, desc, accent }) => (
  <Link to={to}>
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-white rounded-2xl shadow-sm border p-5 h-full cursor-pointer"
    >
      <div className={`w-12 h-12 rounded-xl grid place-items-center ${accent} mb-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 mt-1 text-sm">{desc}</p>
      <span className="inline-block mt-3 text-pink-600 font-medium text-sm">Explore →</span>
    </motion.div>
  </Link>
);

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero */}
      <section className="grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <span className="inline-block text-xs font-semibold tracking-wider text-pink-700 bg-pink-100 px-2.5 py-1 rounded-full">
            Safer rides for small towns
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Travel with <span className="text-pink-600">confidence</span>.{" "}
            <span className="text-blue-600">RakshaGo</span> has your back.
          </h1>
          <p className="text-gray-600">
            Live guardian alerts, verified drivers and a one-tap SOS — crafted for
            small cities and pilgrimage routes like Maihar Maa Sharda Mandir.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/book"
              className="px-5 py-3 rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition"
            >
              Book a Ride
            </Link>
            <Link
              to="/guardian-alerts"
              className="px-5 py-3 rounded-xl bg-white border font-semibold hover:bg-pink-50 transition"
            >
              See Safety Features
            </Link>
          </div>

          <div className="flex items-center gap-6 pt-3 text-sm text-gray-600">
            <div>✅ Driver KYC</div>
            <div>🔔 Auto Guardian Ping</div>
            <div>🆘 SOS within 2 taps</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-pink-300/20 to-blue-300/20 blur-2xl rounded-3xl" />
          <div className="relative bg-white/80 backdrop-blur rounded-3xl shadow p-6 border">
            <img src={logo} alt="RakshaGo" className="w-32 h-32 mx-auto rounded-2xl" />
            <div className="mt-4 text-center">
              <div className="text-xl font-bold">
                <span className="text-pink-600">Raksha</span>
                <span className="text-blue-600">Go</span>
              </div>
              <p className="text-gray-600 text-sm">Safety-first mobility</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 mt-10">
        <FeatureCard
          to="/guardian-alerts"
          icon={BellRing}
          title="Guardian Alerts"
          desc="Auto-share ride and live location with 3 trusted contacts."
          accent="bg-pink-500"
        />
        <FeatureCard
          to="/verified-drivers"
          icon={CheckCircle2}
          title="Verified Drivers"
          desc="Strict KYC, licence checks and community rating transparency."
          accent="bg-blue-500"
        />
        <FeatureCard
          to="/panic-actions"
          icon={Shield}
          title="Panic Actions"
          desc="One-tap SOS, loud alarm & local police contact shortcuts."
          accent="bg-rose-500"
        />
      </section>
    </div>
  );
}
