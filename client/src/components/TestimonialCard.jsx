/**
 * TestimonialCard
 *
 * Usage on the home page:
 *
 *   import TestimonialCard from "../../components/TestimonialCard";
 *
 *   const testimonials = [
 *     { rating: 5, quote: "PureDent transformed my smile and my confidence. The process was seamless and painless.", name: "Sarah J.", role: "Patient", image: "https://..." },
 *     { rating: 5, quote: "The most professional dental experience I've ever had. The technology they use is truly next-level.", name: "Michael R.", role: "Patient", image: "https://..." },
 *     { rating: 5, quote: "Friendly staff and a beautiful clinic. I actually look forward to my dental visits now!", name: "Elena K.", role: "Patient" }, // no image -> shows initials
 *   ];
 *
 *   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 *     {testimonials.map((t) => (
 *       <TestimonialCard key={t.name} {...t} />
 *     ))}
 *   </div>
 */
export default function TestimonialCard({ rating = 5, quote, name, role = "Patient", image }) {
  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  return (
    <div className="p-xl rounded-lg glass-card border border-primary/10 flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="flex gap-1 mb-6 text-secondary" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="material-symbols-outlined text-sm"
            style={{ fontVariationSettings: `'FILL' ${i < rating ? 1 : 0}` }}
          >
            star
          </span>
        ))}
      </div>

      <p className="text-body-md text-on-surface italic mb-8 flex-grow">&ldquo;{quote}&rdquo;</p>

      <div className="flex items-center gap-4">
        {image ? (
          <img
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary/10"
            src={image}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {initials}
          </div>
        )}
        <div>
          <h6 className="font-bold text-primary">{name}</h6>
          <p className="text-label-md text-on-surface-variant">{role}</p>
        </div>
      </div>
    </div>
  );
}