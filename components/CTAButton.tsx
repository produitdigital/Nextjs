export default function CTAButton({ text }: { text: string }) {
  return (
    <a className="cta-button" href="/contact">
      {text}
    </a>
  );
}
