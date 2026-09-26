import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { CSSProperties } from "react";
import { DesignArtwork } from "@/components/awareness/design-artwork";
import styles from "./home.module.css";

const resources = [
  { title: "ECP Official Website", href: "https://ecp.gov.pk/", crop: [67, 574, 286, 132], description: "Updates, notices, and information\nfrom the Election Commission.", mobileDescription: "Official updates and\ninformation.", action: "Explore resource", color: "var(--ecp-green)", tint: "var(--mint)", wide: true, external: true },
  { title: "General Knowledge", href: "/knowledge", crop: [66, 721, 286, 113], description: "Learn about elections, voting rights,\nand the electoral process.", mobileDescription: "Your guide to the\nelectoral process.", action: "Explore resource", color: "var(--blue)", tint: "var(--pale-blue)", wide: true },
  { title: "Quiz", href: "/quiz", crop: [67, 846, 274, 125], description: "Five questions. How well do you\nknow the voting process?", mobileDescription: "Test what you know\nabout voting.", action: "Start the quiz", color: "var(--purple)", tint: "var(--pale-purple)" },
  { title: "Voting Game", href: "/journey", crop: [67, 988, 289, 123], description: "Follow your voter journey, from\nleaving home to casting your vote.", mobileDescription: "Take your first step\non the journey.", action: "Play the game", color: "var(--ecp-green)", tint: "var(--mint)" },
  { title: "Awareness Videos", href: "/videos", crop: [66, 1135, 289, 128], description: "Explore voting and election\neducation through video.", mobileDescription: "Learn through\nelection education.", action: "Watch videos", color: "var(--gold)", tint: "var(--pale-gold)" },
] as const;

export default function Home() {
  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-heading">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>YOUR VOTE. YOUR RIGHT. <br className={styles.mobileBreak} />YOUR FUTURE.</p>
          <h1 id="home-heading">Learn about<br />voting.</h1>
          <p className={styles.description}>
            <span className={styles.desktopCopy}>Understand your rights, discover official resources,<br />and feel confident about the voting process.</span>
            <span className={styles.mobileCopy}>Understand your rights and explore<br className={styles.mobileBreak} /> the voting process with confidence.</span>
          </p>
          <div className={styles.actions}>
            <Link href="/quiz" className={styles.primary}>Take the quiz <span aria-hidden="true">→</span></Link>
            <Link href="/journey" className={styles.outline}>Play voting game</Link>
          </div>
          <p className={styles.tagline}>Know your rights <span>•</span> Be informed <span>•</span> Participate</p>
        </div>
        <DesignArtwork source="home" crop={[664, 214, 430, 281]} alt="A laptop displaying the Election Commission website beside books on awareness, participation, and a better Pakistan." priority className={styles.heroArtwork} />
      </section>
      <section id="resources" className={styles.resources} aria-labelledby="resources-heading">
        <h2 id="resources-heading">Explore voter<br className={styles.mobileBreak} /> resources</h2>
        <p className={styles.sectionDescription}>
          <span className={styles.desktopCopy}>Everything you need to learn, test your knowledge, and take the next step.</span>
          <span className={styles.mobileCopy}>Learn, play, and make your vote count.</span>
        </p>
        <div className={styles.resourceGrid}>
          {resources.map((resource, index) => (
            <Link key={resource.title} href={resource.href} target={"external" in resource ? "_blank" : undefined} rel={"external" in resource ? "noopener noreferrer" : undefined}
              className={`${styles.card} ${"wide" in resource ? styles.wideCard : styles.featureCard}`}
              style={{ "--resource-color": resource.color, "--resource-tint": resource.tint } as CSSProperties}>
              <div className={styles.cardArtBackground}><DesignArtwork source="home" crop={resource.crop} className={styles.cardArtwork} /></div>
              <div className={styles.cardCopy}>
                <h3>{resource.title}</h3>
                <p className={styles.desktopCopy}>{resource.description}</p>
                <p className={styles.mobileCopy}>{resource.mobileDescription}</p>
              </div>
              <span className={styles.cardAction}>
                <span className={styles.desktopCopy}>{resource.action}</span>
                <span className={styles.mobileCopy}>{index < 2 ? "Open resource" : resource.action}</span>
                <ArrowRight size={19} strokeWidth={1.8} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <div className={styles.values}>
        {[["Be informed", "Know your voting rights"], ["Be empowered", "Build your knowledge"], ["Make it count", "Every vote matters"]].map(([title, description]) => (
          <div className={styles.value} key={title}><span className={styles.check}><Check size={18} aria-hidden="true" /></span><div><strong>{title}</strong><span>{description}</span></div></div>
        ))}
      </div>
    </main>
  );
}
