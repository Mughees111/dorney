import { Target, Eye, Award, Users, Factory, Truck, Quote } from 'lucide-react';
import SEO from '../components/SEO';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';

export default function About() {
  return (
    <>
      <SEO
        title="About Dornay - Pakistan's Trusted Bakery & Confectionery Manufacturer"
        description="Discover Dornay's story: Over 10+ years crafting premium cakes, cream cakes, biscuits with unmatched quality, hygiene, and nationwide reach for retailers across Pakistan."
        keywords="Dornay about, bakery manufacturer Pakistan, confectionery FMCG, premium cakes Pakistan, biscuits supplier, food manufacturing Lahore"
      />

      {/* Hero Section - More personal & branded */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-bgLight via-white to-bgLight">
        <Container>
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm md:text-base">
              Welcome to Dornay
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-cookie text-primary mt-4 mb-6 leading-tight">
              Crafting Sweet Moments Since 2010
            </h1>
            <p className="text-xl md:text-2xl text-dark font-poppins font-medium max-w-4xl mx-auto">
              Pakistan's premier FMCG bakery manufacturer – where tradition meets modern excellence in every bite.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story - Asymmetric layout for modern feel */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 animate-fade-up">
              <SectionTitle subtitle="Our Journey" centered={false}>
                The Dornay Legacy
              </SectionTitle>
              <div className="space-y-5 text-lg text-neutral leading-relaxed font-poppins">
                <p>
                  M.K.S Foods International Pvt Limited's layer cakes are available in a variety of flavours, including vanilla, chocolate, and coffee. These cakes are made with multiple layers of soft, moist cake and delicious cream, making them a favourite among cake lovers. Their donuts are also available in various flavours, such as glazed, chocolate, and strawberry. They are made with a light and fluffy dough that is fried to perfection, giving them a crisp exterior and a soft, fluffy interior.
                </p>
                {/* <p>
                  Today, we produce premium cakes, cream cakes, biscuits, and confectionery using the finest ingredients and state-of-the-art facilities. Our products grace shelves in 500+ retail outlets across 20+ cities – a testament to the trust retailers and consumers place in Dornay quality.
                </p>
                <p>
                  Every recipe, every batch, every delivery reflects our core promise: consistent excellence, hygiene, and value.
                </p> */}
              </div>
            </div>

            <div className="relative animate-fade-up animation-delay-300">
              <img
                src="https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Dornay production facility"
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </Container>
      </section>

      {/* CEO Message - New section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" // ← Replace with real CEO photo
                  alt="Hamza Sheikh, CEO Dornay"
                  className="rounded-3xl shadow-2xl w-full object-cover aspect-square"
                />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-primary rounded-full blur-xl opacity-30 -z-10"></div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Quote className="w-12 h-12 text-primary opacity-50" />
                  <h2 className="text-4xl font-cookie text-dark">CEO's Message</h2>
                </div>
                <p className="text-lg text-neutral leading-relaxed font-poppins" >
                  Dear Valued Customers,{"\n"}{"\n"}At M.K.S Foods International, we believe in making quality products that bring happiness to your life.<br /> We know that when you buy our cakes and donuts, you trust us. That trust means everything to us. This is why we focus on three things: quality ingredients, clean production, and great taste.<br />Every product we make goes through strict quality checks. We make sure everything is fresh and safe for you and your family.<br /> Your satisfaction is our success. Your feedback helps us improve, and your trust gives us strength to do better every day.<br /> Thank you for choosing M.K.S Foods and letting us be part of your special moments
                </p>
                {/* <p className="text-lg text-neutral leading-relaxed">
                  Our commitment remains simple: use the best ingredients, maintain the highest hygiene standards, and deliver freshness you can taste. Thank you for choosing Dornay – we're honored to be part of your sweet moments."
                </p> */}
                <div>
                  <p className="font-bold text-dark text-xl">Hamza Sheikh</p>
                  <p className="text-neutral">Founder & CEO, Dornay</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section - New */}
      <section className="py-20 bg-white">
        <Container>
          <SectionTitle subtitle="Meet the People Behind Dornay">
            Our Leadership Team
          </SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              { name: "Hamza Sheikh", role: "Founder & CEO", img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=800" },
              { name: "Muneeb Butt", role: "Head of Quality & R&D", img: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?w=800" },
              { name: "Bilal Ahmed", role: "Operations Director", img: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=800" },
              { name: "Sara Malik", role: "Sales & Distribution Lead", img: "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?w=800" },
            ].map((member, idx) => (
              <div
                key={idx}
                className="text-center group animate-fade-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative mx-auto mb-6 w-48 h-48 rounded-full overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-300">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-bold text-dark mb-1">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>


      {/* Mission & Vision - Refined elegant cards */}
      <section className="py-20 bg-gradient-to-br from-bgLight to-white">
        <Container>
          <SectionTitle subtitle="Our Guiding Principles">
            Mission & Vision
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-10 rounded-2xl shadow-xl border border-neutral/20 hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-cookie text-primary text-center mb-4">Our Mission</h3>
              <p className="text-lg text-neutral leading-relaxed text-center">
                Our AIM is to provide you good hygienic and quality based products. Our Product Quality ensures our vision and your trust on us We truly believe in customer satisfaction so your trust is our power.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-xl border border-neutral/20 hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-cookie text-primary text-center mb-4">Our Vision</h3>
              <p className="text-lg text-neutral leading-relaxed text-center">
                To become the most trusted and beloved bakery brand across Pakistan, recognized for our unwavering commitment to quality, hygiene, and innovation in every bite.
              </p>
            </div>
          </div>
        </Container>
      </section>


      {/* Manufacturing Excellence - Updated icons & cards */}
      {/* <section className="py-20 bg-gradient-to-br from-bgLight to-white">
        <Container>
          <SectionTitle subtitle="What Makes Dornay Different">
            Manufacturing Excellence
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: Factory, title: "Modern Facility", desc: "Equipped with advanced, temperature-controlled production lines meeting global hygiene & safety standards." },
              { icon: Award, title: "Finest Ingredients", desc: "Sourced responsibly from trusted partners – every batch tested for freshness, purity, and quality." },
              { icon: Users, title: "Skilled Craftsmanship", desc: "Our experienced team combines tradition with innovation through ongoing training and passion for perfection." },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-neutral/10 animate-fade-up"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-dark mb-4">{item.title}</h3>
                <p className="text-neutral leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section> */}



      {/* Distribution & Closing */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-bgLight">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <img
                src="https://images.pexels.com/photos/4393665/pexels-photo-4393665.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Dornay distribution fleet"
                className="rounded-3xl shadow-2xl w-full"
              />
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-gradient-primary rounded-full blur-3xl opacity-20 -z-10"></div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <Truck className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-cookie text-dark">Nationwide Reach</h2>
              </div>
              <p className="text-lg text-neutral leading-relaxed font-poppins"> 
                <span className='font-bold' >Quality Products Across Pakistan </span> <br /> We want everyone in Pakistan to enjoy our delicious cakes and donuts. That's why we deliver our products to cities and towns all across the country. Our strong delivery network makes sure our products stay fresh when they reach you.<br /> You can find our layer cakes and donuts at major supermarkets, grocery stores, and shops nationwide.<br /> M.K.S Foods - Fresh taste, everywhere in Pakistan.
              </p>

            </div>
          </div>
        </Container>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-cookie mb-6">
              Partner with Dornay Today
            </h2>
            <p className="text-xl leading-relaxed mb-8">
              Quality you can trust. Freshness you can taste. Value you deserve.
            </p>
            {/* Add CTA button if needed */}
          </div>
        </Container>
      </section>
    </>
  );
}