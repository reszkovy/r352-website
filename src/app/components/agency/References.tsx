import { useState, useEffect } from "react";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import Slider from "react-slick";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export function References() {
  const { t, language } = useLanguage();
  const testimonials = (t("references.testimonials") as any[]) || [];
  
  const getCaseStudyId = (author: string) => {
    switch (author) {
      case "Magdalena Rodak":
        return "benefit-systems";
      case "Filip Mazurkiewicz":
        return "sonova";
      case "Alina Sztoch":
        return "kubota";
      case "Marek Morisson":
        return "dawid-podsiadlo";
      default:
        return null;
    }
  };
  
  // Fix for react-slick responsive bug on mobile
  const [slidesToShow, setSlidesToShow] = useState(3);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-carousel-styles", "true");
    style.textContent = `
      .references-carousel .slick-track {
        display: flex !important;
      }
      .references-carousel .slick-slide {
        height: auto;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
      }
      .references-carousel .slick-slide > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .references-carousel .slick-dots {
        bottom: -50px;
      }
      .references-carousel .slick-dots li {
        margin: 0 4px;
      }
      .references-carousel .slick-dots li button:before {
        color: rgba(255, 255, 255, 0.2);
        font-size: 10px;
        opacity: 1;
        transition: all 0.3s ease;
      }
      .references-carousel .slick-dots li.slick-active button:before {
        color: #D4FF00;
        font-size: 12px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.16, 1, 0.3, 1)"
  };

  return (
    <section className="py-32 bg-background border-t border-border relative overflow-hidden transition-colors duration-500">
      <div className="max-w-[1800px] mx-auto px-8 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <Reveal>
            <span className="type-sub-base mb-4 block text-muted-foreground">
              {t("references.title")}
            </span>
            <h2 className="type-h2 text-foreground ref-heading transition-colors duration-300">
              {t("references.subheader")}
            </h2>
          </Reveal>
        </div>

        {/* Carousel */}
        <Reveal delay={0.2} width="100%">
          <div className="references-carousel -mx-4">
            <Slider key={slidesToShow} {...settings}>
              {testimonials.map((testimonial: any, i: number) => {
                const caseStudyId = getCaseStudyId(testimonial.author);
                
                return (
                  <div key={i} className="px-4 h-full">
                    <div className="bg-background p-6 md:p-12 h-full min-h-[400px] flex flex-col relative rounded-none cursor-default">
                      
                      <div className="flex-grow mb-10 pt-4">
                        <p className="text-xl md:text-2xl text-[#8aa600] dark:text-[#D4FF00] leading-relaxed tracking-wide transition-colors duration-300">
                          {testimonial.quote}
                        </p>
                      </div>

                      <div className="pt-8 mt-auto border-t border-border transition-colors duration-300">
                        <div className="flex flex-col pt-6">
                          <p className="text-foreground font-medium text-lg mb-1 transition-colors duration-300">
                            {testimonial.author}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground font-display uppercase tracking-wider transition-colors duration-300">
                            <span>{testimonial.role}</span>
                            <span className="w-1 h-1 bg-[#8aa600] dark:bg-[#D4FF00] rounded-none transition-colors duration-300"></span>
                            <span className="transition-colors duration-300">{testimonial.company}</span>
                          </div>
                        </div>
                        
                        {caseStudyId && (
                          <div className="mt-8">
                            <Link href={`/work/${caseStudyId}`} className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-foreground hover:text-[#8aa600] dark:hover:text-[#D4FF00] transition-colors duration-300 group">
                              {language === 'pl' ? "Zobacz case study" : "View case study"}
                              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </Reveal>

      </div>
    </section>
  );
}