import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const RESEND_API = import.meta.env.DEV
  ? "/api/resend/emails"
  : "https://corsproxy.io/?url=https://api.resend.com/emails";
const RESEND_KEY = "re_D7E8sLh9_BcjzWJFfneC7gGHPRwwP7JVz";
const NOTIFICATION_EMAIL = "anatola@anatolaaraba.com";

interface PostcardScreenProps {
  civilizationName: string;
  tagline: string;
  civilizationImage: string;
  onRestart: () => void;
}

type Step = "write" | "preview" | "email" | "sent";

const POSTCARD_COUNT = "1,247";

const PostcardScreen = ({
  civilizationName,
  tagline,
  civilizationImage,
  onRestart,
}: PostcardScreenProps) => {
  const [step, setStep] = useState<Step>("write");
  const [message, setMessage] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [autoFlipDone, setAutoFlipDone] = useState(false);
  const [userHasFlipped, setUserHasFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSuggestion, setEmailSuggestion] = useState("");
  const [sending, setSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (step !== "preview") return;
    setFlipped(false);
    setAutoFlipDone(false);
    setUserHasFlipped(false);
    const t1 = setTimeout(() => setFlipped(true), 3000);
    const t2 = setTimeout(() => setFlipped(false), 5500);
    const t3 = setTimeout(() => setAutoFlipDone(true), 6800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [step]);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    const atIndex = val.indexOf("@");
    if (atIndex > 0 && !val.includes(".") && val.length > atIndex + 1) {
      setEmailSuggestion(val.slice(0, atIndex) + "@gmail.com");
    } else {
      setEmailSuggestion("");
    }
  };

  const handleSend = async () => {
    if (!email.trim() || !message.trim() || sending) return;
    setSending(true);

    const apiKey = RESEND_KEY;

    const imageTag = civilizationImage
      ? `<img src="${civilizationImage}" alt="${civilizationName}" style="width:100%;border-radius:12px;margin-bottom:0;display:block;" />`
      : "";

    const emailHtml = `
<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#060d1a;color:#f5f0e8;border-radius:20px;overflow:hidden;">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#0a1628 0%,#0d1f3c 50%,#0a1628 100%);padding:36px 40px 28px;text-align:center;border-bottom:1px solid rgba(93,202,165,0.15);">
    <p style="font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:rgba(93,202,165,0.6);margin:0 0 16px;">R3IMAGINE STORY LAB · FUTURE CIVILIZATION ARCHIVE</p>
    <p style="font-size:13px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(245,240,232,0.35);margin:0;">✦ &nbsp; TRANSMISSION RECEIVED &nbsp; ✦</p>
  </div>

  <!-- World image -->
  ${imageTag ? `<div style="padding:0;">${imageTag}</div>` : ""}

  <!-- Main content -->
  <div style="padding:40px 40px 32px;">

    <h1 style="font-size:2.4rem;font-weight:300;color:#f5f0e8;margin:0 0 6px;line-height:1.1;">Your Postcard<br/>from the Future</h1>
    <p style="font-size:1rem;color:rgba(245,240,232,0.5);margin:0 0 32px;line-height:1.6;">We have intercepted a quantum transmission across space-time. The artifact of your journey has arrived.</p>

    <!-- Postcard message -->
    <div style="background:linear-gradient(140deg,#f5f0e4,#ede7d4);border-radius:14px;padding:28px 30px;margin-bottom:32px;position:relative;">
      <p style="font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#9a8e7a;margin:0 0 14px;">✦ &nbsp; POSTCARD FROM ${civilizationName.toUpperCase()}, 2200</p>
      <p style="font-size:1.5rem;color:#2a2420;line-height:1.7;margin:0 0 20px;font-style:italic;">${message.trim()}</p>
      <div style="border-top:1px solid rgba(0,0,0,0.09);padding-top:12px;display:flex;justify-content:space-between;align-items:center;">
        <p style="font-size:0.85rem;color:#9a8e7a;margin:0;">Written from ${civilizationName}, sent to 2026</p>
        <p style="font-size:1.1rem;color:rgba(0,0,0,0.2);margin:0;">✦</p>
      </div>
    </div>

    <!-- World info -->
    <div style="border:1px solid rgba(93,202,165,0.2);border-radius:14px;padding:28px 30px;margin-bottom:32px;background:rgba(93,202,165,0.03);">
      <p style="font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(93,202,165,0.6);margin:0 0 10px;">YOUR WORLD</p>
      <h2 style="font-size:1.5rem;font-weight:300;color:#f5f0e8;margin:0 0 6px;">${civilizationName}</h2>
      <p style="font-size:1rem;color:rgba(245,240,232,0.55);font-style:italic;margin:0;">"${tagline}"</p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:32px;">
      <p style="font-size:1rem;color:rgba(245,240,232,0.6);line-height:1.75;margin:0 0 20px;">To the innovators, the dreamers, and the future-builders — the world belongs to those who dare to imagine it differently.</p>
      <a href="https://r3imagine.io" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,hsl(158,68%,37%),hsl(158,68%,27%));color:#f5f0e8;text-decoration:none;border-radius:100px;font-size:0.95rem;letter-spacing:0.08em;">Follow the Journey at r3imagine.io</a>
    </div>

    <p style="text-align:center;font-size:0.9rem;color:rgba(245,240,232,0.4);margin:0;">Follow <span style="color:#5DCAA5;">@r3.imagine</span> on Instagram</p>
  </div>

  <!-- Footer -->
  <div style="background:rgba(0,0,0,0.3);padding:20px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
    <p style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(245,240,232,0.18);margin:0;">Built with imagination by R3imagine &nbsp;×&nbsp; New York Hall of Science</p>
  </div>

</div>`;

    const payload: Record<string, unknown> = {
      from: "R3imagine Story Lab <onboarding@resend.dev>",
      to: [NOTIFICATION_EMAIL],
      subject: `[${email.trim()}] Postcard from ${civilizationName}`,
      html: emailHtml,
    };

    try {
      await fetch(RESEND_API, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (_) {}

    setSending(false);
    setStep("sent");
  };

  return (
    <AnimatePresence mode="wait">
      {step === "write" && (
        <motion.div
          key="write"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col max-w-2xl mx-auto w-full"
          style={{ minHeight: "85vh" }}
        >
          {/* Top half — prompt */}
          <div className="flex flex-col items-center justify-center flex-1 px-6 pt-8 pb-4 text-center">
            <motion.p
              className="label-accent mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.2 }}
            >
              POSTCARD FROM THE FUTURE
            </motion.p>

            <motion.h2
              className="font-display font-light text-cream leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Send a postcard<br />from your future
            </motion.h2>

            <motion.p
              className="font-body text-foreground/60 max-w-md"
              style={{ fontSize: "1.05rem", lineHeight: "1.7" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Imagine you wake up on{" "}
              <span className="text-teal-bright font-semibold">{civilizationName}</span>{" "}
              in the year 2200. Write a postcard back to someone in 2026.
              Can be a few words or a short phrase.
            </motion.p>
          </div>

          {/* Bottom half — writing area, sits above keyboard on iPad */}
          <motion.div
            className="px-5 pb-10 pt-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <div
              className="glass p-5 relative"
              style={{ minHeight: "180px" }}
            >
              <p className="label-accent mb-3" style={{ fontSize: "10px" }}>
                YOUR MESSAGE
              </p>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="The sky here has three moons..."
                inputMode="text"
                autoComplete="off"
                maxLength={280}
                rows={4}
                className="w-full bg-transparent resize-none outline-none"
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "1.65rem",
                  lineHeight: "1.55",
                  color: "hsl(36, 45%, 94%)",
                  caretColor: "#5DCAA5",
                  minHeight: "110px",
                }}
              />
              <div className="flex justify-end mt-1">
                <span
                  className="font-mono text-foreground/30"
                  style={{ fontSize: "11px" }}
                >
                  {message.length}/280
                </span>
              </div>
            </div>

            <button
              className="btn-primary w-full mt-4"
              onClick={() => message.trim() && setStep("preview")}
              style={{ opacity: message.trim() ? 1 : 0.45 }}
              disabled={!message.trim()}
            >
              Preview My Postcard →
            </button>
          </motion.div>
        </motion.div>
      )}

      {step === "preview" && (
        <motion.div
          key="preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center max-w-2xl mx-auto w-full px-5 py-8"
        >
          <motion.h2
            className="font-display font-light text-cream text-center mb-8"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your postcard from {civilizationName}
          </motion.h2>

          {/* 3-D flip card */}
          <motion.div
            style={{
              perspective: "1200px",
              width: "100%",
              maxWidth: "440px",
              height: "290px",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
            onClick={() => { setFlipped((f) => !f); setUserHasFlipped(true); setAutoFlipDone(true); }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 90 }}
          >
            <motion.div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
              }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.65, type: "spring", stiffness: 70, damping: 14 }}
            >
              {/* FRONT — world image */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
                className="portal-frame"
              >
                <img
                  src={civilizationImage}
                  alt={civilizationName}
                  className="w-full h-full object-cover"
                />
                {/* postcard stamp corner */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    width: "52px",
                    height: "36px",
                    border: "2px solid rgba(93,202,165,0.6)",
                    borderRadius: "4px",
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(6px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "18px", opacity: 0.9 }}>✦</span>
                </div>
                {/* world label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    left: "14px",
                    background: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "8px",
                    padding: "6px 14px",
                  }}
                >
                  <p
                    className="font-mono text-teal-bright tracking-widest uppercase"
                    style={{ fontSize: "11px" }}
                  >
                    {civilizationName}
                  </p>
                  <p
                    className="font-mono text-foreground/40"
                    style={{ fontSize: "9px", letterSpacing: "0.15em" }}
                  >
                    2200 · FUTURE ARCHIVE
                  </p>
                </div>
              </div>

              {/* BACK — handwritten note */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  borderRadius: "20px",
                  background: "linear-gradient(140deg, #f8f3e8 0%, #ede7d6 100%)",
                  padding: "22px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 0 0 1px rgba(29,158,117,0.3), 0 8px 40px rgba(0,0,0,0.35)",
                }}
              >
                {/* ruled lines */}
                <div
                  style={{
                    position: "absolute",
                    inset: "60px 24px 56px",
                    backgroundImage:
                      "repeating-linear-gradient(transparent, transparent 31px, rgba(0,0,0,0.07) 31px, rgba(0,0,0,0.07) 32px)",
                    pointerEvents: "none",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "clamp(1.25rem, 4vw, 1.55rem)",
                    color: "#2e2a22",
                    lineHeight: "1.65",
                    position: "relative",
                    zIndex: 1,
                    maxHeight: "160px",
                    overflow: "hidden",
                  }}
                >
                  {message}
                </p>
                <div
                  style={{
                    borderTop: "1px solid rgba(0,0,0,0.12)",
                    paddingTop: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "1rem",
                      color: "#8a7e6e",
                    }}
                  >
                    From {civilizationName}, 2200
                  </p>
                  <div
                    style={{
                      width: "44px",
                      height: "30px",
                      border: "1.5px solid rgba(0,0,0,0.15)",
                      borderRadius: "3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0.5,
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>✦</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Always-visible label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-4"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "15px",
              color: "rgba(245,240,232,0.85)",
              letterSpacing: "0.04em",
            }}
          >
            Tap to see the postcard from both sides
          </motion.p>

          {/* Bouncing arrow — appears after auto-flip sequence, hides once tapped */}
          <AnimatePresence>
            {!userHasFlipped && autoFlipDone && (
              <motion.div
                key="arrow"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center mt-1"
                style={{ pointerEvents: "none" }}
              >
                <div className="animate-bounce-arrow">
                  <svg width="36" height="52" viewBox="0 0 36 52" fill="none">
                    <path d="M 18 48 C 16 36, 20 22, 17 6" stroke="#5DCAA5" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 9 20 L 17 5 L 26 20" stroke="#5DCAA5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontFamily: "'Caveat', cursive", fontSize: "1.6rem", color: "#5DCAA5", marginTop: "4px" }}>
                  tap to flip!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="flex flex-col items-center gap-3 mt-8 w-full max-w-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button className="btn-primary w-full" onClick={() => setStep("email")}>
              Send This Postcard ✦
            </button>
            <button
              className="btn-ghost w-full"
              style={{ fontSize: "14px", minHeight: "52px", padding: "14px 32px" }}
              onClick={() => setStep("write")}
            >
              ← Rewrite my message
            </button>
          </motion.div>
        </motion.div>
      )}

      {step === "email" && (
        <motion.div
          key="email"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col max-w-2xl mx-auto w-full"
          style={{ minHeight: "85vh" }}
        >
          {/* Top half */}
          <div className="flex flex-col items-center justify-center flex-1 px-6 pt-8 pb-4 text-center">
            <motion.p
              className="label-accent mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: "10px" }}
            >
              ALMOST THERE
            </motion.p>

            <motion.h2
              className="font-display font-light text-cream leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Where should we<br />send your postcard?
            </motion.h2>

            <motion.p
              className="font-body text-foreground/55 max-w-sm"
              style={{ fontSize: "1.05rem" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              transition={{ delay: 0.55 }}
            >
              Your postcard from{" "}
              <span className="text-teal-bright">{civilizationName}</span> will
              arrive in your inbox — world image, your message, and a little
              note about your future.
            </motion.p>
          </div>

          {/* Bottom half — email input + send */}
          <motion.div
            className="px-5 pb-10 pt-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="glass p-5 relative">
              <p className="label-accent mb-3" style={{ fontSize: "10px" }}>
                YOUR EMAIL ADDRESS
              </p>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent outline-none text-cream font-body"
                style={{ fontSize: "1.25rem" }}
              />
              <AnimatePresence>
                {emailSuggestion && emailSuggestion !== email && (
                  <motion.button
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                      setEmail(emailSuggestion);
                      setEmailSuggestion("");
                    }}
                    className="mt-3 w-full text-left glass px-4 py-3"
                    style={{ borderRadius: "12px" }}
                  >
                    <span
                      className="font-mono text-teal-bright"
                      style={{ fontSize: "13px" }}
                    >
                      ↩ &nbsp;{emailSuggestion}
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Gold send button */}
            <button
              className="w-full mt-4 font-display font-light tracking-widest"
              onClick={handleSend}
              disabled={!email.trim() || sending}
              style={{
                padding: "22px 40px",
                minHeight: "70px",
                borderRadius: "100px",
                fontSize: "clamp(14px, 2.5vw, 17px)",
                letterSpacing: "0.12em",
                background: email.trim() && !sending
                  ? "linear-gradient(135deg, hsl(37,85%,55%) 0%, hsl(37,73%,42%) 50%, hsl(37,60%,28%) 100%)"
                  : "rgba(255,255,255,0.06)",
                border: email.trim() && !sending
                  ? "1px solid rgba(200,146,42,0.55)"
                  : "1px solid rgba(255,255,255,0.1)",
                boxShadow: email.trim() && !sending
                  ? "0 0 50px rgba(200,146,42,0.4), 0 0 100px rgba(200,146,42,0.15), inset 0 1px 0 rgba(255,255,255,0.2)"
                  : "none",
                color: email.trim() && !sending ? "hsl(36,45%,96%)" : "rgba(245,240,232,0.35)",
                cursor: email.trim() && !sending ? "pointer" : "not-allowed",
                transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
              }}
            >
              {sending
                ? "Sending through time..."
                : "✦  SEND MY POSTCARD FROM THE FUTURE  ✦"}
            </button>

            <p
              className="label-accent text-center mt-6"
              style={{ fontSize: "10px", letterSpacing: "0.2em" }}
            >
              ✦ {POSTCARD_COUNT} POSTCARDS SENT FROM THE FUTURE SO FAR ✦
            </p>
          </motion.div>
        </motion.div>
      )}

      {step === "sent" && (
        <motion.div
          key="sent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto w-full px-6 gap-7"
          style={{ minHeight: "85vh" }}
        >
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
            style={{ fontSize: "56px", lineHeight: 1 }}
          >
            ✦
          </motion.div>

          <motion.h2
            className="font-display font-light text-cream"
            style={{ fontSize: "clamp(2.2rem, 6vw, 3.5rem)", lineHeight: "1.1" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            Your postcard<br />has been sent.
          </motion.h2>

          <motion.p
            className="font-body text-foreground/60 max-w-sm"
            style={{ fontSize: "1.05rem", lineHeight: "1.7" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: 0.75 }}
          >
            Check your inbox for a message from{" "}
            <span className="text-teal-bright">{civilizationName}</span>, 2200.
            Welcome to the future, innovator.
          </motion.p>

          <motion.div
            className="glass p-6 w-full max-w-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <p className="label-accent mb-3" style={{ fontSize: "10px" }}>
              FOLLOW THE JOURNEY
            </p>
            <p
              className="font-body text-foreground/60"
              style={{ fontSize: "1rem", lineHeight: "1.65" }}
            >
              Join the community of future-builders at{" "}
              <span className="text-teal-bright font-semibold">r3imagine.io</span>
              <br />
              <span className="text-foreground/40" style={{ fontSize: "0.9rem" }}>
                @r3.imagine
              </span>
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-3 w-full max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <button className="btn-ghost w-full" onClick={onRestart}>
              ↩ Build Another World
            </button>
          </motion.div>

          <motion.p
            className="label-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 1.6 }}
            style={{ fontSize: "10px", letterSpacing: "0.2em" }}
          >
            R3IMAGINE &nbsp;×&nbsp; NEW YORK HALL OF SCIENCE
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostcardScreen;
