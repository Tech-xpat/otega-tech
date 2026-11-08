import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = '2348131003708';
const WHATSAPP_MESSAGE =
  "Hello Otega Tech, I found your website and I'd like to discuss a project with you.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const WhatsAppIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info animation
      gsap.fromTo(
        infoRef.current?.querySelectorAll('.info-item') || [],
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'otegatech01@gmail.com',
      href: 'mailto:otegatech01@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+234 813 100 3708',
      href: 'tel:+2348131003708',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+234 813 100 3708',
      href: WHATSAPP_URL,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Delta State, Nigeria',
      href: '#',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen bg-background py-20 md:py-32"
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16 md:mb-24">
          <p className="text-xs tracking-[0.3em] text-foreground/62 uppercase font-body mb-4">
            Get In Touch
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-responsive-lg font-bold text-foreground">
              LET'S WORK TOGETHER
            </h2>
            <p className="text-sm text-foreground/62 font-body max-w-md">
              Have a project in mind? Let's discuss how we can bring your vision
              to life.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* WhatsApp call-to-action (replaces the email form) */}
          <div ref={formRef} className="flex flex-col justify-center">
            <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-foreground/62">
              The fastest way to reach us
            </p>
            <h3 className="mb-6 font-display text-4xl font-bold leading-[0.95] text-foreground md:text-5xl">
              Chat with us on WhatsApp
            </h3>
            <p className="mb-8 max-w-md font-body text-base leading-relaxed text-foreground/70">
              Tap the button and WhatsApp opens with your message already written. Just hit send and
              tell us about your project.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Otega Tech on WhatsApp"
              className="press-deep group flex w-full items-center justify-between gap-4 bg-[#25D366] px-6 py-7 text-[#07140C] md:px-10 md:py-9"
            >
              <span className="flex items-center gap-4 md:gap-5">
                <WhatsAppIcon size={40} />
                <span className="text-left">
                  <span className="block font-display text-2xl font-bold uppercase leading-none tracking-wide md:text-4xl">
                    Message us now
                  </span>
                  <span className="mt-1.5 block font-body text-xs font-medium opacity-80 md:text-sm">
                    +234 813 100 3708
                  </span>
                </span>
              </span>
              <ArrowUpRight
                size={34}
                className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>

            {/* Preview of the in-built message */}
            <div className="mt-8">
              <p className="mb-3 font-body text-xs uppercase tracking-wider text-foreground/55">
                Your message will say
              </p>
              <div className="relative max-w-md rounded-lg rounded-tl-none border border-foreground/[0.1] bg-card px-5 py-4 font-body text-sm leading-relaxed text-foreground/85">
                {WHATSAPP_MESSAGE}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div className="info-item">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Contact Information
              </h3>
              <p className="text-sm text-foreground/70 font-body leading-relaxed">
                Reach out through any of the channels below. Otega Tech is
                always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="info-item flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 flex items-center justify-center border border-foreground/20 group-hover:border-foreground/35 transition-colors duration-300">
                      <Icon
                        size={20}
                        className="text-foreground/70 group-hover:text-foreground transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/55 font-body tracking-wider uppercase mb-1">
                        {item.label}
                      </p>
                      <p className="text-foreground font-body group-hover:text-foreground/85 transition-colors duration-300">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Availability Badge */}
            <div className="info-item inline-flex items-center gap-3 px-6 py-4 border border-foreground/[0.12] bg-foreground/[0.04]">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <div>
                <p className="text-sm text-foreground font-body">
                  Available for new projects
                </p>
                <p className="text-xs text-foreground/62 font-body">
                  Typical response time: 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
