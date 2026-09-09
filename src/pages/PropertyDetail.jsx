import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiBox, FiCalendar, FiGrid, FiHome, FiMaximize2, FiSmartphone } from "react-icons/fi";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { getProperty, createInquiry } from "../api/client";
import { getPropertyById } from "../data/properties";

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(() => getPropertyById(id));
  const [inquiry, setInquiry] = useState({ name: "", email: "", message: "" });
  const [inquiryStatus, setInquiryStatus] = useState("");
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    getProperty(id)
      .then((data) => setProperty(data.property))
      .catch(() => setProperty(getPropertyById(id)));
  }, [id]);

  if (!property) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-zinc-400">This listing is not available.</p>
          <Link to="/properties" className="btn">Back to marketplace</Link>
        </div>
      </div>
    );
  }

  const images = property.images?.length ? property.images : [property.image].filter(Boolean);
  const listingAgent = property.agent || {};
  const experiences = property.experiences || [];
  const features = property.features || [];

  const submitInquiry = async (event) => {
    event.preventDefault();
    setInquiryStatus("");
    try {
      await createInquiry({
        propertyId: property.id,
        name: inquiry.name,
        email: inquiry.email,
        message: inquiry.message,
        type: "walkthrough",
      });
      setInquiry({ name: "", email: "", message: "" });
      setInquiryStatus("Request sent. An agent will follow up.");
    } catch (error) {
      setInquiryStatus(error.message);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mb-5 flex items-center gap-2 text-sm text-zinc-500">
        <Link to="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link to="/properties" className="hover:text-white">Marketplace</Link>
        <span>/</span>
        <span className="text-zinc-200">{property.title}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="overflow-hidden rounded-3xl border border-white/5">
            <img src={images[0]} alt={property.title} className="h-[380px] w-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {images.slice(1).map((image, index) => (
              <img key={image} src={image} alt={`${property.title} ${index + 1}`} className="h-28 w-full rounded-2xl object-cover" />
            ))}
          </div>

          <div className="surface p-6">
            <h2 className="mb-3 text-xl font-semibold">About this property</h2>
            <p className="mb-6 leading-7 text-zinc-400">{property.description}</p>
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex items-center gap-2 text-sm"><FiHome className="text-primary-400" />{property.beds} bedrooms</div>
              <div className="flex items-center gap-2 text-sm"><FiMaximize2 className="text-primary-400" />{property.sqft.toLocaleString()} sqft</div>
              <div className="flex items-center gap-2 text-sm"><FiCalendar className="text-primary-400" />Built {property.yearBuilt}</div>
              <div className="flex items-center gap-2 text-sm"><FiGrid className="text-primary-400" />{property.lotSize}</div>
            </div>
            <div className="mb-6 flex flex-wrap gap-2">
              {experiences.map((experience) => (
                <span key={experience} className="chip">{experience}</span>
              ))}
            </div>
            <h3 className="mb-3 font-semibold">Features</h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-zinc-300 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature}>{feature}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="surface p-5">
            <p className="text-xs uppercase tracking-widest text-zinc-500">Listed</p>
            <p className="text-3xl font-semibold">${property.price.toLocaleString()}</p>
            <p className="mb-5 text-sm text-zinc-400">{property.location}</p>
            <div className="mb-5 space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400"><span>Beds / baths</span><span className="text-white">{property.beds} / {property.baths}</span></div>
              <div className="flex justify-between text-zinc-400"><span>Parking</span><span className="text-white">{property.parkingSpaces} spaces</span></div>
            </div>
            <Link to={`/properties/${property.id}/3d`} className="btn mb-2 w-full">
              <FiBox className="mr-2" /> Open 3D tour
            </Link>
            {experiences.includes("AR") && (
              <Link to={`/properties/${property.id}/ar`} className="btn-secondary mb-4 w-full">
                <FiSmartphone className="mr-2" /> AR Preview
              </Link>
            )}
            <form onSubmit={submitInquiry} className="space-y-3">
              <input className="input" placeholder="Your name" value={inquiry.name} onChange={(e) => setInquiry((p) => ({ ...p, name: e.target.value }))} required />
              <input className="input" type="email" placeholder="Email" value={inquiry.email} onChange={(e) => setInquiry((p) => ({ ...p, email: e.target.value }))} required />
              <textarea className="input" rows="3" placeholder="Ask about a live walkthrough" value={inquiry.message} onChange={(e) => setInquiry((p) => ({ ...p, message: e.target.value }))} required />
              <button type="submit" className="btn-secondary w-full">Request walkthrough</button>
              {inquiryStatus && <p className="text-sm text-zinc-400">{inquiryStatus}</p>}
            </form>
            <div className="mt-4 flex justify-center gap-4 border-t border-white/5 pt-4 text-zinc-400">
              <FacebookShareButton url={shareUrl}><FaFacebook /></FacebookShareButton>
              <TwitterShareButton url={shareUrl}><FaTwitter /></TwitterShareButton>
              <LinkedinShareButton url={shareUrl}><FaLinkedin /></LinkedinShareButton>
            </div>
          </div>

          <div className="surface p-5">
            <div className="mb-4 flex items-center gap-3">
              {listingAgent.image && (
                <img src={listingAgent.image} alt={listingAgent.name} className="h-12 w-12 rounded-full object-cover" />
              )}
              <div>
                <p className="font-medium">{listingAgent.name}</p>
                <p className="text-sm text-zinc-500">{listingAgent.role}</p>
              </div>
            </div>
            <p className="text-sm text-zinc-400">{listingAgent.phone}</p>
            <p className="text-sm text-zinc-400">{listingAgent.email}</p>
            {listingAgent.email && (
              <a href={`mailto:${listingAgent.email}`} className="btn-secondary mt-4 inline-flex w-full justify-center">
                Contact agent
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
