import { Award, ShieldCheck, Truck, BadgePercent } from 'lucide-react';
import Container from '../Container';
import SectionTitle from '../SectionTitle';
import { coreValues } from '../../data/coreValues';

const iconMap = {
  award: Award,
  'shield-check': ShieldCheck,
  truck: Truck,
  'badge-percent': BadgePercent,
};

export default function CoreValues() {
  return (
    <section className="py-20 bg-gradient-to-br from-bgLight to-white">
      <Container>
        <SectionTitle subtitle="Why Choose Us">
          Our Core Values
        </SectionTitle>

        <div className="space-y-16">
          {coreValues.map((value, index) => {
            const Icon = iconMap[value.icon as keyof typeof iconMap];
            const isEven = index % 2 === 0;

            return (
              <div
                key={value.id}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 items-center`}
              >
                <div className="flex-1 flex justify-center">
                  <div className="w-32 h-32 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300">
                    <Icon className="w-16 h-16 text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4">
                    {value.title}
                  </h3>
                  <p className="text-lg text-neutral leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
